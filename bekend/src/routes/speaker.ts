import { Router } from "express";
import prisma from "../lib/db";

const router = Router();

// GET ALL
router.get("/", async (req, res) => {
  try {
    const speakers = await prisma.speaker.findMany();

    res.json(speakers);
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

    const speaker = await prisma.speaker.findUnique({
      where: { id },
    });

    if (!speaker) {
      return res.status(404).json({
        message: "Speaker not found",
      });
    }

    res.json(speaker);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const { name, role, image } = req.body;

    if (!name || !role || !image) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const speaker = await prisma.speaker.create({
      data: {
        name,
        role,
        image,
      },
    });

    res.status(201).json(speaker);
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

    const { name, role, image } = req.body;

    const checkSpeaker = await prisma.speaker.findUnique({
      where: { id },
    });

    if (!checkSpeaker) {
      return res.status(404).json({
        message: "Speaker not found",
      });
    }

    const speaker = await prisma.speaker.update({
      where: { id },
      data: {
        name,
        role,
        image,
      },
    });

    res.json(speaker);
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

    const checkSpeaker = await prisma.speaker.findUnique({
      where: { id },
    });

    if (!checkSpeaker) {
      return res.status(404).json({
        message: "Speaker not found",
      });
    }

    await prisma.speaker.delete({
      where: { id },
    });

    res.json({
      message: "Speaker deleted",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;