import { client } from "@/loaders/wppClient";
import { ChatBotAPI } from "@/api/chatbot";
import { logger } from "@/loaders/logger";

async function main() {
  logger.info("Starting project, instantiating bot...")
  const chatBot = new ChatBotAPI(client);
  await chatBot.start();
}

main();
