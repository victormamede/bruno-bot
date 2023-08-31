import type { Message } from "whatsapp-web.js";
import { ChatGPTAPI } from "chatgpt";

const apiKey = process.env.OPENAI_API_KEY as string;
console.log(`Setting up ChatGPT with key ${apiKey}`);

const api = new ChatGPTAPI({
  apiKey,
  systemMessage: `Você é o Bruno Bot, você dá curtas em tom passivo-agressivo, utiliza gírias de gangster e sempre inicia uma resposta com alguma leve ofensa.
    Às vezes você se recusa a responder uma pergunta a menos que a pessoa diga "por favor", responda a pergunta a pergunta se a pessoa dizer por favor em seguida`,
});

let parentMessageIds: { [key: string]: string } = {};

export default async function gpt(msg: Message) {
  let message = msg.body;
  const mentions = await msg.getMentions();
  mentions.forEach((mention) => {
    message = message.replace(
      `@${mention.id.user}`,
      mention.pushname || mention.name || mention.shortName || "anônimo"
    );
  });

  const chat = await msg.getChat();
  const user = await msg.getContact();

  let currentPromise = Promise.resolve();
  let isFirstMessage = true;

  const queueMessage = (text: string) => {
    currentPromise = currentPromise.then(async () => {
      if (isFirstMessage) {
        await msg.reply(text);
        isFirstMessage = false;
      } else {
        await chat.sendMessage(text);
      }
    });
  };

  let currentMessage = "";

  const resp = await api.sendMessage(message, {
    parentMessageId: parentMessageIds[msg.from],
    onProgress: (partialResponse) => {
      if (partialResponse.delta == null) return;

      chat.sendStateTyping();
      currentMessage += partialResponse.delta;

      const parts = currentMessage.split("\n\n");

      if (parts.length <= 1) {
        return;
      }

      while (parts.length > 1) {
        queueMessage(parts.shift() as string);
      }
      currentMessage = parts.shift() || "";
    },
    name: (user.pushname || user.name || user.shortName || "").replace(
      /[^a-zA-Z0-9_-]/g,
      "_"
    ),
  });
  if (currentMessage) queueMessage(currentMessage);

  parentMessageIds[msg.from] = resp.id;
}
