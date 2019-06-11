const request = require('request');

const slackUrl = process.env.SLACK_URL;
const server = process.argv.slice(2);
const interval = 5000;

const statsUrl = 'https://api.mcsrvstat.us/2/';

let no_players_seen = 0;

function sendNotification(text, blocks) {

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

function sendOfflineNotification(body) {
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

  sendNotification(`${body.motd.clean} - Everyone has gone home`, blocks);
}

function sendOnlineNotification(body) {

  let blocks = [];
  blocks.push(
    {
      type: "section",
      text:
        {
          type: "mrkdwn",
          text: `*${body.motd.clean}* - The following players are now online:`
        }
    }
  );

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

  sendNotification(`${body.motd.clean} - ${body.players.list.length} player(s) now online.`, blocks);
}

function execute() {
  request(`${statsUrl}${server}`, {json: true}, (err, res, body) => {
    if (err) {
      return console.log(err);
    }

    if (body.online === false) {
      console.log('server not read as online');
      return;
    }

    if (body.players.online > 0 && (body.players.list.length !== no_players_seen)) {
      no_players_seen = body.players.list.length;
      console.log('Number of players changed... sending notification');
      sendOnlineNotification(body);
    } else {
      if (body.players.online === 0 && no_players_seen > 0) {
        console.log('No players online... sending notification');
        sendOfflineNotification(body);
        no_players_seen = 0
      }
    }
  });
}

if(slackUrl === undefined || server.toString() === '') {

  console.log("Usage: SLACK_URL=https://hooks.slack.com/services/xxxxxx/xxxxx npm start minecraft.server.name:25565");
  console.log();
  process.exit(0);

} else {

  console.log("Starting service with the following parameters");
  console.log(`SLACK_URL=${slackUrl}`);
  console.log(`SERVER=${server}`);
  setInterval(execute, interval);

}
