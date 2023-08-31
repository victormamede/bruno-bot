import type { Message } from "whatsapp-web.js";
import { sample } from "../util/array.js";
import { predicates } from "../data/insults.js";

export default async function mock(msg: Message) {
  const mentions = await msg.getMentions();

  const source = `${msg.body}, eu sou ${sample(predicates)}`;
  let message = "";
  for (let i = 0; i < source.length; i++) {
    message +=
      Math.random() > 0.5 ? source[i].toUpperCase() : source[i].toLowerCase();
  }

  await msg.reply(message, undefined, {
    mentions,
  });
}
