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
        const speakers = await db_1.default.speaker.findMany();
        res.json(speakers);
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
        const speaker = await db_1.default.speaker.findUnique({
            where: { id },
        });
        if (!speaker) {
            return res.status(404).json({
                message: "Speaker not found",
            });
        }
        res.json(speaker);
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
        const { name, role, image } = req.body;
        if (!name || !role || !image) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        const speaker = await db_1.default.speaker.create({
            data: {
                name,
                role,
                image,
            },
        });
        res.status(201).json(speaker);
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
        const { name, role, image } = req.body;
        const checkSpeaker = await db_1.default.speaker.findUnique({
            where: { id },
        });
        if (!checkSpeaker) {
            return res.status(404).json({
                message: "Speaker not found",
            });
        }
        const speaker = await db_1.default.speaker.update({
            where: { id },
            data: {
                name,
                role,
                image,
            },
        });
        res.json(speaker);
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
        const checkSpeaker = await db_1.default.speaker.findUnique({
            where: { id },
        });
        if (!checkSpeaker) {
            return res.status(404).json({
                message: "Speaker not found",
            });
        }
        await db_1.default.speaker.delete({
            where: { id },
        });
        res.json({
            message: "Speaker deleted",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.default = router;
