import type { ChatEvent } from "../types.js";
import prisma from "../util/prisma.js";
import { userFromMessage } from "../util/user.js";

const updateName: ChatEvent = {
  async action(msg) {
    const name = msg.body.substring(6).trim();

    if (name.length < 3) {
      await msg.reply("Esse nome é muito curto meu");
      return;
    }

    const user = await userFromMessage(msg);

    await prisma.user.update({
      where: { id: user.id },
      data: { name },
    });

    await msg.reply(
      `Beleza ${name}, vou te chamar de ${name}, eu te chamava de ${user.name} mas agora vou te chamar de ${name}`
    );
  },
  trigger(msg) {
    return msg.body.startsWith("!nome");
  },
};

export default updateName;
