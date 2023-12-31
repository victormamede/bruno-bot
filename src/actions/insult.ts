import type { Message } from "whatsapp-web.js";
import { predicates, subjects } from "../data/insults.js";
import { mother } from "../data/mother.js";
import { sample } from "../util/array.js";

export default async function insult(msg: Message) {
  const mentions = await msg.getMentions();

  if (mentions.length === 0) {
    msg.reply(
      "Eu vou adivinhar quem é pra xingar??? Vou xingar é você se não largar de ser burro"
    );
    return;
  }

  if (mentions[0].isMe) {
    await msg.reply(
      `${sample(subjects)}, vai xingar outro, ${sample(mother)} `
    );

    return;
  }

  await msg.reply(
    `@${mentions[0].id.user}, ${sample(subjects)} ${sample(predicates)}`,
    undefined,
    {
      mentions: [mentions[0]],
    }
  );
}
