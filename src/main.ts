import { Client, LocalAuth } from "whatsapp-web.js";
import netto from "./actions/netto";
import sticker from "./actions/sticker";
import insult from "./actions/insult";

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
    netto(msg);
  } else if (msg.body.startsWith("!ofender")) {
    insult(msg);
  } else if (msg.body === "!figurinha") {
    sticker(msg);
  }
});

client.initialize();
