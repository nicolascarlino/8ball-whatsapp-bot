// index.js
// For help, go to the repositorie on GitHub
// 

// Packages
require('dotenv').config()
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

// Json
const config = require("./config.json")

// Initialize code
const SESSION_FILE_PATH = "./session.json";

// Number configuration
const country_code = config.country_code;
const number = config.number;

let sessionData;

if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
    session: sessionData,
});

client.initialize();


// Generate QR Code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

// Errors on auth
client.on('authenticated', session => {
    sessionData = session;

    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if(err) {
            console.log(err);
        }
    })
})

client.on('auth_failure', msg => {
    console.error("[Whatsapp Bot] There is an error on the authentication", msg);
})

// Bot ready
client.on('ready', () => {
    console.log("[Whatsapp Bot] The client initialized successfully");
})


// Commands
// Help
client.on('message', msg => {
    // Help
    if(msg.body == "/help") {
        client.sendMessage(msg.from, `[8Ball Bot] 

        /help [Show this]
        /8ball <Your Question> [8 Ball Game] `)
    }

    // 8 Ball
    else if(msg.body.startsWith("/8ball")) {
        if(msg.body.slice(7) === null) {
            client.sendMessage(msg.from, "That is even a question?");
        }

        else{
            var random_number = Math.floor(Math.random() * 12) + 1;
        
            if(random_number == 1){
                msg.reply("Yes!");
            }

            if(random_number == 2){
                msg.reply("No! :(");
            }

            if(random_number == 3){
                msg.reply("May be");
            }

            if(random_number == 4){
                msg.reply("Probably");
            }

            if(random_number == 5){
                msg.reply("Probably not");
            }

            if(random_number == 6){
                msg.reply("Uhh, I'm hungry, Im going to the kitchen");
            }

            if(random_number == 7){
                msg.reply("Everything points to yes");
            }

            if(random_number == 8){
                msg.reply("Everything points to no");
            }

            if(random_number == 9){
                msg.reply("Clearly");
            }

            if(random_number == 10){
                msg.reply("You must trust it");
            }

            if(random_number == 11){
                msg.reply("Very doubtful");
            }

            if(random_number == 12){
                msg.reply("Very doubtful");
            }
        }
    }
})
