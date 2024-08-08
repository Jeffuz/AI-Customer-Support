import { NextApiRequest, NextApiResponse } from 'next';


export async function GET() {
    return Response.json({message: "Hello"})
}