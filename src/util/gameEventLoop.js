const dotenv = require('dotenv');
const { getGameEvents, getEventCount } = require('./gameEvent.js');
const { client } = require('../index');

dotenv.config();

const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);

//TODO: Check for overtime naming
const periodToText = new Map([
  [1, 'first'],
  [2, 'second'],
  [3, 'third']
]);


let eventCount = 0;

function startGameEventLoop(gameId){
    channel.send(`Game ${gameId} is Starting!`);
    
    checkForUpdates(gameId);

    setInterval(() => {
        checkForUpdates(gameId);
    }, 60 * 1000);

    //channel.send(`Game ${gameId} has Ended!`);
}

async function checkForUpdates(gameId){
	console.log('Checking for Game updates');

	const events = await getGameEvents(gameId, eventCount);
    let message = ''
	if(events != undefined){
		eventCount = getEventCount();

        events.forEach((event) =>{
            //TODO: Edge-Case
            //Events get sent before players are assigned
            //causing duplicate events to be sent
            //if unassigned event is sent first
            message += `${event.text} at ${event.time_in_period} in the ${periodToText.get(event.period)} period\n`;
        })
	}

    if(message != ''){
        await channel.send(message);
    }
}

module.exports = {
    startGameEventLoop
};