#!/bin/bash

if [ "x$DYNO" != "x" ]; then

  echo "Linking packages relatively for Heroku deployment"

  cd web
  mkdir -p ./node_modules/@este

  (
    cd ./node_modules/@este
    rm -rf ./common

    ln -s ../../../common ./common

    cd ./common
    npm install
  )

  npm install

  echo "Building app"

  npm run build

  echo "Done."

fi

if [ "x$DYNO" == "x" ]; then

  echo "Linking packages for non heroku environments"

  (cd web && npm link ../common && npm install)
  (cd native && npm link ../common && npm install)

  echo "Done. Start your server with npm run web-start-dev"

fi
