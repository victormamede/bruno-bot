import { Client, LocalAuth } from 'whatsapp-web.js';

const groupId = process.env.GROUP_ID;

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox'],
  },
});

const nettoInsults = [
  'sim netto é boiola gosta de chupar pika e quicar num cacete grande e ficar rebolando quando vê homem sarado ✨',
  'siiiiiim netinho muito gay pra mim ✨',
  'sim netto gosta de dançar de salto alto e fazer carão no espelho 💅',
  'sim netto tem um crush no Superman e sonha em ser salvo por ele 🦸‍♂️',
  'nossa, netinho gay pra mim ✨',
  'sim netto é apaixonado por unicórnios e coleciona todos os produtos relacionados 🦄',
  'sim netto é usuario de Crocs 👟',
  'sim netto tem elo WhatsApp fake no Valorant 😂',
  'Netto é muito domador de piroca',
  'sim netto é um verdadeiro mestre no Valorant, todos os inimigos tremem diante dele 🔫',
  'netinho gay pra mim ✨',
  'Salve',
  'Egirl e amor',
  'egirl e vida',
  'melhor assunto do mundo',
  'Egirl',
  'lindas',
  'goticas',
  'KKKKKKKKKKK',
];

const learning: string[] = [...nettoInsults, 'Remulo tambem é gay ✨'];

client.on('qr', (qr) => {
  console.log(qr);
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async (msg) => {
  if (msg.from === groupId) {
    learning.push(msg.body);

    if (Math.random() < 0.2) {
      const randomIndex = Math.floor(Math.random() * learning.length);
      const random = learning[randomIndex];
      msg.reply(random);
    }

    if (msg.body === '!netto' || msg.body === '!neto') {
      const randomIndex = Math.floor(Math.random() * nettoInsults.length);
      const xingamento = nettoInsults[randomIndex];
      msg.reply(xingamento);
      return;
    }
    if (msg.body === '!figurinha') {
      if (msg.hasMedia) {
        msg.reply('Aguenta aí chefe');
        const media = await msg.downloadMedia();
        msg.reply(media, undefined, { sendMediaAsSticker: true });
      } else {
        msg.reply('Mano, você é burro?');
      }
      return;
    }

    if (msg.body.startsWith('!ofender')) {
      if (msg.from !== groupId) {
        return;
      }
      const mentions = await msg.getMentions();
      if (mentions.length > 0) {
        const resp = await fetch('https://xinga-me.appspot.com/api');
        const body = (await resp.json()) as { xingamento: string };

        msg.reply(`@${mentions[0].id.user}, ${body.xingamento}`, undefined, {
          mentions: [mentions[0]],
        });
      } else {
        msg.reply('Eu vou xingar você se não largar de ser burro');
      }
      return;
    }

    return;
  }

  if (msg.body === '!figurinha') {
    if (msg.hasMedia) {
      msg.reply('Aguenta aí chefe');
      const media = await msg.downloadMedia();
      msg.reply(media, undefined, { sendMediaAsSticker: true });
    } else {
      msg.reply('Mano, você é burro?');
    }
  }
});

client.initialize();
