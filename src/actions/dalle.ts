import openai from "../util/openai.js";
import whatsapp, { Message } from "whatsapp-web.js";

export default async function dalle(msg: Message) {
  msg.reply(`Gerando imagem de *${msg.body}*`);
  const image = await openai.images.generate({
    prompt: msg.body,
    size: "512x512",
    n: 1,
  });

  const media = await whatsapp.MessageMedia.fromUrl(
    image.data[0].url as string
  );
  msg.reply(media);
}
