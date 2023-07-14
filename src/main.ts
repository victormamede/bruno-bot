import { Client, LocalAuth } from "whatsapp-web.js";

const groupId = process.env.GROUP_ID;

const client = new Client({
  authStrategy: new LocalAuth(),
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

  if (msg.body == "!figurinha") {
    if (msg.hasMedia) {
      msg.reply("Aguenta aí chefe");
      const media = await msg.downloadMedia();
      msg.reply(media, undefined, { sendMediaAsSticker: true });
    } else {
      msg.reply("Mano, você é burro?");
    }
  } else if (msg.body.startsWith("!ofender")) {
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
  }
});

client.initialize();
