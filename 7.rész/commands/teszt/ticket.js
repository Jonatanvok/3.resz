const { MessageEmbed } = require('discord.js')


module.exports = {
	name: 'ticket',
	category: 'Ticket',
	description: 'Creates a new ticket.',
	aliases: ['new'],
	usage: 'new',
	userperms: [],
	botperms: [],
	run: async (client, message, args, prefix) => {
		let xd = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Red_x.svg/1200px-Red_x.svg.png"
		let botname = "KnightMan"
		const cembed = new MessageEmbed()
		.setAuthor('HIBA!')
		.setDescription('**HIBA OKA:**\n`Már van tickete!`\n\n**HIBA MEGOLDÁSA:**\n`Zárja le a meglévő ticketet, mielőtt újat nyitna!`\n\n**EGYÉB:**\n   ---')
		.setFooter(botname)
		.setThumbnail(xd)
		if(message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) {
			return message.reply(cembed);
		}
		message.guild.channels.create(`Ticket-${message.author.id}`, {
			permissionOverwrites: [
				{
					id: message.author.id,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
				{
					id: message.guild.roles.everyone,
					deny: ['VIEW_CHANNEL'],
				},
			],
			type: 'text',
			// parent: 'category id',
		}).then(async channel => {
			message.reply(`Sikeresen létrehozott jegyet! Kérjük, kattintson a ${channel} gombra a jegy megtekintéséhez.`);
			channel.send(`Kedves ${message.author}! Üdvözöljük jegyében! Kérjük, legyen türelemmel, hamarosan veled leszünk. Ha le szeretné zárni ezt a jegyet, futtassa a &close  parancsot`);
			let logchannel = message.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
			if(logchannel) {
				logchannel.send(`${message.author.id} jegy létrehozva. Kattintson a következőkre a <#${channel.id}> megnyitásához`);
			}
		});
	},
};