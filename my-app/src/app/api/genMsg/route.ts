import { NextApiRequest, NextApiResponse } from 'next';
import openai from '../../../../utils/openai'; // Adjust the path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const apiResponse = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `You are a chatbot replicating an experienced librarian. Based on the user's message: ${message}, respond with a short concise message.` }],
      });

      const aiMessage = apiResponse.data.choices[0].message.content;

      res.status(200).json({
        success: true,
        message: aiMessage,
      });
    } catch (error) {
      console.error('Error communicating with OpenAI API:', error);
      res.status(500).json({
        success: false,
        error: 'Error communicating with OpenAI API',
      });
    }
  } else {
    res.status(405).json({
      error: 'Method not allowed',
    });
  }
}