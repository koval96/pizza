#!/bin/bash
git clone https://github.com/koval96/pizza
cd pizza
git checkout local_dep
cd ..
python3 -m venv venv
source venv/bin/activate
source venv/bin/activate
pip install -r pizza/api/requirements.txt
source venv/bin/activate
cd pizza
python3 api/manage.py runserver &
sleep 6
cd client
npm install
npm start &