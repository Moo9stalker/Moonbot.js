const {Command} = require('discord.js-commando');

 

module.exports = class pat extends Command {
	constructor(client) {
		super(client, {
			name: 'test',
			group: 'fun',
			memberName: 'test',
			description: 'test',
      argsPromptLimit: 1,
      argsType: 'multiple',
      argsCount: 2,
      format: 'adsadadad asdadad',
      args: [
				{
					key: 'arg',
					prompt: 'test',
					type: 'user',
        
     
          error: 'hmm??',
    
     
				},
        	{
					key: 'arg2',
					prompt: 'test',
					type: 'string',
        
     
          error: 'hmm??',
    
        default: ''
				}
			]
     
		});
  }
	

run(message, { arg , arg2}) {

 
  message.channel.send(arg.username + ' says ' + arg2)
  
 



  




  	}
};