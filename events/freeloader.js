const pretty = require ('pretty-ms')
module.exports = (client,db) => {
	
client.on("message", async (message) => {

  if (message.guild.id == "795569524170031124") {
    const check = await db.get('set')

  if (message.content.toLowerCase() == "ecf start") {
      const perm = message.member.hasPermission("ADMINISTRATOR")

      if (!perm) {
      return  message.lineReply("⚠️ You don't have permission")
      } else {
        if (check == "enable") {
        return message.lineReply("🌸 The process is on already, Run `ecf stop` to stop it.")
        }
        else if (check != "enable") {
          await db.set('set', `enable`);
         return message.lineReply("🌸 Started Gathering Information about people who joins this Heist. Run `ecf stop` to stop it")

        }
      }
    } else if (message.content.toLowerCase() == "ecf stop") {
      const perm = message.member.hasPermission("ADMINISTRATOR")

      if (!perm) {
       return message.lineReply("⚠️ You don't have permission")
      } else {
        if (check == "disable") { 
        	return message.lineReply("🌸 That command is off already. Run `ecf start` to start the process.") 
        	
        } else if (check != "disable") {
          await db.set('set', `disable`);
          return message.lineReply("🌸 Stopped Gathering Information about people who joins this Heist.")
        }
      }
    
} else if (message.content.toLowerCase() == "ecf reset") {
      const perm = message.member.hasPermission("ADMINISTRATOR")

      if (!perm) {
       return message.lineReply("⚠️ You don't have permission")
      } else {
      	await db.delete('var')
      	await db.delete('var2')
      	return message.lineReply("🌸 Done! Reset the list.")
      }
      
    
} else if (message.content.toLowerCase() == "ecf list") {
	
	   const perm = message.member.hasPermission("ADMINISTRATOR")

      if (!perm) {
        return message.lineReply("⚠️ You don't have permission")
      } else {
      	

 const array = await db.get('var2')

if(!array) {
return 	message.lineReply("⚠️ No Freeloaders Found")
	
} else { 
	const me = []
let index = 0;
for(const stuff of array) {

const process = await client.users.fetch(stuff).then(d=>
me.push("#"+(index=index+1)+" ⬇️"+ "\n [user]: "+d.tag+ ",\n[id]: " + d.id+ ",\n [created]: " + pretty((Date.now()-d.createdTimestamp)))
)
}
message.channel.send("⚠️ FREELOADERS LIST\n"+"SIZE: "+me.length+"\n\n"+ me.join('\n\n'), {split:{char:"\n"},code:'fix'})
      	
}    	
 
 
      }
      
	
	
} else if (message.channel.id == "808264446094213150") {


      if (message.content.toLowerCase().startsWith("join heist")) {
      	
       if (check == "enable") {
        
        const dr = await db.get('var')
        const d = !dr? ['test'] : dr
        if(d.join('@').includes(!message.member? " ": message.member.user.id)== false) { 
          message.react("⚠️")
          await db.push('var', `${message.author.id}`);
        }
        
        }
      }
      
    // second if
   }  
    // first if
  }
})

	
}