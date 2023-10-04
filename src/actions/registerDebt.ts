import type { ChatEvent } from "../types.js";
import prisma from "../util/prisma.js";
import { userFromContact } from "../util/user.js";

const registerDebt: ChatEvent = {
  async action(msg) {
    await msg.reply("Essa feature está em desenvolvimento");
    const matches = msg.body.match(/^.* (\d*@.*) (\d*(?:\.\d{2})?) (\w.*)$/);
    const author = await msg.getContact();
    const mentions = await msg.getMentions();

    const chat = await msg.getChat();
    chat.sendStateTyping();

    if (matches == null || mentions.length !== 1) {
      await msg.reply(`Formato inválido! O comando é assim "!devo {quem você deve} {valor da dívida} {mensagem para lembrar}"
    Ex.: !devo @Juninho 10.50 Jantar com meu amigo e a esposa dele estava uma delícia`);
      return;
    }

    const value = +matches[2];
    const description = matches[3];

    if (isNaN(value)) {
      await msg.reply("Valor inválido");
      return;
    }
    const from = await userFromContact(author);
    const to = await userFromContact(mentions[0]);

    await prisma.debt.create({
      data: { description, value: value * 100, fromId: from.id, toId: to.id },
    });

    await msg.reply(
      `Beleza! Sua dívida de ${value} para @${mentions[0].id.user} foi registrada`,
      undefined,
      { mentions: [mentions[0]] }
    );
  },
  trigger(msg) {
    return msg.body.startsWith("!devo");
  },
};

export default registerDebt;
