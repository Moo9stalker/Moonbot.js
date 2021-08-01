const { Command } = require('discord.js-commando');


module.exports = class Candy extends Command {
	constructor(client) {
		super(client, {
			name: 'candy',
			group: 'fun',
			memberName: 'candy',
			description: 'send a yummy candy to someone',
      args: [
				{
					key: 'arg',
					prompt: 'Whom do you wanna send a candy?',
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
        ' a Candy! :candy:',
       { allowedMentions: { parse: ['users'] } });
  
  	}
};