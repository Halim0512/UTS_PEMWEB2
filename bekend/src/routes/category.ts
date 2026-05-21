import { Router } from "express";
import prisma from "../lib/db";

const router = Router();

// GET ALL
router.get("/", async (req, res) => {
  try {
    const categories = await prisma.category.findMany();

    res.json(categories);
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

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json(category);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    res.status(201).json(category);
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
    const { name } = req.body;

    const checkCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!checkCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
      },
    });

    res.json(category);
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

    const checkCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!checkCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    await prisma.category.delete({
      where: { id },
    });

    res.json({
      message: "Category deleted",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;