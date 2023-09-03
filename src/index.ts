import { client } from '@/loaders/wppClient';
import { logger } from '@/loaders/logger';
import { ChatBotAPI } from '@/api/chatbot';
import { GlobalErrorHandler } from '@/loaders/globalErrorHandler';

logger.info('Starting project, wait until entities are successfully instantiated.');

const globalErrorHandler = new GlobalErrorHandler();
const chatBot = new ChatBotAPI(client);

globalErrorHandler.start();
chatBot.start();
