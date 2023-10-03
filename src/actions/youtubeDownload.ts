import type { ChatEvent } from "./types.js";
import ytdl from "ytdl-core";
import { join } from "node:path";
import { createWriteStream } from "node:fs";
import whatsapp from "whatsapp-web.js";

const youtubeDownload: ChatEvent = {
  async action(msg) {
    const url = msg.body.substring(10);
    console.log(url);

    const valid = ytdl.validateURL(url);
    if (!valid) {
      await msg.reply("Url inválido seu burro");
      return;
    }
    const info = await ytdl.getInfo(url);

    const filename = `${new Date().toISOString()}.mp4`;
    const output = join(process.cwd(), "tmp", filename);

    msg.reply(`Baixando ${info.videoDetails.title}`);

    const chat = await msg.getChat();
    ytdl
      .downloadFromInfo(info)
      .pipe(createWriteStream(output))
      .on("finish", () => {
        chat.sendMessage(whatsapp.MessageMedia.fromFilePath(output), {
          caption: info.videoDetails.title,
        });
      });
  },
  trigger(msg) {
    return msg.body.startsWith("!download");
  },
};

export default youtubeDownload;
