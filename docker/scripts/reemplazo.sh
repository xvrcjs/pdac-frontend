#!/bin/sh

ARCHIVOS=$(grep -rl 'ENV_' /usr/share/nginx/html/)

for archivo in $ARCHIVOS
do
  sed -i 's|REACT_APP_BACKEND_URL|'"$REACT_APP_API_URL"'|g' $archivo
done

nginx -g 'daemon off;'
