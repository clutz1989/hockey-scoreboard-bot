const http = require('http');
const dotenv = require('dotenv');
dotenv.config();

async function getTeamInfoFromGameId(gameId){
    return new Promise((resolve, reject) => {
        if (!process.env.TTS_TEAM_URL) {
            return reject(new Error('Missing TTS_URL in env'));
        }

        try{
            fetch(process.env.TTS_TEAM_URL + gameId)
            .then(res => {
                //console.log(res.json())
                resolve(res.json());
            });

        }catch(err){
            reject(err);
        }
    });
}

module.exports = {
    getTeamInfoFromGameId
};