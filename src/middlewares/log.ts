import type { Middleware } from "../types.js";

const log: Middleware = async (msg) => {
  console.log("New msg", msg.from);
};

export default log;
