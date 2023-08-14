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
  const message = msg.body.substring(5);

  const chat = await msg.getChat();
  await chat.sendStateTyping();
  const resp = await api.sendMessage(message, {
    parentMessageId: parentMessageIds[msg.from],
  });
  parentMessageIds[msg.from] = resp.id;

  await msg.reply(resp.text);
}
