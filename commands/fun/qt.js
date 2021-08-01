const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class qt extends Command {
	constructor(client) {
		super(client, {
			name: 'qt',
			group: 'fun',
			memberName: 'qt',
			description: 'Replies with qt Rate',
			args: [
				{
					key: 'user',
					prompt: 'Whose Qt Rate you wanna determine?',
					type: 'user',
				},
			],
		});
	}

	run(message, { user }) { 
    

    let rng;
    
     if(user.id == `530201257164668944`){
      rng = '100'
   } else {
    rng = Math.floor(Math.random() * 101);

    }

    const qembed = new Discord.MessageEmbed()
      .setTitle(`QtRate Calculator`)
      .setDescription(`${user.username} is ` + rng + '% Qt <a:TDT_Meong_Cute:870649119369216030>')
      .setColor('ec80b1');

    message.channel.send(qembed);
  

	}
}