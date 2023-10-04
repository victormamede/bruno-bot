import type { ChatEvent } from "../types.js";
import { userFromMessage } from "../util/user.js";
import prisma from "../util/prisma.js";
import type { Contact } from "whatsapp-web.js";

const brazilianReal = Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const debts: ChatEvent = {
  async action(msg, client) {
    await msg.reply("Essa feature está em desenvolvimento");

    const user = await userFromMessage(msg);
    const debts = (await prisma.$queryRaw`
    SELECT SUM(value) as _sum, User.name as toName, Debt.toId as toId 
    FROM Debt JOIN User ON Debt.toId = User.id 
    WHERE Debt.fromId = ${user.id}
    GROUP BY Debt.toId
    `) as {
      _sum: bigint;
      toName: string;
      toId: string;
    }[];

    if (debts.length === 0) {
      await msg.reply("Você não deve ninguém camarada");
      return;
    }

    let reply = `Aqui suas dívidas pilantra:\n`;
    const mentions: Contact[] = [];

    for (const debt of debts) {
      const contact = await client.getContactById(debt.toId);

      console;
      reply += `${brazilianReal.format(Number(debt._sum) / 100)} para @${
        debt.toId.split("@")[0]
      }\n`;
      mentions.push(contact);
    }

    const chat = await msg.getChat();
    await chat.sendMessage(reply, { mentions });
    await chat.sendMessage(`Agora paga caloteiro`);
  },

  trigger(msg) {
    return msg.body.startsWith("!dividas");
  },
};

export default debts;
