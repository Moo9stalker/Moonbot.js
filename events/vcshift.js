

module.exports = (client, db) => {


client.on('voiceStateUpdate', async (oldMember, newMember) => {
let m = client.guilds.cache.get('795569524170031124');
  
       let user = await m.members.fetch(newMember.id);

       let owner = await m.members.fetch('754296226903490571');
       
       let lockcid = await db.get(`vlock_${newMember.guild.id}`)

       let allow;
    

       let chanl = await client.channels.fetch(lockcid)
       ;
       const chan = client.channels.cache.get('799843071298764840');

       if(newMember.channelID == chanl && newMember.id !== '754296226903490571' && newMember.id !== '235148962103951360'){

       await user.voice.setChannel(chan).catch((error) => {
     console.error(error);
      });
      
       owner.send("Unwhitelisted member: `"+ user.id + "` attempted to join your VC: <#"+ chanl + ">\nI Shifted the member to : <#" + chan.id + ">")
       }
       
    });
}