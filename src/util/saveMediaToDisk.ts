import { MessageMedia } from "whatsapp-web.js";
import { writeFile } from "node:fs/promises";

export default function saveMediaToDisk(media: MessageMedia, output: string) {
  let buff = Buffer.from(media.data, "base64");

  return writeFile(output, buff);
}
