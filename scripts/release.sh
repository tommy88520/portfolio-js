#!/bin/bash

# git add .
# git stash save "[yarn release] `date +'%Y-%m-%d %H:%M:%S'`"
# git checkout master
# git pull upstream master
# yarn standard-version
# git push upstream master --tags && git push origin master
# docker build --build-arg ENV=prod -t asia-east1-docker.pkg.dev/portfolio-js-123/portfolio/portfolio:v1.1 .
git add .
git stash save "[yarn release] `date +'%Y-%m-%d %H:%M:%S'`"
COMMIT_SHA=$(git rev-parse HEAD)
IMAGE_TAG=asia-east1-docker.pkg.dev/portfolio-js-123/portfolio/backend-prod:$COMMIT_SHA
docker build --platform linux/amd64 -t $IMAGE_TAG --build-arg ENV=prod .
docker push $IMAGE_TAG
docker rmi $IMAGE_TAG
git push upstream test2 --tags && git push origin test2
