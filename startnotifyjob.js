  
const Discord = require('discord.js');
const {getSubbedUsers} = require('./crud')
const {fetchVacAvailability} = require('./fetchdata')

async function startNotifyJob(client) {
const subbedUsers = await getSubbedUsers();
console.log(subbedUsers)
for(var sub of subbedUsers)
{
var authorid;    
authorid=sub.authorid
let noOfAvaillableSessions=0;
let nosessionsMsg=new Discord.MessageEmbed()
    .setTitle(`No Sessions Available`)
    .setColor('RED')
    .addField('No sessions availaible', "For the time being", false)
 const sessions = await fetchVacAvailability(sub.distcode);
 if(!sessions.length)
 {
    client.users.cache.get(sub.authorid).send(nosessionsMsg);
 }
 let age = getAge(parseInt(sub.age));
 const filteredSessions = sessions.filter(session=>session.min_age_limit===age);
 for (var session of filteredSessions)
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
        //client.users.cache.get(sub.authorid).send(availableMsg);
        console.log(authorid)
     }
 } 
 if(noOfAvaillableSessions>0)
 {
    let regMsg=new Discord.MessageEmbed()
    .addFields('Vaccine Availaible!,register at','https://www.cowin.gov.in/home')
    client.users.cache.get(sub.authorid).send(regMsg)
 }
 else{
    client.users.cache.get(sub.authorid).send(nosessionsMsg);
 }
}
} 
function getAge(age)
{
    if(age>=18)
    {
        return 18;
    } else if(age>=45){
        return 45
    }
}

module.exports={
    startNotifyJob
}
