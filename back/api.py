import os
import json
import requests
from flask import Flask, request, render_template, jsonify
from flask.ext.cors import CORS

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'html'])
UPLOAD_FOLDER = os.path.abspath('files')
OUTPUT_FOLDER = os.path.abspath('front/public')
RIOT_API_KEY = os.environ.get('RIOT_API_KEY')

app = Flask(__name__, template_folder=OUTPUT_FOLDER, static_folder=OUTPUT_FOLDER)
CORS(app)


@app.route("/")
def main():
    return render_template('index.html')


@app.route("/dev")
def dev():
    return render_template('dev.html')


@app.route("/comparator")
def comparator():
    return render_template('index.html')


@app.route("/api/getSummonerByName", methods=['GET'])
def getSummonerByName():
    url = 'https://euw.api.pvp.net/api/lol/{}/v1.4/summoner/by-name/{}?api_key={}'\
        .format(request.args['server'], request.args['name'], RIOT_API_KEY)
    summonerInformation = json.loads(requests.get(url).text)
    if 'status' in summonerInformation:
        if summonerInformation['status']['status_code'] == 404:
            raise ValueError("The sumonner doesn't exist")
        else:
            raise ValueError("General error")
    else:
        return jsonify(summonerInformation)


@app.route("/api/getSummonerMasteryBySummonerId", methods=['GET'])
def getSummonerMasteryBySummonerId():
    country = request.args['server']
    if(country == 'las'):
        country = 'la2'
    elif(country == 'ru' or country == 'kr'):
        country = country
    else:
        country = country + '1'
    url = 'https://euw.api.pvp.net/championmastery/location/{}/player/{}/champions?api_key={}'\
        .format(country, request.args['id'], RIOT_API_KEY)
    summonerMastery = json.loads(requests.get(url).text)
    return jsonify(results=summonerMastery)


@app.route("/api/getAllChampionsInformations", methods=['GET'])
def getAllChampionsInformations():
    url = 'https://global.api.pvp.net/api/lol/static-data/{}/v1.2/champion?champData=image,tags&api_key={}'\
        .format(request.args['server'], RIOT_API_KEY)
    championsInfos = json.loads(requests.get(url).text)
    return jsonify(results=championsInfos)


if __name__ == "__main__":
    app.run(debug=True, port=5000, host='0.0.0.0')
