import { Router } from "express";
import prisma from "../lib/db";

const router = Router();

// GET ALL
router.get("/", async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        category: true,
        speaker: true,
      },
    });

    res.json(events);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        category: true,
        speaker: true,
      },
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json(event);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const {
      name,
      categoryId,
      speakerId,
      location,
      dateEvent,
      description,
    } = req.body;

    if (
      !name ||
      !categoryId ||
      !speakerId ||
      !location ||
      !dateEvent
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // cek category
    const category = await prisma.category.findUnique({
      where: {
        id: Number(categoryId),
      },
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // cek speaker
    const speaker = await prisma.speaker.findUnique({
      where: {
        id: Number(speakerId),
      },
    });

    if (!speaker) {
      return res.status(404).json({
        message: "Speaker not found",
      });
    }

    const event = await prisma.event.create({
      data: {
        name,
        categoryId: Number(categoryId),
        speakerId: Number(speakerId),
        location,
        dateEvent: new Date(dateEvent),
        description,
      },
    });

    res.status(201).json(event);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      name,
      categoryId,
      speakerId,
      location,
      dateEvent,
      description,
    } = req.body;

    const checkEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!checkEvent) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const event = await prisma.event.update({
      where: { id },
      data: {
        name,
        categoryId: Number(categoryId),
        speakerId: Number(speakerId),
        location,
        dateEvent: new Date(dateEvent),
        description,
      },
    });

    res.json(event);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const checkEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!checkEvent) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    await prisma.event.delete({
      where: { id },
    });

    res.json({
      message: "Event deleted",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;