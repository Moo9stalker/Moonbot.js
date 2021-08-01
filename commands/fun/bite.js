const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB_SRV);
const fetch = require('node-fetch');

module.exports = class bite extends Command {
	constructor(client) {
		super(client, {
			name: 'bite',
			group: 'fun',
			memberName: 'bite',
			description: 'bite someone',
      argsPromptLimit: 1,
      argsType: 'multiple',
      args: [
				{
					key: 'user',
					prompt: 'Whom do you wanna bite?',
					type: 'user'},
			],
     
		});
  }
	
 async run(message, { user }) {

   const link =  await fetch('https://purrbot.site/api/img/sfw/bite/gif').then(res => res.json())

  let biten;
  let num;

  if(await db.get(`bite_${message.author.id}_${user.id}`)){
    biten = await db.get(`bite_${message.author.id}_${user.id}`) + ` times <3`;

    num = 1

  } else { biten = `1st time <3`;
  num = 2 }
      

   

    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`<:dt_arrowpink:864185398581133332> **${message.author.username}** *bites* ‎\u200B **${user.username}**`)
        .setImage(link.link).setFooter(`${message.author.username} has bitten ${user.username} ${biten}`,
          message.author.avatarURL({ dynamic: true }));

   message.channel.send(embed)

   await db.add(`bite_${message.author.id}_${user.id}`, num)


  }
};