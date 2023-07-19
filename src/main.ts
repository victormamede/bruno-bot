import { Client, LocalAuth } from "whatsapp-web.js";
import { nettoInsults } from "./utils/nettoInsults";

const groupId = process.env.GROUP_ID;

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox"],
  },
});

const learning: string[] = [...nettoInsults, "Remulo tambem é gay ✨"];

client.on("qr", (qr) => {
  console.log(qr);
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  if (msg.from === groupId) {
    learning.push(msg.body);

    if (Math.random() < 0.2) {
      const randomIndex = Math.floor(Math.random() * learning.length);
      const random = learning[randomIndex];
      msg.reply(random);
    }

    if (
      msg.body === "!netto" ||
      msg.body === "!neto" ||
      msg.body.includes("neto")
    ) {
      const randomIndex = Math.floor(Math.random() * nettoInsults.length);
      const xingamento = nettoInsults[randomIndex];
      msg.reply(xingamento);
      return;
    }

    if (msg.body.startsWith("!ofender")) {
      if (msg.from !== groupId) {
        return;
      }
      const mentions = await msg.getMentions();
      if (mentions.length > 0) {
        const resp = await fetch("https://xinga-me.appspot.com/api");
        const body = (await resp.json()) as { xingamento: string };

        msg.reply(`@${mentions[0].id.user}, ${body.xingamento}`, undefined, {
          mentions: [mentions[0]],
        });
      } else {
        msg.reply("Eu vou xingar você se não largar de ser burro");
      }
      return;
    }

    return;
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
