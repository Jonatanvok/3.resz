const Discord = require("discord.js");
const tokenfile = require("./tokenfile.json");
const botconfig = require("./botconfig");
const fs = require("fs");
const weather = require("weather-js");
const commands = require("./handlers/commands");
const bot = new Discord.Client({disableEveryone: true});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


['commands'].forEach(handler => {
    require(`./handlers/${handler}`)(bot)
})

bot.on("message", async message => {
    let prefix = botconfig.prefix;

    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message)

    const args = message.content.slice(prefix.length).trim().split(/ +g/);
    const cmd = args.shift().toLowerCase();

    if(cmd.length === 0) return;

    let command = bot.commands.get(cmd);

    if(!command) command = bot.commands.get(bot.aliases.get(cmd));
 
    if(command) 
    command.run(bot, message, args);
});



let botname = "Teszt2"



const üdvözlőId = "857624488442331166";
const szabályzat = "857624750376878090";
  bot.on('guildMemberAdd', async(member) => {
      console.log(member);

      const message = `Üvözöllek a szerveren <@${member.id}>. Nézd meg a <#${szabályzat}> szobát!`;

      member.guild.channels.cache.get(üdvözlőId).send(message);
  });
  const kilépőid = "857624535732846602";
  bot.on('guildMemberRemove', async(member) => {
     console.log(member);

     const message = `Sajnos <@${member.id}> kilépett.`;

     member.guild.channels.cache.get(kilépőid).send(message);
  });

bot.on("ready", async() => {
    console.log(`${bot.user.username} elindult!`)

    let státuszok = [
        "Prefix: -",
        "Készítő: Jonatán"
    ]
    
    setInterval(function(){
        let status = státuszok[Math.floor(Math.random()* státuszok.length)]

        bot.user.setActivity(status, {type: "WATCHING"})
    },3000)




bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix

    const Discord = require("discord.js");

if(cmd === `${prefix}mute`){
    message.delete();
    if(message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']) && !message.member.hasPermission('ADMINISTRATOR'))
    message.channel.send('Nincs jogosultágod használni!');
    else{
        const user = message.mentions.users.first();
        const member = message.guild.member(user);

        if(member){
            if(member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']) && !message.member.hasPermission('ADMINISTRATOR'))
            message.channel.send("Nem tudod lenémítani!")

    
        else {
       let muterole = message.guild.roles.cache.get(`875676341696077844`);
       if(muterole){
           member.roles.add(muterole);
           message.channel.send("A felhasználót lenémítottuk!");
       
       }
       else
       message.channel.send("A mute tang nem található");
    }
   
}
else message.channel.send("Az illető nem található");
 }
}
if(cmd === `${prefix}szia`){
    message.channel.send(`Szia ${message.author.username}!`)
    }
if(cmd === `${prefix}report`){
    message.delete();
    if(message.channel.type === 'dm') return message.reply("Itt nem tudod használni!");

    const report_user = message.mentions.users.first();

    const channel_id = `857626409932685332`;

    const indok = message.content.slice(30);

    if(!report_user){
        return message.reply('Nem adtál meg felhasználót!');
    }
    if(!indok){
        return message.reply('Nem adtál meg indokot');
    }

    const embed = new Discord.MessageEmbed()
    .setTitle('Report')
    .setDescription(`${report_user} jelentve lett!\nIndoka: ${indok}\nBejelentő: ${message.author.username}`)
    .setFooter(bot.user.username, bot.user.displayAvatarURL())
    .setTimestamp(message.createdAt)
    .setColor("RANDOM")

    bot.channels.cache.get(channel_id).send(embed)
}
if(cmd === `${prefix}weather`){
    message.delete()
    if(args[0]){
        weather.find({search: args.join(" "), degreeType: "C"}, function(err, result){
            if (err) message.reply(err);

            if(result.length === 0){
                message.reply("Adj meg egy települést!")
                return;
            }

            let current = result[0].current;
            let location = result[0].location;

            let weatherEmbed = new Discord.MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Időjárás itt: ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor("GREEN")
            .addField("Időzóna:", `UTC${location.timezone}`, true)
            .addField("Hőfok:", `${current.temperature}C`, true)
            .addField("Hőérzet:", `${current.feelslike}C`, true)
            .addField("Szél:", `${current.winddisplay}`, true)
            .addField("Páratartalom:", `${current.humidity}%`, true)

            message.channel.send(weatherEmbed);
        })
    }else{
        message.reply("Kérlek adj meg egy település nevét!")
    }
}

    if(cmd === `${prefix}szia`){
        message.channel.send("Heló!")
    }

    
if(cmd === `${prefix}help`){
    //embed
    let HelpEmbed = new Discord.MessageEmbed()
    .setAuthor(message.author.username)
    .setTitle("**Teszt2 PARANCSOK:**")
    .setDescription("Ezek a parancsok vannak:\n\n**🤣Fun🤣**\n`weather`, `cat`, `dog`, `meme`\n\n**📌Általános📌\n`report`**\n\n**🔒Moderáció🔒**\n`mute`, `clear`, `ban`, `unban`\n\n**📝Infók📝**\n`serverinfo`, `userinfo`, `botinfo`, `ranginfo`, `üzemidő`, `ping`\n\n**💸Ecenomy💸\n`money`,`moneylb`, `slot`, `freemoney`, `pay`**")
    .setThumbnail(message.author.displayAvatarURL())
    .setFooter(`${botname}`)
    //küldés
    message.channel.send(HelpEmbed)
}

if(cmd === `${prefix}cardano`){
    const coingecko = require('coingecko-api');
    const coingeckoclient = new coingecko();
    let data = await coingeckoclient.simple.price({
        ids: ['cardano'],
        vs_currencies: ['eur'],
    });
    let embed = new Discord.MessageEmbed()
    .setAuthor('Cardano árfolyam...')
    .setDescription('Cardano jelenlegi árfolyama:\n\n**EUR:**\n' + data.data.cardano.eur + " EURO")
    .setTimestamp(message.createdAt)
    message.channel.send(embed)
}
})



})
bot.login(tokenfile.token);