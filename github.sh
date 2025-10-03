/usr/bin/bash

cd /var/www/postgres-sample

git pull origin main --ff-only

if [ ! -d "node_modules" ]; then
    npm install
fi
