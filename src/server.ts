import "dotenv/config";
import Fastify from "fastify";
import { chatRoutes } from "./routes/chat";

const app = Fastify({ logger: true });

app.get("/", async () => {
  return { message: "Server is running 🚀" };
});

app.register(chatRoutes);

const start = async () => {
  try {
    await app.listen({ port: 4000 });
    console.log("🚀 http://localhost:4000");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();