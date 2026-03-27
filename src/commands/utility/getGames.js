const { SlashCommandBuilder } = require('discord.js');
const { getTodaysGames } = require('../../util/getTodaysGames.js');
const { getTeamInfoFromGameId } = require('../../util/getTeamInfo.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getgames')
		.setDescription('Get Todays Games'),
	async execute(interaction) {
		let gameIdToTimeMap = await getTodaysGames();
		if(gameIdToTimeMap.size === 0 || gameIdToTimeMap === undefined){
			interaction.reply('There are no games scheduled today!');
		}else{
			let reply = 'Todays Games\n'
			for (const [gameId, startTime] of gameIdToTimeMap) {
				let teamInfoObj = await getTeamInfoFromGameId(gameId);
				reply += `(Game ${gameId}) | ${teamInfoObj.away_team_name} @${teamInfoObj.home_team_name}, Starting at ${startTime}\n`;
			}
			
			interaction.reply(reply);
		}
	},
};
