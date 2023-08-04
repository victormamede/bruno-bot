import { Message } from "whatsapp-web.js";
import { mother } from "../data/mother";
import { sample } from "../util/array";

export default async function motherInsult(msg: Message) {
  const mentions = await msg.getMentions();
  if (mentions.length === 0) {
    await msg.reply(`Você é burro igual sua mãe, esqueceu de marcar o amigo.`);
    return;
  }

  await msg.reply(`@${mentions[0].id.user}, ${sample(mother)}`, undefined, {
    mentions: [mentions[0]],
  });
}
