import type { Message } from "whatsapp-web.js";
import prisma from "../util/prisma.js";
import { userFromContact } from "../util/user.js";

export default async function registerDebt(msg: Message) {
  const matches = msg.body.match(/^.* (\d*@.*) (\d*(?:\.\d{2})?) (\w.*)$/);
  const author = await msg.getContact();
  const mentions = await msg.getMentions();

  const chat = await msg.getChat();
  chat.sendStateTyping();

  if (matches == null || mentions.length !== 1) {
    return msg.reply(`Formato inválido! O comando é assim "!devo {quem você deve} {valor da dívida} {mensagem para lembrar}"
    Ex.: !devo @Juninho 10.50 Jantar com meu amigo e a esposa dele estava uma delícia`);
  }

  const value = +matches[2];
  const description = matches[3];

  if (isNaN(value)) {
    return msg.reply("Valor inválido");
  }
  const from = await userFromContact(author);
  const to = await userFromContact(mentions[0]);

  await prisma.debt.create({
    data: { description, value, fromId: from.id, toId: to.id },
  });

  return msg.reply(
    `Beleza! Sua dívida de ${value} para @${mentions[0].id.user} foi registrada`,
    undefined,
    { mentions: [mentions[0]] }
  );
}
