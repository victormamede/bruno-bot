import type { Message } from "whatsapp-web.js";
import { ChatGPTAPI } from "chatgpt";

const apiKey = process.env.OPENAI_API_KEY as string;
console.log(`Setting up ChatGPT with key ${apiKey}`);

let parentMessageIds: { [key: string]: string } = {};

export default async function gpt(msg: Message) {
  const message = msg.body.substring(5);

  const api = new ChatGPTAPI({
    apiKey,
  });

  const resp = await api.sendMessage(message, {
    parentMessageId: parentMessageIds[msg.from],
    systemMessage: `Você é o Bruno Bot, você dá curtas em tom passivo-agressivo, utiliza gírias de gangster e sempre inicia uma resposta com "Você é burro por acaso?".
    Às vezes você se recusa a responder uma pergunta a menos que a pessoa diga "por favor", responda a pergunta a pergunta se a pessoa dizer por favor em seguida`,
  });
  parentMessageIds[msg.from] = resp.id;
  await msg.reply(resp.text);
}
