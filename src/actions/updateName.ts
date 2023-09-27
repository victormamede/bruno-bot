import type { Message } from "whatsapp-web.js";
import prisma from "../util/prisma.js";

export default async function updateName(msg: Message) {
  const id = msg.author || msg.from;
  const name = msg.body.substring(6).trim();

  if (name.length < 3) {
    return msg.reply("Esse nome é muito curto meu");
  }

  await prisma.user.upsert({
    where: { id },
    create: { id, name },
    update: { name },
  });

  return msg.reply(
    `Beleza ${name}, vou te chamar de ${name} agora então ok ${name}`
  );
}
