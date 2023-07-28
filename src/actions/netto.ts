import { Message } from "whatsapp-web.js";
import { nettoInsults } from "../data/nettoInsults";
import { sample } from "../util/array";

export default async function netto(msg: Message) {
  const xingamento = sample(nettoInsults);
  msg.reply(xingamento);
}
