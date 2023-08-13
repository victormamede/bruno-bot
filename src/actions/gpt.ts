import type { Message } from "whatsapp-web.js";
import { ChatGPTAPI, ChatGPTError } from "chatgpt";

const apiKey = process.env.OPENAI_API_KEY as string;
console.log(`Setting up ChatGPT with key ${apiKey}`);
export default async function gpt(msg: Message) {
  const message = msg.body.substring(5);

  const api = new ChatGPTAPI({
    apiKey,
  });

  const resp = await api.sendMessage(message);
  await msg.reply(resp.text);
}
