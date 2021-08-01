const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Scraper = require('mal-scraper');

module.exports = class anime extends Command {
	constructor(client) {
		super(client, {
			name: 'anime',
			group: 'fun',
			memberName: 'anime',
			description: 'Get info about an anime!',
      args: [
				{
					key: 'arg',
					prompt: 'Which anime you want to get info about? <a:AAE_What:845752862376984606>',
					type: 'string',
        
				},
			],
     
		});
	}

async run(message, { arg }) {

        let Text = arg

        if (Text.length > 200) return message.channel.send(`Text Limit - 200`);

        let Msg = await message.channel.send(`**Searching It For You ...**`);

        let Replaced = Text.replace(/ /g, " ");

        

        let Anime;

        let Embed;

        try {

            Anime = await Scraper.getInfoFromName(Replaced);

            if (!Anime.genres[0] || Anime.genres[0] === null) Anime.genres[0] = "None";

            Embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setURL(Anime.url)
                .setTitle(Anime.title)
                .setDescription(Anime.synopsis)
                .addField(`Type`, Anime.type, true)
                .addField(`Status`, Anime.status, true)
                .addField(`Premiered`, Anime.premiered, true)
                .addField(`Episodes`, Anime.episodes, true)
                .addField(`Duration`, Anime.duration, true)
                .addField(`Popularity`, Anime.popularity, true)
                .addField(`Genres`, Anime.genres.join(", "))
                .setThumbnail(Anime.picture)
                .setFooter(`Score - ${Anime.score}`)
                .setTimestamp();

        } catch (error) {
            console.log(error)
            return Msg.edit(`**NO matches Found!**`)

        };

        await Msg.delete();
        return message.channel.send(Embed);
    
}
   
  	
};