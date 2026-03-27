const { getTodaysGames } = require('./getTodaysGames.js');
const { startGameEventLoop } = require('./gameEventLoop.js');

const timeRegEx = new RegExp(/^(1[0-2]|0?[1-9]):([0-5][0-9]) (AM|PM)$/);

let gameId;

async function scheduleGame(gameId){
    this.gameId = gameId;

    try {
        let res = await calcTimeTilGame();
        if(res.get(this.gameId) <= 0){
                startGameEventLoop(this.gameId);
        }else{
            setTimeout(() => {
                startGameEventLoop(this.gameId);
            }, res.get(this.gameId));
        }

        
        return 'success';
    }catch(err){
        console.error(`There was a problem scheduling Game Id: ${this.gameId} \n\nError Message:\n${err}`);
        return err;
    }
}

async function calcTimeTilGame(){
    return await getTodaysGames()
    .then( (gameIdToTimeMap) => {
        return new Promise((resolve, reject) => {
            if(gameIdToTimeMap === undefined || gameIdToTimeMap.size === 0){
                return reject('empty');
            }

            if(!gameIdToTimeMap.has(this.gameId)){
                return reject('invalid');
            }

            let gameIdToMSMap = new Map();
            let gameStartTime = gameIdToTimeMap.get(this.gameId);
            let gameStartTimeArray = gameStartTime.match(timeRegEx);

            let gameTime = {
                hour12HR: parseInt(gameStartTimeArray[1]),
                minutes: parseInt(gameStartTimeArray[2]),
                amPM: gameStartTimeArray[3]
            }

            let now = new Date();
            let msTilGame = new Date(now.getFullYear(), now.getMonth(), now.getDate(), (gameTime.hour12HR + parseInt(gameTime.amPM == 'PM' ? 12 : 0)),gameTime.minutes - 1, 0, 0) - now;

            gameIdToMSMap.set(this.gameId, msTilGame);

            resolve(gameIdToMSMap);  
        })
    });
}

module.exports = {
    scheduleGame
}