import "dotenv/config";
import qrcode from "qrcode-terminal";
import whatsapp from "whatsapp-web.js";
import chatbot from "./chatbot.js";

const client = new whatsapp.Client({
  authStrategy: new whatsapp.LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox"],
    executablePath: "/usr/bin/brave",
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
