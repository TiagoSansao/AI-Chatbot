import { MissingCredentialsError } from '@/errors/missingCredentials';
import { OCR } from '@/lib/OCR';
import { MessageMedia } from 'whatsapp-web.js';

describe('OCR class', () => {
  describe('(public) execute method', () => {
    it("should throw MissingCredentialsError if they're not provided", async () => {
      const ocr = new OCR(undefined, undefined);
      try {
        await ocr.execute({} as MessageMedia);
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(MissingCredentialsError);
      }
    });

    it('should succeed and return string response', async () => {
      const ocr = new OCR('apiUrlMock', 'apiKeyMock');

      const mockFetchParsedResponse = {
        ParsedResults: [
          { ParsedText: 'really nice ai generated response' },
          { ParsedText: 'huiuuu' },
          { ParsedText: 'heie' },
        ],
      };

      const mockFetchJsonMethod = jest.fn().mockResolvedValue(mockFetchParsedResponse);
      const mockFetchResponse = { json: mockFetchJsonMethod };

      global.fetch = jest.fn().mockResolvedValue(mockFetchResponse);

      const mockExpectedResponse = mockFetchParsedResponse.ParsedResults[0].ParsedText;

      const response = await ocr.execute({
        mimetype: 'image/jpeg',
        data: 'really cool base64==',
      } as MessageMedia);

      expect(response).toBe(mockExpectedResponse);
    });
  });
});
