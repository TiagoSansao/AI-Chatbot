import { logger } from '@/loaders/logger';
import { AI } from '@/lib/AI';
import { OCR } from '@/lib/OCR';
import { Message, MessageMedia } from 'whatsapp-web.js';
import { UnsupportedFormatError } from '@/errors/unsupportedFormat';
import { MediaDownloadError } from '@/errors/mediaDownload';

class ChatBotService {
  private ai: AI;
  private ocr: OCR;

  constructor(ai: AI, ocr: OCR) {
    this.ocr = ocr;
    this.ai = ai;
  }

  private async handleImage(msg: Message): Promise<string> {
    const media: MessageMedia = await msg.downloadMedia();
    if (!media) throw new MediaDownloadError();

    const ocrResponse = await this.ocr.execute(media);
    const aiResponse = await this.ai.query(ocrResponse);

    return aiResponse;
  }

  private async handleText(msg: Message): Promise<string> {
    const aiResponse = await this.ai.query(msg.body);

    return aiResponse;
  }

  public async execute(msg: Message) {
    logger.info(`Chatbot service began to handle ${msg.type} message.`);

    let response: string;

    switch (msg.type) {
      case 'chat':
        response = await this.handleText(msg);
        break;
      case 'image':
        response = await this.handleImage(msg);
        break;
      default:
        throw new UnsupportedFormatError(msg.type);
    }

    return response;
  }
}

export default ChatBotService;
