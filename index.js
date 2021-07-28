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
                client.sendMessage(msg.from, "Yes!");
            }

            if(random_number == 2){
                client.sendMessage(msg.from, "No! :(");
            }

            if(random_number == 3){
                client.sendMessage(msg.from, "May be");
            }

            if(random_number == 4){
                client.sendMessage(msg.from, "Probably");
            }

            if(random_number == 5){
                client.sendMessage(msg.from, "Probably not");
            }

            if(random_number == 6){
                client.sendMessage(msg.from, "Uhh, I'm hungry, Im going to the kitchen");
            }

            if(random_number == 7){
                client.sendMessage(msg.from, "Everything points to yes");
            }

            if(random_number == 8){
                client.sendMessage(msg.from, "Everything points to no");
            }

            if(random_number == 9){
                client.sendMessage(msg.from, "Clearly");
            }

            if(random_number == 10){
                client.sendMessage(msg.from, "You must trust it");
            }

            if(random_number == 11){
                client.sendMessage(msg.from, "Very doubtful");
            }

            if(random_number == 12){
                client.sendMessage(msg.from, "Very doubtful");
            }
        }
    }
})