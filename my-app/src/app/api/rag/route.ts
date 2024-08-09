import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    const loader = new PuppeteerWebBaseLoader(url, {
      launchOptions: {
        headless: true,
      },
    });

    const docs = await loader.load();

    return Response.json({
      message: "Scraping successful",
      content: docs[0],
    });

  } catch (error) {
    console.error("Error in POST /api/rag:", error);
    return Response.json(
      { message: "Failed to scrape the website", error: error.message },
      { status: 500 }
    );
  }
}
