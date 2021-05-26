const Discord = require('discord.js');
module.exports = {
	name: 'dist',
	execute(message) {
        let districtList = new Discord.MessageEmbed()
        .setTitle(`Kerala Districts List with District code`)
        .setColor('BLUE')
        .addField('Districts', "301: Alappuzha\n307: Ernakulam\n306: Idukki\n297: Kannur\n295: Kasaragod\n298: Kollam\n304: Kottayam\n305: Kozhikode\n302: Malappuram\n308: Palakkad\n300: Pathanamthitta\n296: Thiruvananthapuram\n303: Thrissur\n299: Wayanad", false)
		message.channel.send(districtList);
	},
};