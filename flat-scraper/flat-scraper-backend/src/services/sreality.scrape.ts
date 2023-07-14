import { Builder, Browser, By, Key } from "selenium-webdriver";
// import { Options } from "selenium-webdriver/chrome";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const scrape = async () => {
  const parsedPosts: any[] = [];
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    // .setChromeOptions(
    //  new Options().addArguments("headless").addArguments("disable-gpu")
    // )
    .build();

  try {
    await driver.get("https://www.sreality.cz/en/search/apartments");
    await delay(5000);
    await driver.executeScript(`
      document.querySelector("button[type='submit']").click();
    `);
    await delay(5000);
    await searchPages(driver, parsedPosts);
  } finally {
    await driver.quit();
    return parsedPosts;
  }
};

async function searchPages(driver: any, parsedPosts: any[]) {
  let hasNextPage;
  do {
    await searchPage(driver, parsedPosts);

    // Go to next page, if exist
    hasNextPage = await goToNextPage(driver);
  } while (hasNextPage && parsedPosts.length < 500);
}

async function searchPage(driver: any, parsedPosts: any) {
  const allPosts = await driver.findElements(
    By.css('div[property-list="estatesResource"] > div > div')
  );

  // Parse page jobs
  await parseJobs(allPosts, parsedPosts);
}

async function parseJobs(posts: any, parsedPosts: any) {
  for (const post of posts) {
    try {
      const title = await (
        await post.findElement(By.css("div[class*='info']"))
      ).getText();
      const images = await Promise.all(
        Array.from(await post.findElements(By.css("preact img")))?.map(
          async (img: any) => await img.getAttribute("src")
        )
      );
      const url = await (
        await post.findElement(By.css("div[class*='info'] a"))
      ).getAttribute("href");

      parsedPosts.push({
        title,
        images: images?.slice(0, -1),
        url,
      });
    } catch (err) {}
  }
}

async function goToNextPage(driver: any) {
  // Go to the next page, if exists
  try {
    await delay(5000);
    await driver
      .findElement(By.css('a[class*="paging-next"]'))
      .sendKeys(Key.RETURN);
    await delay(5000);
    return true;
  } catch (err) {
    return false;
  }
}

export default scrape;
