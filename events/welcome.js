const { MessageEmbed } = require ('discord.js')
const moment = require ('moment')
const ms = require ('ms')
module.exports = client => {
	
	
client.on('guildMemberAdd', async member => {
  if (member.guild.id == '795569524170031124') {
    const mem = await client.users.fetch(member.id);
    const server = client.guilds.cache.get('795569524170031124');

    const c = await client.channels.fetch('795569524631142402');
    const em = new MessageEmbed()
      .setAuthor(
        `A wild ${mem.username} has appeared!`,
        mem.avatarURL({ dynamic: true })
      )
      .addField(
        `> **${mem.tag}**'s Account Creation Date`,
        `${moment(mem.createdTimestamp).format('LLLL')} UTC | ${ms(
          (Date.now() - mem.createdTimestamp),{long: true})} `
      )
      .addField('> User ID', member.id)
      .addField(
        `> We Are Now ${server.memberCount} Members!`,
        'Please Kindly Read <#799816886610558977> Enjoy!'
      )
      .setImage(
        'https://media.discordapp.net/attachments/821258102703128634/825383218286559252/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f.gif'
      )
      .setColor('RANDOM')
      .setFooter(
        `Welcome to ${server.name}`,
        server.iconURL({ dynamic: true })
      );
    c.send(
      '<@&800017313092862022>— Please Give <@' + member + '> A Warm Welcome!',
      em
    );
  }
});

}