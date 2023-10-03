import type { ChatEvent } from "./types.js";

const chatIds = process.env.CHAT_ID?.split(",") || [];
const blacklist = process.env.BLACKLIST?.split(",");

const firewall: ChatEvent = {
  async action(msg) {
    console.log("Tried to use the bot on chat not allowed", msg.from);
    msg.reply(
      `
Desculpe, não estou autorizado a participar desse chat
Para autorizar, adicione o id ${msg.from} à lista de chats autorizados
        `.trim()
    );
    return;
  },

  trigger(msg) {
    if (!chatIds.includes(msg.from)) return true;

    if (msg.author && blacklist?.includes(msg.author)) return true;

    return false;
  },
};

export default firewall;
