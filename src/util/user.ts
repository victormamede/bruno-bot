import type { Message, Contact } from "whatsapp-web.js";
import prisma from "./prisma.js";

export async function userFromContact(contact: Contact) {
  const id = contact.id._serialized;

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

export async function userFromMessage(msg: Message) {
  const contact = await msg.getContact();

  return userFromContact(contact);
}
