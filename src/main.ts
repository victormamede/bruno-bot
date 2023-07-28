import { Client, LocalAuth } from "whatsapp-web.js";
import insult from "./actions/insult";
import motherInsult from "./actions/mother";
import netto from "./actions/netto";
import sticker from "./actions/sticker";

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

  switch (true) {
    case msg.body === "!netto" || msg.body === "!neto":
      await netto(msg);
      break;

    case msg.body.startsWith("!ofender"):
      await insult(msg);
      break;

    case msg.body.startsWith("!mae"):
      await motherInsult(msg);
      break;

    case msg.body.startsWith("!figurinha"):
      await sticker(msg);
      break;

    default:
      break;
  }
});

client.initialize();
