import mime from "mime-types";
import { spawn } from "node:child_process";
import { unlink } from "node:fs/promises";
import { join } from "node:path";
import { Message, MessageMedia } from "whatsapp-web.js";
import saveMediaToDisk from "../util/saveMediaToDisk";

export default async function sticker(msg: Message) {
  if (!msg.hasMedia) {
    msg.reply(
      "Aí amigão, não dá pra fazer figurinha se você não me der o arquivo né jumento"
    );
    return;
  }

  const [, ...args] = msg.body.split(" ");

  msg.reply("Aguenta aí chefe");
  const media = await msg.downloadMedia();

  if (args.includes("remover-fundo")) {
    if (!media.mimetype.startsWith("image/")) {
      msg.reply("Só consigo remover o fundo de imagens meu bom");
      return;
    }

    const filename = `${new Date().toISOString()}.${mime.extension(
      media.mimetype
    )}`;
    const inputPath = join(process.cwd(), "tmp", filename);
    const outputPath = join(process.cwd(), "tmp", "out-" + filename);

    await saveMediaToDisk(media, inputPath);
    await msg.reply("removendo plano de fundo");

    const rembg = spawn("rembg", ["i", inputPath, outputPath]);

    rembg.on("error", (err) => {
      console.error(err);
    });

    rembg.on("close", (code) => {
      if (code !== 0) {
        msg.reply(`Deu ruim meu, o programa retornou ${code}`);
        unlink(inputPath);
        return;
      }

      msg.reply(MessageMedia.fromFilePath(outputPath), undefined, {
        sendMediaAsSticker: true,
      });

      unlink(inputPath);
      unlink(outputPath);
    });
  } else {
    await msg.reply(media, undefined, { sendMediaAsSticker: true });
  }
}
