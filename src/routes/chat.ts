import Groq from "groq-sdk";
import { FastifyInstance } from "fastify";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function chatRoutes(app: FastifyInstance) {
  app.post(
    "/api/chat",
    {
      schema: {
        body: {
          type: "object",
          required: ["message"],
          additionalProperties: false,
          properties: {
            message: {
              type: "string",
              minLength: 1,
              maxLength: 4000,
            },
          },
        },
      },
    },
    async (request, reply) => {
      const body = request.body as {
        message: string;
      };

      console.log("User message:", body.message);

      const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "system",
            content: "You are a Fastify tutor. Only answer questions about Fastify, Node.js, TypeScript, and backend engineering. If the user asks about something outside these topics, say: I can only help with backend engineering topics.",
          },
          {
            role: "user",
            content: body.message,
          },
        ],
      });

      const answer = response.choices[0]?.message?.content;

      return {
        success: true,
        message: answer,
      };
    },
  );
}