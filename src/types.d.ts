import type { Message, Client } from "whatsapp-web.js";

export type Action = (msg: Message, client: Client) => void | Promise<void>;
export type Trigger = (
  msg: Message,
  client: Client
) => boolean | Promise<boolean>;

export type Middleware = (msg: Message, client: Client) => void | Promise<void>;

export type ChatEvent = {
  action: Action;
  trigger: Trigger;
};
