import { Request, Response, Router } from "express";
import srealityScrape from "../services/sreality.scrape";
import { Apartment } from "../models/apartment.model";

let isScraping = false;

const apartmentsRouter = Router();

apartmentsRouter.get("/", async (req: Request, res: Response) => {
  console.log("Fetch All Apartments");
  const apartments = await Apartment.findAll();
  return res.json(apartments);
});

apartmentsRouter.get("/scrape", async (req: Request, res: Response) => {
  console.log("Scraping");
  if (isScraping) {
    return res.send("Scraping").end();
  }

  isScraping = true;
  try {
    const posts = await srealityScrape();
    for (const post of posts) {
      const isExist = await Apartment.findOne({ where: { url: post.url } });
      if (!isExist) {
        await Apartment.create(post);
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    isScraping = false;
  }

  return res.send("Scraped").end();
});

apartmentsRouter.get("/scrape/status", async (req: Request, res: Response) => {
  console.log("Scraping Status", isScraping);
  return res.json({ isScraping });
});

export default apartmentsRouter;
