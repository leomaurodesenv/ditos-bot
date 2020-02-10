// require
const config = process.env; //require('./config.json');
const TelegramBot = require('node-telegram-bot-api');
const Bot = require('./class/Bot');

// main class
const mysqlConnection = {
    "host": config.mysqlHost,
    "database": config.mysqlDatabase,
    "user": config.mysqlUser,
    "password": config.mysqlPassword
}
const saying = new Bot(mysqlConnection);
const bot = new TelegramBot(config.apiTelegram, {polling: true});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    var response = 'Não entendi...';

    // command: /start or /oi
    if(text.match(/(\/start|\/oi)/i)) {
        response = 'Olá!';
    }
    // command: /mensagem
    else if(text.match(/\/mensagem/i)) {
        response = '<b>Dito:</b> "<i>'+saying.getMessage()+'</i>"';
    }

    // send a message
    bot.sendMessage(chatId, response, {parse_mode : 'HTML'});
});
