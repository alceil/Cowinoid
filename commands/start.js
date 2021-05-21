module.exports = {
	name: 'start',
	description: 'Start test',
	eligible: 1,
	execute(message) {
		message.channel.send('Boop.');
	},
};