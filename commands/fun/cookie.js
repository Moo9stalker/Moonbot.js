const { Command } = require('discord.js-commando');


module.exports = class cookie extends Command {
	constructor(client) {
		super(client, {
			name: 'cookie',
			group: 'fun',
			memberName: 'cookie',
			description: 'send a yummy cookie to someone',
      args: [
				{
					key: 'arg',
					prompt: 'Whom do you wanna send a cookie?',
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
        ' a cookie! :cookie:',
       { allowedMentions: { parse: ['users'] } });
  
  	}
};