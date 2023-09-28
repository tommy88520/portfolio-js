#!/bin/bash

git fetch upstream
git add .
git stash save "[yarn release] `date +'%Y-%m-%d %H:%M:%S'`"
git checkout master
git pull upstream master
yarn standard-version
COMMIT_SHA=$(git rev-parse HEAD)
IMAGE_TAG=asia-east1-docker.pkg.dev/portfolio-js-123/portfolio/backend-prod:$COMMIT_SHA
docker build --platform linux/amd64 -t $IMAGE_TAG --build-arg ENV=prod .
docker push $IMAGE_TAG
docker rmi $IMAGE_TAG
git push upstream master --tags && git push origin master