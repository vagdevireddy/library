#!/bin/bash
kill $(ps aux | grep 'node server' | awk '{print $2}')

cd /home/ubuntu/projects/library-ui/dist
git pull origin master
node server
