import { Message } from "whatsapp-web.js";

export default async function sticker(msg: Message) {
  if (msg.hasMedia) {
    msg.reply(
      "Aí amigão, não dá pra fazer figurinha se você não me der o arquivo né jumento"
    );
    return;
  }

  msg.reply("Aguenta aí chefe");
  const media = await msg.downloadMedia();
  msg.reply(media, undefined, { sendMediaAsSticker: true });
}
