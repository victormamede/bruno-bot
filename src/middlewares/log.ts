import type { Middleware } from "../types.js";

const log: Middleware = async (msg) => {
  console.log(`[${new Date()}]:`, msg.from);
};

export default log;
