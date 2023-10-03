import compliment from "./actions/compliment.js";
import dalle from "./actions/dalle.js";
import debts from "./actions/debts.js";
import firewall from "./actions/firewall.js";
import gpt from "./actions/gpt.js";
import insult from "./actions/insult.js";
import mock from "./actions/mock.js";
import motherInsult from "./actions/motherInsult.js";
import registerDebt from "./actions/registerDebt.js";
import sticker from "./actions/sticker.js";
import updateName from "./actions/updateName.js";
import youtubeDownload from "./actions/youtubeDownload.js";

import ChatBot from "./util/ChatBot.js";

const chatbot = new ChatBot();

chatbot.registerAction(firewall);

// Insults
chatbot.registerAction(insult);
chatbot.registerAction(compliment);
chatbot.registerAction(motherInsult);

// Money-related
chatbot.registerAction(debts);
chatbot.registerAction(registerDebt);
chatbot.registerAction(updateName);

// Utility
chatbot.registerAction(sticker);
chatbot.registerAction(youtubeDownload);
chatbot.registerAction(dalle);
chatbot.registerAction(gpt);

// Mock
chatbot.registerAction(mock);

export default chatbot;
