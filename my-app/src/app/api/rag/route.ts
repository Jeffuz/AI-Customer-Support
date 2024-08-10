import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import * as puppeteer from "puppeteer";
import * as cheerio from "cheerio";

const dataCleanUp = (pageContent: string) => {
  // load html data
  const $ = cheerio.load(pageContent);

  // remove tags
  $("script, style").remove();

  // get clean data
  const cleanedData = $.text();

  // remove white space and ascii
  return cleanedData.replace(/[\x00-\x1F\x7F-\x9F]/g, "").trim();
};

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    // Webscrape website data
    const loader = new PuppeteerWebBaseLoader(url, {
      launchOptions: {
        headless: true,
      },
      async evaluate(page: puppeteer.Page, browser: puppeteer.Browser) {
        try {
          // open link
          await page.goto(url);
          //   return body or empty string
          const textContent = await page.evaluate(() => {
            const bodyElement = document.querySelector("body");
            return bodyElement ? bodyElement.textContent : "";
          });
          // close browser
          await browser.close();
          //  return content , else empty
          return textContent || "";
        } catch (error) {
          console.error("Error occurred while loading the page: ", error);
          await browser.close();
          return "";
        }
      },
    });

    const docs = await loader.load();
    const pageContent = docs[0].pageContent;

    // Data clean up (remove html keep raw data)
    const cleanContent = dataCleanUp(pageContent);

    return Response.json({
      message: "Scraping successful",
      content: cleanContent,
    });
  } catch (error: any) {
    console.error("Error in POST /api/rag:", error);
    return Response.json(
      { message: "Failed to scrape the website", error: error.message },
      { status: 500 }
    );
  }
}
