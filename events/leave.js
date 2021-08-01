const pretty = require ('pretty-ms')
const { MessageEmbed } = require ('discord.js')
module.exports = (client, db) => {
	
client.on('guildMemberRemove', async member => {
  if (member.guild.id == '795569524170031124') {
const dr = await db.get('var')
        const d = !dr? ['test'] : dr
  
if(d.join('@').includes(!member? " ": member.user.id)==false) {

    const mem = await client.users.fetch(member.id);

    const c = await client.channels.fetch('795569524631142402');

    const em = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(
        `${mem.tag} has Left us! they've been here for ${pretty(
          Date.now() - member.joinedTimestamp,
          { verbose: true, compact: true }
        )}`,
        mem.avatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setFooter(
        '#Freeloader Spotted',
        'https://cdn.discordapp.com/icons/795569524170031124/a_113c467109d001bdaaf3bc82c84b24bb.gif?size=256'
      );

    c.send(mem.id, em);
} else if(d.join('@').includes(!member? " ": member.user.id)) {
await db.push('var2', member.user.id)
    const mem = await client.users.fetch(member.id);

    const c = await client.channels.fetch('795569524631142402');

    const em = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(
        `⚠️ ${mem.tag} has left us after saying JOIN HEIST in #mega-heists❗ they've been here for ${pretty(
          Date.now() - member.joinedTimestamp,
          { verbose: true, compact: true }
        )}`,
        mem.avatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setFooter(
        '#Freeloader',
        'https://cdn.discordapp.com/icons/795569524170031124/a_113c467109d001bdaaf3bc82c84b24bb.gif?size=256'
      );

    c.send(mem.id, em);

}
  }
});
	
}