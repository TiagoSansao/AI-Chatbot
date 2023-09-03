import { MessageMedia } from 'whatsapp-web.js';
import dotenv from 'dotenv';
import { logger } from '@/loaders/logger';

dotenv.config({ path: 'config/.env' });

class OCR {
  public async execute(image: MessageMedia) {
    const apiKey = process.env.OCR_API_KEY!;
    const apiURL = process.env.OCR_API_URL!;

    const requestData = new FormData();
    const base64format = `data:${image.mimetype};base64,${image.data}`;

    requestData.append('base64image', base64format);

    const response = await fetch(apiURL, {
      method: 'POST',
      body: requestData,
      headers: { apiKey },
    });

    const responseData = await response.json();
    const text = responseData.ParsedResults[0].ParsedText;

    logger.info(`Parsed text from OCR lib: ${text}`);

    return text;
  }
}

export { OCR };
