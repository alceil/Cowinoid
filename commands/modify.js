const Discord = require('discord.js');
const client = new Discord.Client();
const {modifyAge,modifyDist} = require('../crud')
module.exports = {
	name: 'modify',
    args:2,
    usage:'age <age>',
	execute(message) {
        const {author} = message
        const args = message.content.trim().split(/ +/g); 
        console.log(client.users.cache)
        if(args[1]==='age')
        {
            modifyAge(author.id,args[2]);
            let age = args[2]
            let modifiedAge = new Discord.MessageEmbed()
            .setTitle(`${author.username} Age Updated`)
            .setColor('ORANGE')
            .addField('Age', `${age}`, false)
            message.channel.send(modifiedAge);
        }else if(args[1]==='district'){
            modifyDist(author.id,args[2]);
            let distcode = args[2]
            let modifiedDist = new Discord.MessageEmbed()
            .setTitle(`${author.username} district Updated`)
            .setColor('ORANGE')
            .addField('District Code', `${distcode}`, false)
            message.channel.send(modifiedDist);
        }
	},
};