import { Message } from "whatsapp-web.js";

export default async function gpt(msg: Message) {
  const [, message] = msg.body.split(" ", 2);

  await msg.reply("Não implementado");
}
