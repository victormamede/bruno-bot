import type { Client, Message } from "whatsapp-web.js";
import { userFromMessage } from "../util/user.js";
import prisma from "../util/prisma.js";

const brazilianReal = Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default async function debts(msg: Message, client: Client) {
  const user = await userFromMessage(msg);
  const debts = (await prisma.$queryRaw`
    SELECT SUM(value) as _sum, User.name as toName, Debt.toId as toId 
    FROM Debt JOIN User ON Debt.toId = User.id 
    WHERE Debt.fromId = ${user.id}
    GROUP BY Debt.toId
    `) as {
    _sum: number;
    toName: string;
    toId: string;
  }[];

  if (debts.length === 0) {
    return msg.reply("Você não deve ninguém camarada");
  }

  const chat = await msg.getChat();

  let reply = `Aqui suas dívidas pilantra:\n`;
  const mentions = [];

  for (const debt of debts) {
    const contact = await client.getContactById(debt.toId);

    reply += `${brazilianReal.format(debt._sum)} para @${
      debt.toId.split("@")[0]
    }\n`;
    mentions.push(contact);
  }

  await msg.reply(reply, undefined, { mentions });
  await chat.sendMessage(`Agora paga caloteiro`);
}
