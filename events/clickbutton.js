const { MessageEmbed } = require('discord.js');
module.exports = client => {

client.on('clickButton', async button => {
  if (button.id === 'testrole') {
    console.log('button clicked');
    let role = button.guild.roles.cache.get('860940382799659078');
    button.clicker.member.roles.add(role).catch(console.error);
  }
});
}