import type { ChatEvent } from "../types.js";
import whatsapp, { type Message } from "whatsapp-web.js";
import { sample } from "../util/array.js";
import { readdir } from "node:fs/promises";
import { predicates } from "../data/insults.js";
import { join } from "node:path";

const mock: ChatEvent = {
  async action(msg: Message) {
    const diceRoll = Math.random();

    if (diceRoll < 0.3) {
      messageMock(msg);
    } else {
      stickerMock(msg);
    }
  },
  trigger() {
    return Math.random() < 0.02;
  },
};

async function messageMock(msg: Message) {
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

async function stickerMock(msg: Message) {
  const imagesPath = join(process.cwd(), "assets", "mock");
  const files = await readdir(imagesPath);

  const index = Math.floor(Math.random() * files.length);
  const media = whatsapp.MessageMedia.fromFilePath(
    join(imagesPath, files[index])
  );
  await msg.reply("", undefined, { media, sendMediaAsSticker: true });
}

export default mock;
