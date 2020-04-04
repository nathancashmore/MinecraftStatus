const { expect } = require('chai');
const { exec } = require('child_process');

const node = process.execPath;
const RUNNER = 'run.js';

const SLACK_URL = "https://hooks.slack.com/services/xxx/xxx/xxx";
const SERVER = "vanilla.with.one.player.co.uk";

describe('run.js', async () => {

  const SUCCESS = 0;
  const INVALID_ARGUMENTS = 9;
  const EXPECTED_USAGE_ERROR = 'Usage: SLACK_URL=https://hooks.slack.com/services/xxxxxx/xxxxx SERVER=minecraft.server.name:25565 npm start';
  const EXPECTED_SUCCESS_MSG = 'Obtain status update for ' + SERVER;

  beforeEach(() => {
    // Run tests almost immediately by setting interval to 1 second
    // then set timeout to the same value to ensure it is only run once.
    process.env.INTERVAL = 1;
    process.env.TIMEOUT = 1;
  });

  afterEach(() => {
    delete process.env.SLACK_URL;
    delete process.env.SERVER;
  });

  it('should run successfully with correct arguments', (done) => {
    process.env.SLACK_URL = SLACK_URL;
    process.env.SERVER = SERVER;
    checkExitAndResponse(SUCCESS, EXPECTED_SUCCESS_MSG, done)
  }).timeout(5000);

  it('should fail if SLACK_URL not specified', (done) => {
    process.env.SERVER = SERVER;
    checkExitAndResponse(INVALID_ARGUMENTS, EXPECTED_USAGE_ERROR, done)
  });

  it('should fail if SERVER not specified', (done) => {
    process.env.SLACK_URL = SLACK_URL;
    checkExitAndResponse(INVALID_ARGUMENTS, EXPECTED_USAGE_ERROR, done)
  });

});

function checkExitAndResponse(exitCode, expectedResponse, done) {

  const run = exec(node + ' ' + RUNNER, function (error, stdout) {
    expect(stdout).to.contain(expectedResponse);
    console.log(stdout);
    done()
  });

  run.on('exit', function (code) {
    expect(code).to.equal(exitCode);
  });

}
