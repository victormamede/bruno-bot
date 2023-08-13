import "dotenv/config";
import { Client, LocalAuth } from "whatsapp-web.js";
import compliment from "./actions/compliment";
import insult from "./actions/insult";
import motherInsult from "./actions/mother";
import netto from "./actions/netto";
import sticker from "./actions/sticker";
import gpt from "./actions/gpt";

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
  if (msg.from !== chatId) {
    return;
  }

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

    case msg.body.startsWith("!elogiar"):
      await compliment(msg);
      break;

    case msg.body.startsWith("!gpt"):
      await gpt(msg);
      break;

    default:
      break;
  }
});

client.initialize();
