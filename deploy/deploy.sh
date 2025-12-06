#!/bin/bash

set -e

source .env

#echo Getting container name
#NGINX_CONTAINER_NAME=$(ssh -T $SSH_DEST "docker container ls --filter \"name=nginx_nginx*\" --format \"{{.Names}}\"")

#echo Container name is $NGINX_CONTAINER_NAME

TEMPDIR=/tmp/led_renderer
TARGETDIR=/var/www/html/resources

ssh -T $SSH_DEST "rm -frd $TEMPDIR && mkdir -p $TEMPDIR"

echo Uploading script
scp -r ./onserverscript.sh $SSH_DEST:$TEMPDIR

echo Uploading site
scp -r ../src/dist/** $SSH_DEST:$TEMPDIR

echo Running script
ssh -T $SSH_DEST "bash $TEMPDIR/onserverscript.sh $TEMPDIR $TARGETDIR" 