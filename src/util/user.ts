import type { Message } from "whatsapp-web.js";
import prisma from "./prisma.js";

export async function userFromMessage(msg: Message) {
  const id = msg.author || msg.from;
  const contact = await msg.getContact();

  const user = await prisma.user.upsert({
    where: { id },
    create: {
      id,
      name: contact.pushname || contact.name || contact.shortName || "Anônimo",
    },
    update: {},
  });

  return user;
}
