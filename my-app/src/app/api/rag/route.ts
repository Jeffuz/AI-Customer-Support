import openai from "../../../../utils/openai";
import pc from "../../../../utils/pinecone";

export async function GET() {
  return new Response(
    JSON.stringify({ message: "Test Message Insert your LLM response" })
  );
}

export async function POST(request: Request) {
  const { message } = await request.json();
  console.log("testing");
}
