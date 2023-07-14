"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sreality_scrape_1 = __importDefault(require("../services/sreality.scrape"));
const apartment_model_1 = require("../models/apartment.model");
let isScraping = false;
const apartmentsRouter = (0, express_1.Router)();
apartmentsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Fetch All Apartments");
    const apartments = yield apartment_model_1.Apartment.findAll();
    return res.json(apartments);
}));
apartmentsRouter.get("/scrape", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Scraping");
    if (isScraping) {
        return res.send("Scraping").end();
    }
    isScraping = true;
    try {
        const posts = yield (0, sreality_scrape_1.default)();
        for (const post of posts) {
            const isExist = yield apartment_model_1.Apartment.findOne({ where: { url: post.url } });
            if (!isExist) {
                yield apartment_model_1.Apartment.create(post);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    finally {
        isScraping = false;
    }
    return res.send("Scraped").end();
}));
apartmentsRouter.get("/scrape/status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Scraping Status", isScraping);
    return res.json({ isScraping });
}));
exports.default = apartmentsRouter;
