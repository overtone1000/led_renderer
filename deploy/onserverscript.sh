#!/bin/bash

NGINX_CONTAINER_NAME=nginx

echo Copying site into volume
podman exec $NGINX_CONTAINER_NAME rm -rf $2
podman cp $1 "$NGINX_CONTAINER_NAME:$2"

#rm -rd /tmp/radcalc