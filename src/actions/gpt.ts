import { ChatGPTAPI } from "chatgpt";
import { userFromContact, userFromMessage } from "../util/user.js";
import type { ChatEvent } from "../types.js";

// TODO: Remove chatgpt dependency
const apiKey = process.env.OPENAI_API_KEY as string;

const api = new ChatGPTAPI({
  apiKey,
  systemMessage: `Você é o Bruno Bot, você dá curtas em tom passivo-agressivo, utiliza gírias de gangster e sempre inicia uma resposta com alguma leve ofensa.
    Às vezes você se recusa a responder uma pergunta a menos que a pessoa diga "por favor", responda a pergunta a pergunta se a pessoa dizer por favor em seguida`,
});

let parentMessageIds: { [key: string]: string } = {};

const gpt: ChatEvent = {
  async action(msg) {
    let message = msg.body;
    const mentions = await msg.getMentions();
    await Promise.all(
      mentions.map(async (mention) => {
        const user = await userFromContact(mention);

        message = message.replace(`@${mention.id.user}`, user.name);
      })
    );

    const chat = await msg.getChat();
    const user = await userFromMessage(msg);

    let currentPromise = Promise.resolve();
    let isFirstMessage = true;

    const queueMessage = (text: string) => {
      currentPromise = currentPromise.then(async () => {
        if (isFirstMessage) {
          await msg.reply(text);
          isFirstMessage = false;
        } else {
          await chat.sendMessage(text);
        }
      });
    };

    let currentMessage = "";

    const resp = await api.sendMessage(message, {
      parentMessageId: parentMessageIds[msg.from],
      onProgress: (partialResponse) => {
        if (partialResponse.delta == null) return;

        chat.sendStateTyping();
        currentMessage += partialResponse.delta;

        const parts = currentMessage.split("\n\n");

        if (parts.length <= 1) {
          return;
        }

        while (parts.length > 1) {
          queueMessage(parts.shift() as string);
        }
        currentMessage = parts.shift() || "";
      },
      name: user.name.split(" ")[0].replace(/[^a-zA-Z0-9_-]/g, "_"),
    });
    if (currentMessage) queueMessage(currentMessage);

    parentMessageIds[msg.from] = resp.id;
  },
  async trigger(msg, client) {
    const chat = await msg.getChat();

    if (!chat.isGroup) return true;
    if ((await msg.getMentions()).some((mention) => mention.isMe)) return true;
    if (msg.hasQuotedMsg && (await msg.getQuotedMessage()).fromMe) return true;

    return false;
  },
};

export default gpt;
