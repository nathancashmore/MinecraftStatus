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
## Run ##
```
SLACK_URL=https://hooks.slack.com/services/xxxxxx/xxxxx INTERVAL=10000 npm start minecraft.server.name:25565 
```
