import whatsapp from "whatsapp-web.js";
import type { ChatEvent } from "./types.js";
import openai from "../util/openai.js";

const dalle: ChatEvent = {
  async action(msg) {
    const message = msg.body.substring(7);
    msg.reply(`Gerando imagem de *${message}*`);
    const image = await openai.images.generate({
      prompt: message,
      size: "512x512",
      n: 1,
    });

    const media = await whatsapp.MessageMedia.fromUrl(
      image.data[0].url as string
    );
    msg.reply(media, undefined, { caption: message });
  },
  trigger(msg) {
    return msg.body.startsWith("!dalle");
  },
};

export default dalle;
