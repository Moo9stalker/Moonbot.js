const { Command } = require('discord.js-commando');

const { Database } = require('quickmongo');
const db = new Database(process.env.MONGODB_SRV);

module.exports = class vlock extends Command {
	constructor(client) {
		super(client, {
			name: 'vlock',
			group: "fun",
      aliases: ['vl'],
			memberName: 'vlock',
      argsPromptLimit: 0,
      argsType: 'multiple',
			description: 'Locks ur current VC',
      args: [
				{
					key: 'channel',
					prompt: 'Whom do you wanna auto-delete?',
					type: 'channel',
          default: '',
        
				},
			],
     
		});
	}

  


async run(message, { channel }) {

  let prefix = message.guild.commandPrefix

    if(message.author.id != '754296226903490571'){
      return message.lineReply(
        `You don't have permission to use this command.`
      );
    }

    if (!channel) {
      return message.lineReply(`Please specify the user whose messages I should delete.\n>Usage example: \`${prefix}vlock <channel>\` or \`${prefix}vlock off\``);
    }



      
      await db.set(`vlock_${message.guild.id}`, channel.id);

      message.react('<:ec_check:871010259228065803>');
    

    
 	}
};