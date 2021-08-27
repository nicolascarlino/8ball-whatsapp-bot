/*  index.js

 For help, go to the repositorie on GitHub

*/ 

// Packages
require('dotenv').config()
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

// Config
const config = require("./config.json")
const country_code = config.country_code;
const number = config.number;

// Initialize code
const SESSION_FILE_PATH = "./session.json";
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


/* Commands
    Help
*/
client.on('message', msg => {
    // Help
    if(msg.body == "/help") {
        client.sendMessage(msg.from, `[8Ball Bot] 

        /help [Show this]
        /8ball <Your Question> [8 Ball Game] `)
    }

    // 8 Ball
    else if(msg.body.startsWith("/8ball ")) {
        if(msg.body.slice(7) == null) {
            client.sendMessage(msg.from, "That is even a question?");
        } else {
            const random_number = Math.floor(Math.random() * 11) + 0;
            const text = [  
            "Yes!", 
            "No! :(", 
            "May be", 
            "Probably", 
            "Probably not",
            "Uhh, I'm hungry, Im going to the kitchen", 
            "Everything points to yes", 
            "Everything points to no ",
            "Clearly",
            "You must trust it",
            "Very doubtful",
            "Not Very doubtful"
            ] 

            msg.reply(text[random_number])

        }
    }
})
