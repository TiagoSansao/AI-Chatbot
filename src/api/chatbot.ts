import qrcode from 'qrcode-terminal';
import { openai } from '@/loaders/openai';
import { Client } from 'whatsapp-web.js';
import { logger } from '@/loaders/logger';
import ChatBotService from '@/services/chatbot';
import { ApplicationError } from '@/errors/application';
import { statusCode } from '@/types/statusCode';
import { AI } from '@/lib/AI';
import { OCR } from '@/lib/OCR';

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

  public setupMsgListener(): void {
    this.client.on('message_create', async (msg) => {
      logger.info(`Received message: ${msg.body} from ${msg.from}`);

      const chatAlways = [
        '554788303706@c.us',
        '554792774509@c.us',
        '554789216109@c.us',
        '554788921683@c.us',
        '554796493045@c.us',
        '554796627390@c.us',
        '554797585833@c.us',
        '551321911083@c.us' /*"551321911083@c.us"*/,
      ];

      console.log(msg);
      try {
        if (msg.body.startsWith('amor') || chatAlways.indexOf(msg.from) !== -1) {
          const ai = new AI(openai);
          const ocr = new OCR();
          const chatBotService = new ChatBotService(ai, ocr);
          const response = await chatBotService.execute(msg);

          this.client.sendMessage(msg.from, response);
        }
      } catch (error: unknown) {
        const errMsgDestination = msg.from;

        this.chatErrorHandler(error, errMsgDestination);
      }
    });
  }

  public async start(): Promise<void> {
    this.setupReadyListener();
    this.setupQrListener();
    this.setupMsgListener();
    await this.client.initialize();
  }
}

export { ChatBotAPI };
