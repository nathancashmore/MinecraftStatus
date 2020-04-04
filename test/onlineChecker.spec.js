const Replay = require('replay');

const onlineChecker = require('../onlineChecker');

const SLACK_URL = "https://hooks.slack.com/services/xxx/xxx/xxx";
const VANILLA_WITH_NO_PLAYERS = "vanilla.with.no.players.co.uk";
const VANILLA_WITH_ONE_PLAYER = "vanilla.with.one.player.co.uk";
const BUNGEE_WITH_NO_PLAYERS = "bungee.with.no.players.co.uk";
const BUNGEE_WITH_ONE_PLAYER = "bungee.with.one.player.co.uk";

describe('onlineChecker', function() {

    describe('updateStatus', async function() {

        it('should send message for vanilla server with one player', async () => {
            await onlineChecker.updateStatus(SLACK_URL, VANILLA_WITH_ONE_PLAYER)
        });

        it('should send message for vanilla server with no players', async () => {
            await onlineChecker.updateStatus(SLACK_URL, VANILLA_WITH_NO_PLAYERS)
        });

        it('should send message for bungee server with one player', async () => {
            await onlineChecker.updateStatus(SLACK_URL, BUNGEE_WITH_ONE_PLAYER)
        });

        it('should send message for bungee server with no players', async () => {
            await onlineChecker.updateStatus(SLACK_URL, BUNGEE_WITH_NO_PLAYERS)
        });
    });
});