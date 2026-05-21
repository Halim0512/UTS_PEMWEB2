"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const category_1 = __importDefault(require("./routes/category"));
const speaker_1 = __importDefault(require("./routes/speaker"));
const event_1 = __importDefault(require("./routes/event"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({
        message: "Server Running",
    });
});
app.use("/categories", category_1.default);
app.use("/speakers", speaker_1.default);
app.use("/events", event_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
