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
    if(cmd === `${prefix}Clear`){
        //üzenet törlése
        message.delete();
        if(message.member.hasPermission("MANAGE_MESSAGES")){
          //rang
            if(message.guild.member(bot.user).hasPermission("ADMINISTRATOR")){
          //meddig lehet törölni
                if(args[0] && isNaN(args[0]) && args [0] <=100 || 0 < args[0] && args[0] < 101){
          //üzenet
                    message.channel.send(`Törölve lett: ${Math.round(args[0])} üzenet!`)
                    message.channel.bulkDelete(Math.round(args[0]))
          //használat
                } else {
                    message.re
                    ply(`Használat: ${prefix}Clear <1-100>`)
                }
                //ha a botnak nincs rangja
            } else message.reply("A JonatánTeam-nek adminnaknak kell lennie a szervren, hogy működjön ez a parancs!")
        //ha az embernek nincs joga
        } else message.reply("Ehhez a parancshoz nincs jogod")
    }
    if(cmd === `${prefix}clear`){
      //üzenet törlése
      message.delete();
      if(message.member.hasPermission("MANAGE_MESSAGES")){
        //rang
          if(message.guild.member(bot.user).hasPermission("ADMINISTRATOR")){
        //meddig lehet törölni
              if(args[0] && isNaN(args[0]) && args [0] <=100 || 0 < args[0] && args[0] < 101){
        //üzenet
                  message.channel.send(`Törölve lett: ${Math.round(args[0])} üzenet!`)
                  message.channel.bulkDelete(Math.round(args[0]))
        //használat
              } else {
                  message.re
                  ply(`Használat: ${prefix}clear <1-100>`)
              }
              //ha a botnak nincs rangja
          } else message.reply("A JonatánBOT-nak adminnaknak kell lennie a szervren, hogy működjön ez a parancs!")
      //ha az embernek nincs joga
      } else message.reply("Ehhez a parancshoz nincs jogod")
    }
    if(cmd == `${prefix}ping`) {
        message.channel.send(`Ping: **${bot.ws.ping}ms**`)
      }
      if(cmd === `${prefix}serverinfo`){
        const verificationLevels = {
          NONE: '`Nincs`',
          LOW: '`Alacsony`',
          MEDIUM: '`Közepes`',
          HIGH: '`Magas`',
          VERY_HIGH: '`Legmagasabb`'
        };
        const notifications = {
          ALL: '`Minden`',
          MENTIONS: '`Említések`'
        };  
          const infoembed = new Discord.MessageEmbed()
          infoembed.setAuthor(`${message.guild.name}`)
          infoembed.setColor('#5CC5FF')
          infoembed.setTitle("**Szerver információk:**")
          infoembed.setThumbnail(message.guild.iconURL())
          infoembed.addField(`**Szerver neve:**`, `${message.guild.name}`)
          infoembed.addField(`**Szerver tulajdonosa:**`, `${message.guild.owner}`)
          infoembed.addField(`**Szerver ID:**`, `${message.guild.id}`)
          infoembed.addField(`**Szerver készülte:**`, `${message.guild.createdAt}`)
          infoembed.addField(`**Szerver régiója:**`, `${message.guild.region}`)
          infoembed.addField('**Szabályzati Beállítás:**', (message.guild.rulesChannel) ? `${message.guild.rulesChannel}` : '`Nincs`', true)
          infoembed.addField('**AFK időkorlát:**', `${message.guild.afkTimeout / 60} perc`, true)
          infoembed.addField('**AFK Csatorna:**', (message.guild.afkChannel) ? `${message.guild.afkChannel.name}` : '`Nincs`', true)
          infoembed.setTimestamp();
      
          message.channel.send(infoembed);
      }
      if(cmd === `${prefix}cat`) {
        let msg = await message.channel.send("Generálás...") 
      
      let {body} = await superagent
      .get(`http://aws.random.cat/meow`)
      //console.log(body.file) 
      if(!{body}) return message.channel.send("Nem sikerült a kép legenerálása!")
      
      let cEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor('Unrealy | Cica', message.guild.iconURL())
      .setImage(body.file)
      .setTimestamp()
      .setFooter('Forrás: Teszt2')
      
      message.channel.send(cEmbed)
      
      msg.delete();
      }
      if(cmd === `${prefix}meme`){
        message.delete()
        const subreddits = ["dankmeme", "meme", "me_irl"]
        const random = subreddits[Math.floor(Math.random() * subreddits.length)]
      
        const IMG = await randomPuppy(random)
        const MemeEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(IMG)
        .setTitle(`Keresési szöveg: ${random} (KATT IDE!)`)
        .setURL(`https://www.reddit.com/r/${random}`)
      
        message.channel.send(MemeEmbed)
      }
      if(cmd === `${prefix}meme`){
        const subreddits = ["dankmeme", "meme", "me_irl"]
        const random = subreddits[Math.floor(Math.random() * subreddits.length)]
      
        const IMG = await randomPuppy(random)
        const MemeEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(IMG)
        .setTitle(`Keresési szöveg: ${random} (KATT IDE!)`)
        .setURL(`https://www.reddit.com/r/${random}`)
      
        message.channel.send(MemeEmbed)
      }
      if(cmd === `${prefix}helpmeme`){
        message.channel.send(`Helyes használat: ${prefix}meme. A bot beküld egy mémet.`)
      }
      
      if(cmd === `${prefix}dog`) {
        let msg = await message.channel.send('Generálás... ')
      
      var dog;
      
      dog = await superagent
        .get("https://random.dog/woof.json");
      
      while (dog.body.url.endsWith(".webm") || dog.body.url.endsWith(".mp4")) {
       dog = await superagent
           .get("https://random.dog/woof.json");
       console.log(dog.body)
      }
      msg.delete()
      var embed = new Discord.MessageEmbed()
       .setColor("#ff0000")
       .setTitle("Unrealy | Kutya")
       .setImage(dog.body.url)
       .setFooter(`Forrás: Teszt2`)
      message.channel.send(embed);
      }
      if(cmd === `${prefix}Dog`) {
      let msg = await message.channel.send('Generálás... ')
      
      var dog;
      
      dog = await superagent 
      .get("https://random.dog/woof.json");
      
      while (dog.body.url.endsWith(".webm") || dog.body.url.endsWith(".mp4")) {
      dog = await superagent
        .get("https://random.dog/woof.json");
      console.log(dog.body)
      }
      msg.delete()
      var embed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTitle("Unrealy | Kutya")
      .setImage(dog.body.url)
      .setFooter(`Forrás: Teszt2`)
      message.channel.send(embed);
      }
      if(cmd === `${prefix}meme`){
        message.delete()
        const subreddits = ["dankmeme", "meme", "me_irl"]
        const random = subreddits[Math.floor(Math.random() * subreddits.length)]
      
        const IMG = await randomPuppy(random)
        const MemeEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(IMG)
        .setTitle(`Keresési szöveg: ${random} (KATT IDE!)`)
        .setURL(`https://www.reddit.com/r/${random}`)
      
        message.channel.send(MemeEmbed)
      }
      if(cmd === `${prefix}meme`){
        const subreddits = ["dankmeme", "meme", "me_irl"]
        const random = subreddits[Math.floor(Math.random() * subreddits.length)]
      
        const IMG = await randomPuppy(random)
        const MemeEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(IMG)
        .setTitle(`Keresési szöveg: ${random} (KATT IDE!)`)
        .setURL(`https://www.reddit.com/r/${random}`)
      
        message.channel.send(MemeEmbed)
      }
                       ///////////////// ECONOMY //////////////////////////


if(!money[message.author.id]){
    money[message.author.id] = {
      money : 100,
      user_id: message.author.id
  
    };
  }
  fs.writeFile("./money.json", JSON.stringify(money), (err) => {
    if(err) console.log(err);
  });
  
  let selfmoney = money[message.author.id].money;
  
  if(cmd ===`${prefix}money`){
    let profilkep = message.author.displayAvatarURL();
  
  
  
    let moneyembed = new Discord.MessageEmbed()
    .setAuthor(message.author.username)
    .setColor("RANDOM")
    .addField("Egyenleged:", `${selfmoney}`)
    .setThumbnail(profilkep)
    .setFooter(botname)
  
    message.channel.send(moneyembed)
  }
  if(cmd === `${prefix}helpmoney`){
    message.channel.send("A bot beküldi, hogy mennyi pénzzel rendelkezel.")
  }
  if(cmd === `${prefix}freemoney`){
     message.channel.send("250 FT-ot kaptál!")
  
    money[message.author.id] = {
      money: selfmoney + 250
    }
  }
  if(cmd === `${prefix}helpfreemoney`){
    message.channel.send("Kapsz 250 FT-ot. Így legalább tudsz szerezni pénzt...")
  }
  
  if(message.guild){
    let drop_money = Math.floor(Math.random() *25 + 1)
    let random_money = Math.floor(Math.random()*900 + 1)
  
    if(drop_money === 12){
      let uzenetek = ["Kiraboltál egy embert.", "Találtál pénzt az utcán.", "A szerencse az oldaladon volt!"]
      let random_uzenet_szam = Math.floor(Math.random() * uzenetek.length)
  
      let dropMoneyEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.username)
      .setDescription(`${uzenetek[random_uzenet_szam]} Ezért kaptál: ${random_money}FT-ot`)
      .setColor("RANDOM")
      .setThumbnail(message.author.displayAvatarURL())
      .setFooter(botname)
  
      message.channel.send(dropMoneyEmbed);
  
      money[message.author.id] = {
        money: selfmoney + random_money,
        user_id: message.author.id
    
      }
      
  
    }
  }
  if(cmd === `${prefix}slot`){
    let min_money = 100;
    if(selfmoney < min_money) return message.reply(`Túl kevés pénzt adtál meg! Minimum: ${min_money} FT-ot fel kell tenni.`)
    
    let tét = Math.round(args[0] *100)/100
    if(isNaN(tét)) return message.reply("Kérlek adj meg egy összeget (PL.: 1000")
    if(tét > selfmoney) return message.reply("Az egyenlegednél több pénzt NEM rakhatsz fel!")
  
    let slots = ["🍌", "🍎", "🍍", "🥒", "🍇"]
    let result1 = Math.floor(Math.random() * slots.length)
    let result2 = Math.floor(Math.random() * slots.length)
    let result3 = Math.floor(Math.random() * slots.length)
  
    if(slots[result1] === slots[result2] && slots[result3]){
      let wEmbed = new Discord.MessageEmbed()
      .setTitle("🎉🎉🎉 Szerencsejáték 🎉🎉🎉")
      .addField(message.author.username, `Nyertél!:${tét*1.6}`)
      .addField("Eredmény:", slots[result1] + slots[result2] + slots[result3]) 
      .setColor("RANDOM")
      .setTimestamp(message.createdAt)
      .setFooter(botname)
      message.channel.send(wEmbed)
    
    money[message.author.id] = {
      money: selfmoney + tét*1.6,
      user_id: message.author.id
  
    }
    }else{
      let wEmbed = new Discord.MessageEmbed()
      .setTitle("🎉🎉🎉 Szerencsejáték 🎉🎉🎉")
      .addField(message.author.username, `Vesztettél! Ennyit buktál:${tét}`)
      .addField("Eredmény:", slots[result1] + slots[result2] + slots[result3]) 
      .setColor("RANDOM")
      .setTimestamp(message.createdAt)
      .setFooter(botname)
      message.channel.send(wEmbed)
    
    money[message.author.id] = {
      money: selfmoney - tét,
      user_id: message.author.id
  
    }
  }
  }
  if(cmd === `${prefix}helpslot`){
    message.channel.send(`Ez egy szerencsejákét! 18+ xd. Használat: ${prefix}slot <pénz>. **VIGYÁZAT! A SZERENCSEJÁZÉK FÜGGŐSÉGET IS OKOZHAT!**`)
  }
  if(cmd === `${prefix}moneylb`){
    let toplist = Object.entries(money)
    .map(V => `${V[1].money}FT <@${V[1].user_id}>`)
    .sort((a, b) => b.split("FT")[0] - a.split("FT")[0])
    .slice(0, 10)
  
    let LBEmbed = new Discord.MessageEmbed()
    .setTitle("☝Leaderboard☝")
    .setColor("RANDOM")
    .addField("Pénz toplista | TOP10", toplist, true)
    .setTimestamp(message.createdAt)
    .setFooter(botname)
  
    message.channel.send(LBEmbed)
  }
  
  if(cmd === `${prefix}helpmoneylb`){
    message.channel.send(`Helyes használat: ${prefix}moneylb. A bot beküld egy embedet, amiben a top 10 leggazdagabb embert teszi be, s azt is kiírja, hogymennyi pénzzel rendelkezik!`)
  }
  if(cmd === `${prefix}pay`){
    let pay_money = Math.round(args[0]*100)/100
    if(isNaN(pay_money)) return message.reply(`A parancs helyes használata: ${prefix}pay <összeg> <@név>`)
    if(pay_money > selfmoney) return message.reply("Az egyenlegednél több pénzt NEM adhatsz meg!")
  
    let pay_user = message.mentions.members.first();
  
    if(args[1] && pay_user){
      if(!money[pay_user.id]) {
        money[pay_user.id] = {
          money: 100,
          user_id: pay_user.id
        }
      }
  
      money[pay_user.id] = {
        money: money[pay_user.id].money + pay_money,
        user_id: pay_user.id
      }
      money[message.author.id] = {
        money: selfmoney - pay_money,
        user_id: message.author.id
      }
  
      let embed = new Discord.MessageEmbed()
      .setTitle(`Utalás folyamatban...`)
      .setDescription(`Sikeresen átutaltál <@${pay_user.id}> számlájára ${pay_money}FT-ot!`)
      .setColor("RANDOM")
      .setTimestamp(message.createdAt)
      .setFooter(botname)
  
      message.channel.send(embed)
  
      fs.writeFile("./money.json", JSON.stringify(money), (err) => {
        if(err) console.log(err);
      });
    } else {
      message.reply(`A parancs helyes használata: ${prefix}pay <összeg> <@név>`)
    }
  }
  if(cmd === `${prefix}helppay`){
    message.channel.send(`Helyes használat: ${prefix}pay <összeg> <név>. Átutalhatsz egy ásik embernek pénzt a saját számládról!`)
  }
                        ///////////////// ECONOMY /////////////////////
    
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


})



})
bot.login(tokenfile.token);