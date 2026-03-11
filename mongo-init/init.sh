#!/bin/sh

echo "Importing exams..."
mongoimport --host localhost --db ngsa-db --collection exams --file /data/import/ngsa-db.exams.json --jsonArray

echo "Importing questions..."
mongoimport --host localhost --db ngsa-db --collection questions --file /data/import/ngsa-db.questions.json --jsonArray

echo "Mongo import complete."