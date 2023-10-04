import type { Client, Message } from "whatsapp-web.js";
import type { ChatEvent, Middleware } from "../types.js";

export default class ChatBot {
  private events: ChatEvent[] = [];
  private middlewares: Middleware[] = [];
  private help: string = "Aqui vai a lista de comandos: \n";

  public registerMiddleware(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  public registerAction(event: ChatEvent, helpText?: string) {
    this.events.push(event);

    if (helpText) {
      this.help += "\n" + helpText;
    }
  }

  private async onMessage(msg: Message, client: Client) {
    for (const middleware of this.middlewares) {
      middleware(msg, client);
    }
    for (const { trigger, action } of this.events) {
      if (await trigger(msg, client)) {
        await action(msg, client);

        break;
      }
    }
  }

  public registerClient(client: Client) {
    client.on("message", async (msg) => {
      if (msg.body.startsWith("!help")) {
        msg.reply(this.help);
        return;
      }

      try {
        await this.onMessage(msg, client);
      } catch (e) {
        console.error(e);
        await msg.reply("Deu ruim bixão, não consegui processar seu comando");
      }
    });
  }
}
