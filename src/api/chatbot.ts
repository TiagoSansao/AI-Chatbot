import dotenv from 'dotenv';
import qrcode from 'qrcode-terminal';
import { openai } from '@/loaders/openai';
import { Client, Message } from 'whatsapp-web.js';
import { logger } from '@/loaders/logger';
import ChatBotService from '@/services/chatbot';
import { ApplicationError } from '@/errors/application';
import { statusCode } from '@/types/statusCode';
import { AI } from '@/lib/AI';
import { OCR } from '@/lib/OCR';

dotenv.config({ path: 'config/.env' });

class ChatBotAPI {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  private chatErrorHandler(error: unknown, errMsgDestination: string) {
    logger.error(error);

    if (!(error instanceof ApplicationError)) {
      this.client.sendMessage(errMsgDestination, 'An error happened, try again later.');

      return;
    }

    if (error.statusCode === statusCode.INTERNAL_SERVER_ERROR) {
      this.client.sendMessage(errMsgDestination, 'An error happened, try again later.');

      return;
    }

    this.client.sendMessage(errMsgDestination, error.message);
  }

  private setupReadyListener(): void {
    this.client.on('ready', () => {
      logger.info('Chatbot client was successfully instanced.');
    });
  }

  private setupQrListener(): void {
    this.client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });
  }

  private async handleMessages(msg: Message) {
    // If message has authors, it was sent on a group chat
    const isGroupMessage = msg.author ? true : false;
    const hasChatbotPrefix = msg.body.startsWith('/ai');

    if (isGroupMessage && !hasChatbotPrefix) return;

    logger.info(`Received message: ${msg.body} from ${msg.from}`);

    try {
      const ai = new AI(openai);
      const apiURL = process.env.OCR_API_URL;
      const apiKey = process.env.OCR_API_KEY;
      const ocr = new OCR(apiURL, apiKey);
      const chatBotService = new ChatBotService(ai, ocr);
      const response = await chatBotService.execute(msg);

      this.client.sendMessage(msg.from, response);
    } catch (error: unknown) {
      const errMsgDestination = msg.from;

      this.chatErrorHandler(error, errMsgDestination);
    }
  }

  public setupMsgListener(): void {
    this.client.on('message_create', this.handleMessages);
  }

  public async start(): Promise<void> {
    this.setupReadyListener();
    this.setupQrListener();
    this.setupMsgListener();
    await this.client.initialize();
  }
}

export { ChatBotAPI };
