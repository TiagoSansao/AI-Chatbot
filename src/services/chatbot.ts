import { logger } from "@/loaders/logger";
import { openai } from "@/loaders/openai";
import { AI } from "@/lib/AI";
import { OCR } from "@/lib/OCR";
import { Message, MessageMedia } from "whatsapp-web.js";

class ChatBotService {
  public async execute(msg: Message) {
    try {
      const ai = new AI(openai);
      const ocr = new OCR();
      const chatAlways = ["554792774509@c.us","554789216109@c.us", "554788921683@c.us","554796493045@c.us", "554796627390@c.us", "554797585833@c.us", "551321911083@c.us" /*"551321911083@c.us"*/]
      const COMMAND_PREFIX = "/";

      console.log(msg);
      if (msg.body.startsWith("amor") || chatAlways.indexOf(msg.from) !== -1) {

        switch (msg.type) {
          case ('chat'):
            const response = await ai.query(msg.body);
    
            return response;
          case ('image'):
            const media: MessageMedia = await msg.downloadMedia();
            if (!media) return // TODO: error

            const ocrResponse = await ocr.execute(media);
            const aiResponse = await ai.query(ocrResponse);

            return aiResponse;

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
