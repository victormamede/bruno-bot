import { Client, LocalAuth } from "whatsapp-web.js";
import netto from "./actions/netto";
import sticker from "./actions/sticker";
import insult from "./actions/insult";

const chatId = process.env.CHAT_ID;

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
  console.log(msg.from);
  if (msg.from !== chatId) {
    return;
  }

  if (msg.body === "!netto" || msg.body === "!neto") {
    await netto(msg);
  } else if (msg.body.startsWith("!ofender")) {
    await insult(msg);
  } else if (msg.body.startsWith("!figurinha")) {
    await sticker(msg);
  }
});

client.initialize();
