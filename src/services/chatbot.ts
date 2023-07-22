import { logger } from '@/loaders/logger';
import { openai } from '@/loaders/openai';
import { AI } from '@/lib/AI';
import { OCR } from '@/lib/OCR';
import { Message, MessageMedia } from 'whatsapp-web.js';
import { UnsupportedFormatError } from '@/errors/unsupportedFormat';
import { MediaDownloadError } from '@/errors/mediaDownload';

class ChatBotService {
  public async execute(msg: Message) {
    const ai = new AI(openai);
    const ocr = new OCR();

    let response: string;

    switch (msg.type) {
      case 'chat':
        response = await ai.query(msg.body);
        break;
      case 'image':
        const media: MessageMedia = await msg.downloadMedia();
        if (!media) throw new MediaDownloadError();

        const ocrResponse = await ocr.execute(media);
        const aiResponse = await ai.query(ocrResponse);

        response = aiResponse;
        break;
      default:
        throw new UnsupportedFormatError(msg.type);
    }

    return response;
  }
}

export default ChatBotService;
