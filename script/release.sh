#!/bin/bash

git add .
git stash save "[yarn release] `date +'%Y-%m-%d %H:%M:%S'`"
git checkout master
git pull upstream master
yarn standard-version
git push upstream master --tags && git push origin master
