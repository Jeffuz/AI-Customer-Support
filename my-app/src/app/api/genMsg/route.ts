import openai from "../../../../utils/openai"

// Mock data
export async function GET() {
  return Response.json({message: "Test Message Insert you LLM response"})
}

export async function POST(request: Request) {
  const res = await request.json()

  const apiResponse = await openai.chat.completions.create({
    messages: [{role: "user", content: `You are a chatbot replication an experienced librarian,
     based off the user's message: ${res["message"]}, 
     respond with a short concise message.`}],
     model: "gpt-3.5-turbo"
  })
  console.log(apiResponse.choices[0].message)

  return Response.json({
    success: true,
    reason: "N/A",
    body: {message: apiResponse.choices[0].message}
  })
}