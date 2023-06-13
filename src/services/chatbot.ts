import { logger } from "@/loaders/logger";
import { openai } from "@/loaders/openai";
import { AI } from "@/utils/AI";
import { Message } from "whatsapp-web.js";

class ChatBotService {
  public async execute(msg: Message) {
    try {
      const chatAlways = ["554792774509@c.us", "554796627390@c.us" /*"551321911083@c.us"*/]
      const COMMAND_PREFIX = "/";

      if (msg.body.startsWith("amor") || chatAlways.indexOf(msg.from) !== -1) {

        switch (msg.type) {
          case ('chat'):
            const ai = new AI(openai);
            const response = await ai.query(msg.body);
    
            return response;
          case ('image'):
            // OCR
            break;
          default:
            return;
        }
      }
    } catch (error) {
      logger.error(error);
    }
  }
}

export default ChatBotService;