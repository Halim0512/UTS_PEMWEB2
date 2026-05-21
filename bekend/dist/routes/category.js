"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../lib/db"));
const router = (0, express_1.Router)();
// GET ALL
router.get("/", async (req, res) => {
    try {
        const categories = await db_1.default.category.findMany();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
// GET BY ID
router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const category = await db_1.default.category.findUnique({
            where: { id },
        });
        if (!category) {
            return res.status(404).json({
                message: "Category not found",
            });
        }
        res.json(category);
    }
    catch (error) {
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
        const category = await db_1.default.category.create({
            data: {
                name,
            },
        });
        res.status(201).json(category);
    }
    catch (error) {
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
        const checkCategory = await db_1.default.category.findUnique({
            where: { id },
        });
        if (!checkCategory) {
            return res.status(404).json({
                message: "Category not found",
            });
        }
        const category = await db_1.default.category.update({
            where: { id },
            data: {
                name,
            },
        });
        res.json(category);
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const checkCategory = await db_1.default.category.findUnique({
            where: { id },
        });
        if (!checkCategory) {
            return res.status(404).json({
                message: "Category not found",
            });
        }
        await db_1.default.category.delete({
            where: { id },
        });
        res.json({
            message: "Category deleted",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.default = router;
