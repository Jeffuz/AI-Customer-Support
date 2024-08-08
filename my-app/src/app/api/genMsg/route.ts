
// Mock data
export async function GET() {
  return Response.json({message: "Test Message Insert you LLM response"})
}

export async function POST(request: Request) {
  const res = await request.json()

  return Response.json({
    success: true,
    reason: "N/A",
    body: res
  })
}