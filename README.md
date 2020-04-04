# MinecraftStatus
Noddy node file to provide notifications via Slack about players who are on your minecraft server

## Prerequisites ##
* Install [NodeJs](https://nodejs.org/en/) v10.11.0
> If installing on Windows make sure you install windows build tools first :
>
> ```npm install --global --production windows-build-tools```
>
* [Slack](https://api.slack.com/apps) : Create a new App and add a new incoming webhoook

## Setup ##

* Clone this project
* Install dependencies

```
npm install
```

## Test ##
```
npm test
```
## Run ##
```
SLACK_URL=https://hooks.slack.com/services/xxxxxx/xxxxx SERVER=minecraft.server.name:25565 npm start
```
By default the service will run every 10 seconds to check for any change in the number of players online.  It will only
create a new Slack message if there has been a change.  To change the check interval, change the INTERVAL parameter.
e.g. for a check interval of 1 minute add an interval parameter of 60.  

```
INTERVAL=60
```