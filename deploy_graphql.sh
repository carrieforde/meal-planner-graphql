#!/bin/zsh
gcloud functions deploy meal-planner --entry-point handler --runtime nodejs16 --trigger-http --project meal-planner-355001 --set-env-vars NODE_E
NV=development
