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
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
// import { Options } from "selenium-webdriver/chrome";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const scrape = () => __awaiter(void 0, void 0, void 0, function* () {
    const parsedPosts = [];
    const driver = yield new selenium_webdriver_1.Builder()
        .forBrowser(selenium_webdriver_1.Browser.CHROME)
        // .setChromeOptions(
        //  new Options().addArguments("headless").addArguments("disable-gpu")
        // )
        .build();
    try {
        yield driver.get("https://www.sreality.cz/en/search/apartments");
        yield delay(5000);
        yield driver.executeScript(`
      document.querySelector("button[type='submit']").click();
    `);
        yield delay(5000);
        yield searchPages(driver, parsedPosts);
    }
    finally {
        yield driver.quit();
        return parsedPosts;
    }
});
function searchPages(driver, parsedPosts) {
    return __awaiter(this, void 0, void 0, function* () {
        let hasNextPage;
        do {
            yield searchPage(driver, parsedPosts);
            // Go to next page, if exist
            hasNextPage = yield goToNextPage(driver);
        } while (hasNextPage && parsedPosts.length < 500);
    });
}
function searchPage(driver, parsedPosts) {
    return __awaiter(this, void 0, void 0, function* () {
        const allPosts = yield driver.findElements(selenium_webdriver_1.By.css('div[property-list="estatesResource"] > div > div'));
        // Parse page jobs
        yield parseJobs(allPosts, parsedPosts);
    });
}
function parseJobs(posts, parsedPosts) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        for (const post of posts) {
            try {
                const title = yield (yield post.findElement(selenium_webdriver_1.By.css("div[class*='info']"))).getText();
                const images = yield Promise.all((_a = Array.from(yield post.findElements(selenium_webdriver_1.By.css("preact img")))) === null || _a === void 0 ? void 0 : _a.map((img) => __awaiter(this, void 0, void 0, function* () { return yield img.getAttribute("src"); })));
                const url = yield (yield post.findElement(selenium_webdriver_1.By.css("div[class*='info'] a"))).getAttribute("href");
                parsedPosts.push({
                    title,
                    images: images === null || images === void 0 ? void 0 : images.slice(0, -1),
                    url,
                });
            }
            catch (err) { }
        }
    });
}
function goToNextPage(driver) {
    return __awaiter(this, void 0, void 0, function* () {
        // Go to the next page, if exists
        try {
            yield delay(5000);
            yield driver
                .findElement(selenium_webdriver_1.By.css('a[class*="paging-next"]'))
                .sendKeys(selenium_webdriver_1.Key.RETURN);
            yield delay(5000);
            return true;
        }
        catch (err) {
            return false;
        }
    });
}
exports.default = scrape;
