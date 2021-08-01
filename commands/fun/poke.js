const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB_SRV);
const fetch = require('node-fetch');

module.exports = class poke extends Command {
	constructor(client) {
		super(client, {
			name: 'poke',
			group: 'fun',
			memberName: 'poke',
			description: 'poke someone',
      args: [
				{
					key: 'arg',
					prompt: 'Whom do you wanna poke?',
					type: 'user'},
			],
     
		});
  }
	
 async run(message, { arg }) {

   const link =  await fetch('https://nekos.life/api/v2/img/poke').then(res => res.json())

  let poken;
  let num;

  if(await db.get(`poke_${message.author.id}_${arg.id}`)){
    poken = await db.get(`poke_${message.author.id}_${arg.id}`) + ` times <3`;

    num = 1

  } else { poken = `1st time <3`;
  num = 2 }
      

   

    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`<:dt_arrowpink:864185398581133332> **${message.author.username}** *pokes* ‎\u200B **${arg.username}**`)
        .setImage(link.url).setFooter(`${message.author.username} has poked ${arg.username} ${poken}`,
          message.author.avatarURL({ dynamic: true }));

   message.channel.send(embed)

   await db.add(`poke_${message.author.id}_${arg.id}`, num)


  }
};