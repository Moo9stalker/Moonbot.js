const { MessageEmbed } = require('discord.js');
module.exports = client => {
	client.on('guildBanRemove', async (guild, user) => {
		if (guild.id == '795569524170031124') {
			const bans = await guild.fetchBans();
			const mem = await client.users.fetch(user.id);
			const c = await client.channels.fetch('799811022301954099');

			const em = new MessageEmbed()
				.setAuthor('User Unbanned')
				.setDescription(`**${mem.tag}** has been unbanned from this server. `)
				.setFooter(`id: ${mem.id}`,)
				.setThumbnail(
					mem.avatarURL({ dynamic: true })
				)
				.setTimestamp()
				.setColor('RANDOM');
			c.send(em);
		}
	});
};
