# AI-Chatbot

This project uses and combine different AI services to create value.
The chatbot is able to provide AI generative answers from text inputs to image inputs, by using an OCR AI, then calling the generative AI. It's also expected to increase this range of supported formats to Audios (using speech-to-text) and make the project multiplatform, which will be accomplished using OOP polymorphism and abtractions.

## Configuration

Config is located at `config/`
Create `.env` file there with the following structure:

```.env
NODE_ENV={production | development}
OPENAI_API_KEY={key}
OCR_API_KEY={key}
OCR_API_URL={url}
```

## Functionalities

| Functionalities      | Whatsapp | Telegram |
| -------------------- | -------- | -------- |
| AI                   | ✔       | X        |
| OCR -> AI            | ✔       | X        |
| Speech to text -> AI | X        | X        |
