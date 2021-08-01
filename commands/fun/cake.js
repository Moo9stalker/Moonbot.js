const { Command } = require('discord.js-commando');


module.exports = class Cake extends Command {
	constructor(client) {
		super(client, {
			name: 'cake',
			group: 'fun',
			memberName: 'cake',
			description: 'send a yummy cake to someone',
      args: [
				{
					key: 'arg',
					prompt: 'Whom do you wanna send a cake?',
					type: 'string',
        
				},
			],
     
		});
	}

run(message, { arg }) {

      message.lineReply(
        message.author.username.toString() +
        ' has given ' +
        arg.toString() +
        ' a cake! :cake:',
       { allowedMentions: { parse: ['users'] } });
  
  	}
};