const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const gameIdRegEx = new RegExp(/(?<=\bgames\s*\+=\s*")\d+(?=";)/g);

let gameIdToTimeMap;

async function getTodaysGames(){
    return new Promise((resolve, reject) => {
        if (!process.env.TTS_URL) {
            return reject(new Error('Missing TTS_URL in env'));
        }

        http.get(process.env.TTS_URL, (res) => {
            data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try{
                    let gameList = data.match(gameIdRegEx) || [];
                    
                    gameIdToTimeMap = new Map();

                    gameList.forEach((gameId) => {
                        const regex = new RegExp(`id=if_${gameId}_${gameId}_clock>([^<]+)(?=</)`);
                        let gameStartTime = data.match(regex)[1];

                        console.log('Game ' + gameId + ' Starting at ' + gameStartTime);
                        gameIdToTimeMap.set(gameId, gameStartTime);
                    });
                    
                    resolve(gameIdToTimeMap);
                }catch(err){
                    reject(err);
                }
            });
        }).on('error', (err) => {
            console.error('Error:', err.message);
        });    
    });
}

module.exports = {
    getTodaysGames
};
