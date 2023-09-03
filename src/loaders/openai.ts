import { config } from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

config({ path: 'config/.env' });

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

export { openai };
