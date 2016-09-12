#!/bin/bash

cd src/components/shared/settings

wget https://gist.github.com/vizeke/$SETTINGS_ID

cd ../../../..
wget https://gist.github.com/vizeke/$CONFIG_ID

npm install

jspm config registries.github.auth $JSPM_GITHUB_AUTH_TOKEN

jspm install

npm run test
