import type { ChatEvent } from "./types.js";
import type { Message } from "whatsapp-web.js";
import { mother } from "../data/mother.js";
import { sample } from "../util/array.js";

const motherInsult: ChatEvent = {
  async action(msg: Message) {
    const mentions = await msg.getMentions();
    if (mentions.length === 0) {
      await msg.reply(
        `Você é burro igual sua mãe, esqueceu de marcar o amigo.`
      );
      return;
    }

    await msg.reply(`@${mentions[0].id.user}, ${sample(mother)}`, undefined, {
      mentions: [mentions[0]],
    });
  },
  trigger(msg) {
    return msg.body.startsWith("!mae");
  },
};

export default motherInsult;
