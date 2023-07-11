import { client } from "@/loaders/wppClient";
import { logger } from "@/loaders/logger";
import { ChatBotAPI } from "@/api/chatbot";

async function main() {
  logger.info("Starting project, instantiating bot...")
  const chatBot = new ChatBotAPI(client);
  await chatBot.start();
}

main();
