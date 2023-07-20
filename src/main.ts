import { Client, LocalAuth } from "whatsapp-web.js";
import { nettoInsults } from "./data/nettoInsults";
import { predicates, subjects } from "./data/insults";
import { sample } from "./util/array";

const groupId = process.env.GROUP_ID;

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox"],
  },
});

client.on("qr", (qr) => {
  console.log(qr);
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  if (msg.from !== groupId) {
    return;
  }

  if (msg.body === "!netto" || msg.body === "!neto") {
    const randomIndex = Math.floor(Math.random() * nettoInsults.length);
    const xingamento = nettoInsults[randomIndex];
    msg.reply(xingamento);
  }

  if (msg.body.startsWith("!ofender")) {
    const mentions = await msg.getMentions();
    if (mentions.length > 0) {
      msg.reply(
        `@${mentions[0].id.user}, ${sample(subjects)} ${sample(predicates)}`,
        undefined,
        {
          mentions: [mentions[0]],
        }
      );
    } else {
      msg.reply("Eu vou xingar você se não largar de ser burro");
    }
  }

  if (msg.body === "!figurinha") {
    if (msg.hasMedia) {
      msg.reply("Aguenta aí chefe");
      const media = await msg.downloadMedia();
      msg.reply(media, undefined, { sendMediaAsSticker: true });
    } else {
      msg.reply("Mano, você é burro?");
    }
  }
});

client.initialize();
