const Discord = require("discord.js");

module.exports = {
    name: "teszt",
    category: "teszt kategória",
    descripton: "teszt commmand",
    run: async (bot, message, args) => {

        message.channel.send("okaisihasjodhao")
    }
    
}