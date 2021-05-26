const Discord = require('discord.js');
const {fetchVacAvailability} = require('../fetchdata')
module.exports = {
	name: 'find',
    args:2,
    usage:'district <district code>',
    async execute(message) {
        let noOfAvaillableSessions = 0;
        const args = message.content.trim().split(/ +/g); 
        const sessions =await fetchVacAvailability(args[2])
        let nosessionsMsg=new Discord.MessageEmbed()
        .setTitle(`No Sessions Available`)
        .setColor('RED')
        .addField('No sessions availaible', "For the time being", false)
 if(!sessions.length)
 {
  
    message.channel.send(nosessionsMsg);
 }
 for (var session of sessions)
 {
     if(session.available_capacity!=0)
     {
        noOfAvaillableSessions++;
        let availableMsg = new Discord.MessageEmbed()
        .setTitle(session.name)
        .setColor('RED')
        .addField('Hospital Name', session.name, false)
        .addField('Fees', session.fee, false)
        .addField('Fees Type', session.fee_type, false)
        .addField('Vaccine Name', session.vaccine, false)
        .addField('Available Capacity', session.available_capacity, false)
        message.channel.send(availableMsg)
     }

 } 
 if(noOfAvaillableSessions>0)
 {    
    let regMsg=new Discord.MessageEmbed()
    .addFields('Vaccine Availaible!,register at','https://www.cowin.gov.in/home')
    message.channel.send(regMsg)
 }
 else{ 
    message.channel.send(nosessionsMsg);
 }
},
};