import type { Message } from "whatsapp-web.js";
import prisma from "../util/prisma.js";
import { userFromMessage } from "../util/user.js";

export default async function updateName(msg: Message) {
  const name = msg.body.substring(6).trim();

  if (name.length < 3) {
    return msg.reply("Esse nome é muito curto meu");
  }

  const user = await userFromMessage(msg);

  await prisma.user.update({
    where: { id: user.id },
    data: { name },
  });

  return msg.reply(
    `Beleza ${name}, vou te chamar de ${name}, eu te chamava de ${user.name} mas agora vou te chamar de ${name}`
  );
}
