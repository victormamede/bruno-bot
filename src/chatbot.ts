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
import log from "./middlewares/log.js";

import ChatBot from "./util/ChatBot.js";

const chatbot = new ChatBot();

chatbot.registerMiddleware(log);

chatbot.registerAction(firewall);

// Insults
chatbot.registerAction(insult, "*!ofender @Fulano*: Ofende o otário a pessoa");
chatbot.registerAction(
  compliment,
  "*!elogiar @Fulano*: Elogia o arrombado (mas é mentira)"
);
chatbot.registerAction(
  motherInsult,
  "*!mae @Fulano*: Ofende a progenitora do fdp"
);

// Money-related
chatbot.registerAction(debts, "*!dividas*: Printa suas dívidas");
chatbot.registerAction(
  registerDebt,
  "*!devo @Fulano {quantidade} {mensagem}*: Registra que você é um pobre nojento que gosta de dever os outros"
);

// Utility
chatbot.registerAction(
  updateName,
  "*!nome {novo nome}*: Muda seu nome igual os travestis fazem na vida real"
);
chatbot.registerAction(
  sticker,
  "*!figurinha*: Faz figurinha, não esquece de mandar a imagem seu burro"
);
chatbot.registerAction(
  youtubeDownload,
  "*!download {url do youtube}*: Baixa vídeo do youtube"
);
//chatbot.registerAction(
//  dalle,
//  "*!dalle {prompt}*: Faz uma imagem de IA, mas é muito caro"
//);
chatbot.registerAction(
  gpt,
  "*@Mencione ou Responda uma mensagem do Bruno-Bot*: Ele te responde de volta"
);

// Mock
chatbot.registerAction(mock, "De vez em quando ele também zomba da sua cara");

export default chatbot;
