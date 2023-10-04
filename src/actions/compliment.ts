import type { ChatEvent } from "../types.js";
import { compliments } from "../data/compliment.js";
import { sample } from "../util/array.js";

const compliment: ChatEvent = {
  async action(msg) {
    const mentions = await msg.getMentions();
    if (mentions.length === 0 || mentions[0].isMe) {
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
  },
  trigger(msg) {
    return msg.body.startsWith("!elogiar");
  },
};

export default compliment;
