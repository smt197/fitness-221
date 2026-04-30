#!/bin/sh

echo "--- Running Prisma Migrations ---"
npx prisma migrate deploy

echo "--- Starting Node.js Application ---"
npm start
