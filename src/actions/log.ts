import type { ChatEvent } from "./types.js";

const log: ChatEvent = {
  async action(msg) {
    console.log(msg);
  },
  trigger() {
    return false;
  },
};

export default log;
