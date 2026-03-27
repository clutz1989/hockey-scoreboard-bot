const { SlashCommandBuilder } = require('discord.js');
const { scheduleGame } = require('../..//util/scheduleGame.js');

const statusToReplyMap = new Map([
  ['success', 'Succesfully Subscribed to Game!'],
  ['empty', 'There are no games scheduled today!'],
  ['invalid', 'Provided Game Id is invalid!'],
  ['error', 'There was a problem scheduling game!'],
]);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('subtogame')
		.setDescription('Follow a Game')
		.addStringOption(option =>
		option.setName('gameid')
			.setDescription('Id of Game to Subscribe too')
			.setRequired(true)),
	async execute(interaction) {
		let gameId = await interaction.options.getString('gameid');
		let scheduleStatus = await scheduleGame(gameId);
		
		await interaction.reply(statusToReplyMap.get(scheduleStatus));
	},
};