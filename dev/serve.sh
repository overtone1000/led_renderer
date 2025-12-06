#!/bin/bash

NAME=test_server

echo Stopping any other instance
podman stop $NAME && podman rm $NAME

echo Starting new instance
podman run \
    --detach \
    --volume ./src:/var/www/html/static_content/led_renderer \
    --volume ./dev/nginx.conf:/etc/nginx/nginx.conf \
    --volume ./dev/sites-available:/etc/nginx/sites-available \
    --publish 8080:80 \
    --name $NAME \
    nginx

echo Setting sites available
podman exec $NAME ln -s /etc/nginx/sites-available /etc/nginx/sites-enabled 
podman exec $NAME nginx -s reload

podman logs --follow=true $NAME

echo Navigate to http://localhost:8080/led_renderer/
echo !! And don't forget to disable the cache to see changes after refresh !!