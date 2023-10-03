import type { Client, Message } from "whatsapp-web.js";
import type { ChatEvent } from "../actions/types.d.ts";

export default class ChatBot {
  private events: ChatEvent[] = [];

  public registerAction(event: ChatEvent) {
    this.events.push(event);
  }

  private async onMessage(msg: Message, client: Client) {
    for (const { trigger, action } of this.events) {
      if (await trigger(msg, client)) {
        await action(msg, client);

        break;
      }
    }
  }

  public registerClient(client: Client) {
    client.on("message", async (msg) => {
      try {
        await this.onMessage(msg, client);
      } catch (e) {
        console.error(e);
        await msg.reply("Deu ruim bixão, não consegui processar seu comando");
      }
    });
  }
}
