const request = require('request');
const moment = require('moment');

const statsUrl = 'https://api.mcsrvstat.us/2/';

let no_players_seen = 0;

function sendNotification(text, blocks, slackUrl) {

  const options = {
    method: 'POST',
    uri: slackUrl,
    body: {
      text: text,
      blocks: blocks
    },
    json: true
  };

  request.post(options, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
  });
}

function sendOfflineNotification(body, slackUrl) {
  let blocks = [];
  blocks.push(
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${body.motd.clean}* - Everyone has gone home.`
      }
    }
  );

  sendNotification(`${body.motd.clean} - Everyone has gone home`, blocks, slackUrl);
}

function sendOnlineNotification(body, slackUrl) {

  let blocks = [];
  blocks.push(
    {
      type: "section",
      text:
        {
          type: "mrkdwn",
          text: `*${body.motd.clean}* - Their is now ${body.players.online} player(s) online`
        }
    }
  );

  if (body.players.list) {
    body.players.list.forEach(player => {
      let playerBlock =
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*${player}*`
          },
          "accessory": {
            "type": "image",
            "image_url": `https://minotar.net/helm/${player}/64.png`,
            "alt_text": `${player}`
          }
        };

      blocks.push({
        "type": "divider"
      });

      blocks.push(playerBlock);

    });
  }

  sendNotification(`${body.motd.clean} - ${body.players.online} player(s) now online.`, blocks, slackUrl);
}

async function updateStatus(slackUrl, server) {

  console.log(`${moment().format()} - Obtain status update for ${server}`)
  return request(`${statsUrl}${server}`, {json: true}, (err, res, body) => {
    if (err) {
      return console.log(err);
    }

    if(res.statusCode !== 200) {
      return console.log(`Problem when calling < ${statsUrl}${server} > : ${res.body}`)
    }

    if (body.online === false) {
      console.log('server not read as online');
      return;
    }

    if (body.players.online > 0 && body.players.online !== no_players_seen) {
      no_players_seen = body.players.online;
      console.log('Number of players changed... sending notification');
      sendOnlineNotification(body, slackUrl);
    } else {
      if (body.players.online === 0 && no_players_seen > 0) {
        console.log('No players online... sending notification');
        sendOfflineNotification(body, slackUrl);
        no_players_seen = 0
      }
    }
  });
}

module.exports = { updateStatus };
