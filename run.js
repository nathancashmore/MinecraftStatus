const moment = require('moment');

const onlineChecker = require('./onlineChecker');

const slackUrl = process.env.SLACK_URL;
const server = process.env.SERVER;
const interval = process.env.INTERVAL || 10;
const timeout = process.env.TIMEOUT || 0;

function execute() {

  if (slackUrl === undefined || server === undefined ) {
    console.log("Usage: SLACK_URL=https://hooks.slack.com/services/xxxxxx/xxxxx SERVER=minecraft.server.name:25565 npm start");
    process.exit(9);

  } else {
    console.log(`${moment().format()} - Running with the following parameters`);
    console.log(`SLACK_URL=${slackUrl}`);
    console.log(`SERVER=${server}`);
    console.log(`INTERVAL=${interval}`);

    let timerId = setInterval(onlineChecker.updateStatus, interval * 1000, slackUrl, server );
    if(timeout) {
      setTimeout(() => { clearInterval(timerId); }, timeout * 1000);
    }
  }
}

execute();
