import fetch from 'isomorphic-fetch';

export const TOGGLE_APP_MENU = 'TOGGLE_APP_MENU';
export const CLOSE_APP_MENU = 'CLOSE_APP_MENU';
export const UPDATE_SEARCH_SUMMONER_NAME = 'UPDATE_SEARCH_SUMMONER_NAME';
export const UPDATE_SEARCH_MATE_NAME = 'UPDATE_SEARCH_MATE_NAME';
export const CHANGE_SUMMONER_COUNTRY = 'CHANGE_SUMMONER_COUNTRY';

export const WAITING_SUMMONER_API = 'WAITING_SUMMONER_API';
export const RECEIVING_SUMMONER_API = 'RECEIVING_SUMMONER_API';
export const FAILING_SUMMONER_API = 'FAILING_SUMMONER_API';

export const WAITING_SUMMONER_MATE_API = 'WAITING_SUMMONER_MATE_API';
export const RECEIVING_SUMMONER_MATE_API = 'RECEIVING_SUMMONER_MATE_API';
export const FAILING_SUMMONER_MATE_API = 'FAILING_SUMMONER_MATE_API';

export const WAITING_MASTERY_API = 'WAITING_MASTERY_API';
export const RECEIVING_MASTERY_API = 'RECEIVING_MASTERY_API';
export const FAILING_MASTERY_API = 'FAILING_MASTERY_API';

export const WAITING_MASTERY_MATE_API = 'WAITING_MASTERY_MATE_API';
export const RECEIVING_MASTERY_MATE_API = 'RECEIVING_MASTERY_MATE_API';
export const FAILING_MASTERY_MATE_API = 'FAILING_MASTERY_MATE_API';

export const WAITING_ALL_CHAMPIONS_API = 'WAITING_ALL_CHAMPIONS_API';
export const RECEIVING_ALL_CHAMPIONS_API = 'RECEIVING_ALL_CHAMPIONS_API';
export const FAILING_ALL_CHAMPIONS_API = 'FAILING_ALL_CHAMPIONS_API';

export function toggleAppMenu() {
    return {
        type: TOGGLE_APP_MENU,
    };
}

export function closeAppMenu() {
    return {
        type: CLOSE_APP_MENU,
    };
}

export function updateSearchName(newSearchName, isMate = false) {
    return {
        type: isMate ? UPDATE_SEARCH_MATE_NAME : UPDATE_SEARCH_SUMMONER_NAME,
        newSearchName,
    };
}

export function changeSummonerCountry(newSummonerCountry) {
    return {
        type: CHANGE_SUMMONER_COUNTRY,
        newSummonerCountry,
    };
}

export function waitingSummonerAPI(isMate) {
    return {
        type: isMate ? WAITING_SUMMONER_MATE_API : WAITING_SUMMONER_API,
    };
}

export function receivingSummonerAPI(response, isMate) {
    return {
        type: isMate ? RECEIVING_SUMMONER_MATE_API : RECEIVING_SUMMONER_API,
        summonerId: response.id,
        summonerName: response.name,
        summonerImage: response.profileIconId,
    };
}

export function failingSummonerAPI(error, isMate) {
    return {
        type: isMate ? FAILING_SUMMONER_MATE_API : FAILING_SUMMONER_API,
        error,
    };
}

export function callSummonerAPI(summonerName, summonerCountry, isMate = false) {
    const url = `http://localhost:5000/api/getSummonerByName?name=${summonerName.toLowerCase()}&server=${summonerCountry}`;
    return dispatch => {
        dispatch(waitingSummonerAPI(isMate));
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receivingSummonerAPI(json[summonerName.toLowerCase()], isMate)))
            .catch(error => dispatch(failingSummonerAPI(error, isMate)));
    };
}

export function waitingMasteryAPI(isMate) {
    return {
        type: isMate ? WAITING_MASTERY_MATE_API : WAITING_MASTERY_API,
    };
}

export function receivingMasteryAPI(response, isMate) {
    return {
        type: isMate ? RECEIVING_MASTERY_MATE_API : RECEIVING_MASTERY_API,
        summonerChampionsMastery: response,
    };
}

export function failingMasteryAPI(error, isMate) {
    return {
        type: isMate ? FAILING_MASTERY_MATE_API : FAILING_MASTERY_API,
        error,
    };
}

export function callMasteryAPI(summonerId, summonerCountry, isMate = false) {
    const url = `http://localhost:5000/api/getSummonerMasteryBySummonerId?id=${summonerId}&server=${summonerCountry}`;
    return dispatch => {
        dispatch(waitingMasteryAPI(isMate));
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receivingMasteryAPI(json.results, isMate)))
            .catch(error => dispatch(failingMasteryAPI(error, isMate)));
    };
}

export function waitingAllChampionsAPI() {
    return {
        type: WAITING_ALL_CHAMPIONS_API,
    };
}

export function receivingAllChampionsAPI(response) {
    return {
        type: RECEIVING_ALL_CHAMPIONS_API,
        championsInformations: response,
    };
}

export function failingAllChampionsAPI(error) {
    return {
        type: FAILING_ALL_CHAMPIONS_API,
        error,
    };
}

export function callAllChampionsAPI(summonerCountry) {
    const url = `http://localhost:5000/api/getAllChampionsInformations?server=${summonerCountry}`;
    return dispatch => {
        dispatch(waitingAllChampionsAPI());
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receivingAllChampionsAPI(json.results.data)))
            .catch(error => dispatch(failingAllChampionsAPI(error)));
    };
}
