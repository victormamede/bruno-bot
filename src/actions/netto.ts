import type { Message } from "whatsapp-web.js";
import { nettoInsults } from "../data/nettoInsults.js";
import { sample } from "../util/array.js";

export default async function netto(msg: Message) {
  const xingamento = sample(nettoInsults);
  msg.reply(xingamento);
}
