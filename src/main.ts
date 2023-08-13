import "dotenv/config";
import whatsapp from "whatsapp-web.js";
import compliment from "./actions/compliment.js";
import insult from "./actions/insult.js";
import motherInsult from "./actions/mother.js";
import netto from "./actions/netto.js";
import sticker from "./actions/sticker.js";
import gpt from "./actions/gpt.js";

const chatIds = process.env.CHAT_ID?.split(",");

if (chatIds == null)
  throw new Error("Please specify the chat ids this bot will operate on");

const client = new whatsapp.Client({
  authStrategy: new whatsapp.LocalAuth(),
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
  if (!chatIds.includes(msg.from)) {
    return;
  }

  try {
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
  } catch (e) {
    console.error(e);
    await msg.reply("Deu ruim bixão, não consegui processar seu comando");
  }
});

client.initialize();
