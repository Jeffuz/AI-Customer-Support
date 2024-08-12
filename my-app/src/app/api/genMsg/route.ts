import openai from "../../../../utils/openai";
import pc from "../../../../utils/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";

// query db based on user message
async function queryIndex(query: string) {
  // init embeddings
  const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPEN_AI_KEY!,
    model: "text-embedding-3-large",
  });

  // query on index
  const queryEmbedding = await embeddings.embedQuery(query);
  const index = pc.Index("ai-customer-support");
  const queryResponse = await index.query({
    vector: queryEmbedding,
    topK: 8,
    includeMetadata: true,
  });

  // return data
  return queryResponse;
}

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const userMessage = res["message"];
    const taskType = res["taskType"];
    const language = res["language"];

    // Query Pinecone for relevant information
    const pineconeQuery = await queryIndex(userMessage);

    let responseMessage = "";

    // modal based on task type
    let model = "gpt-4o-mini"; // default

    // update when newer models that pertain to task come out
    if (taskType === "creative_writing") {
      model = "gpt-4o-mini";
    } else if (taskType === "technical_documentation") {
      model = "gpt-4o-mini";
    } else if (taskType === "customer_support") {
      model = "gpt-4o-mini";
    } else if (taskType === "general_knowledge") {
      model = "gpt-4o-mini";
    }

    // if vector db includes data (meaning user has uploaded link)
    if (pineconeQuery && pineconeQuery.matches.length > 0) {
      // create single string of relevant data (combine data)
      const relevantInfo = pineconeQuery.matches
        .map((match) => match.metadata?.text)
        .join(" ");

      // llm interacts with relevant information
      const apiResponse = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a knowledgeable assistant speaking ${language}. Use the provided context to help answer the user's question related to ${taskType}. Respond only in ${language}.`,
          },
          {
            role: "user",
            content: `Context: ${relevantInfo}\n\nUser Query: ${userMessage}`,
          },
        ],
        model: model,
      });

      // response
      responseMessage =
        apiResponse.choices[0]?.message?.content ||
        "I'm not sure how to respond to that.";
    } else {
      // if no info in db, use llm without info
      const apiResponse = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a highly capable and informative chatbot. When a user asks a question related to ${taskType}, your task is to provide the most accurate and concise response possible.`,
          },
          {
            role: "user",
            content: `User Query: "${userMessage}". Please provide a brief and accurate response.`,
          },
        ],
        model: model,
      });

      // response
      responseMessage =
        apiResponse.choices[0]?.message?.content ||
        "I'm not sure how to respond to that.";
    }

    return new Response(
      JSON.stringify({
        success: true,
        reason: "N/A",
        body: { message: responseMessage },
      }),
      { status: 201 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        reason: "Error generating response",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
