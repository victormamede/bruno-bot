import { Message } from "whatsapp-web.js";
import { compliments } from "../data/compliment";
import { sample } from "../util/array";

export default async function compliment(msg: Message) {
  const mentions = await msg.getMentions();
  if (mentions.length === 0) {
    msg.reply(
      "Sabia que vc é um fofo por tentar elogiar alguém. Mas vc esqueceu de marcar, fofura ✨ "
    );
    return;
  }

  await msg.reply(
    `@${mentions[0].id.user}, ${sample(compliments)} `,
    undefined,
    {
      mentions: [mentions[0]],
    }
  );
}
