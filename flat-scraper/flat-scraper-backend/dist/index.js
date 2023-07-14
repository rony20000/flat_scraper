"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const config_1 = require("./config");
const apartments_controller_1 = __importDefault(require("./controllers/apartments.controller"));
const cors_1 = __importDefault(require("cors"));
(0, db_1.connect)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("HeathCheck");
});
app.use("/apartments", apartments_controller_1.default);
app.listen(config_1.config.port, () => {
    console.log(`[server]: Server is running at http://localhost:${config_1.config.port}`);
});
