const dotenv = require('dotenv');
dotenv.config();

class GameEvent {
    constructor(time_in_period, period, team, type, text ) {
        this.time_in_period = time_in_period;
        this.period = period;
        this.team = team;
        this.type = type;
        this.text = text
    }
}

//Avalible Events: Goal, Penalty, Save, Goalie Change
const WATCHED_EVENTS = ['Goal', 'Penalty'];
let eventCount;

async function getGameEvents(gameId, eventCount){  
    this.eventCount = eventCount;

    const res = await fetch(process.env.TTS_GAME_URL + gameId)
    .then(res => {
        return res.json();
    });

    return parseNewEvents(res);
}

function parseNewEvents(res){

    let eventDelta = res.events.length - this.eventCount;

    if(eventDelta === 0){
        console.log('No New Events');
        return;
    }
    console.log('New events | Delta = ', eventDelta);

    let eventsToPublish = [];

    res.events.forEach((event, index) => {
        //Test >= change to fix duplicate events
        if(!WATCHED_EVENTS.includes(event.type) || index >= eventDelta){
            return;
        }

        eventsToPublish.push(
            new GameEvent(
                event.time_in_period, 
                event.period, 
                event.team, 
                event.type,
                replaceNbsps(event.text)
            )
        );
    });
    
    this.eventCount = res.events.length;

    return eventsToPublish;
}

function getEventCount(){
    return this.eventCount
}

function replaceNbsps(eventText) {
  var nbspRegex = new RegExp(String.fromCharCode(160), "g");
  return eventText.replace(nbspRegex, ' ');
}

module.exports = {
  getGameEvents,
  getEventCount
};

//Example Goal Response from Postman
/*
"time_in_period": "12:11 ",
"period": 2,
"team": " Black Aces",
"type": "Goal",
"text": " Black Aces  Goal (Mitchell Quatrale,#1,Jean-Francois Cliche)",
"goal": "487",
"ass1": "40",
"ass2": "754",
"player_id": "815"
*/
