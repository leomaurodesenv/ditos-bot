// ----------------------------------------------------------------
// configuration
const config = process.env;
const token = config.apiTelegram;
const mysqlConnection = {
    "host": config.mysqlHost,
    "database": config.mysqlDatabase,
    "user": config.mysqlUser,
    "password": config.mysqlPassword
}

// ----------------------------------------------------------------
// require
const MyBot = require('./class/Bot');
const saying = new MyBot(mysqlConnection);

const Bot = require('node-telegram-bot-api');
let bot;

if(config.NODE_ENV === 'production') {
    bot = new Bot(token);
    bot.setWebHook(config.HEROKU_URL + bot.token);
}
else {
    bot = new Bot(token, { polling: true });
}

// ----------------------------------------------------------------
// Bot logic
console.log('Bot server started in the "'+config.NODE_ENV+'" mode');

bot.on('message', (msg) => {
    const name = msg.from.first_name;
    const chatId = msg.chat.id;
    const text = msg.text;
    var response = 'Não entendi...';

    // command: /start or /oi
    if(text.match(/(\/start|\/oi)/i)) {
        response = 'Olá '+name+'!';
    }
    // command: /mensagem
    else if(text.match(/\/mensagem/i)) {
        response = '<b>Dito:</b> "<i>'+saying.getMessage()+'</i>"';
    }

    // send a message
    bot.sendMessage(chatId, response, {parse_mode : 'HTML'}).then(() => {
        // reply sent!
    });
});

module.exports = bot;
