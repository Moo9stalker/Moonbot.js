const {Command} = require('discord.js-commando');

 

module.exports = class pressf extends Command {
	constructor(client) {
		super(client, {
			name: 'pressf',
			group: 'fun',
			memberName: 'pressf',
			description: 'pay respect!',
      

     
		});
  }
	

run(message, { arg }) {

  


  message.channel.send(`**${message.author.username}** has paid their respect! <:dv_wPurpleHeartOwO:869873891777060914>`)




  	}
};