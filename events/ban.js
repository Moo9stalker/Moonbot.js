const { MessageEmbed } = require('discord.js');
module.exports = client => {
	client.on('guildBanAdd', async (guild, user) => {
		if (guild.id == '795569524170031124') {
			const bans = await guild.fetchBans();
			const mem = await client.users.fetch(user.id);
			const c = await client.channels.fetch('795569524631142402');
const em = new MessageEmbed()
		.setAuthor(`${mem.username} has been banned!`, 		mem.avatarURL({ dynamic: true })
				)
	
.setDescription(`**Carl**: Who Cares?\n\n**Crypted**: No One Cares!\n\n**Moon**: I Guess Capt'n Cares...\n\n**Capt'n**: <a:DM_KekLeave:811983528564097124>`)
			
		.setTimestamp()
				.setColor('#FF0000');
			c.send(mem.id, em);
		}
	});
};
