import "dotenv/config";
import chatbot from "./chatbot.js";
import qrcode from "qrcode-terminal";
import whatsapp from "whatsapp-web.js";

const client = new whatsapp.Client({
  authStrategy: new whatsapp.LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox"],
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

chatbot.registerClient(client);

client.initialize();
