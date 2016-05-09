import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {
    TOGGLE_APP_MENU, CLOSE_APP_MENU, UPDATE_SEARCH_SUMMONER_NAME, UPDATE_SEARCH_MATE_NAME, CHANGE_SUMMONER_COUNTRY,
    WAITING_SUMMONER_API, RECEIVING_SUMMONER_API, FAILING_SUMMONER_API,
    WAITING_SUMMONER_MATE_API, RECEIVING_SUMMONER_MATE_API, FAILING_SUMMONER_MATE_API,
    WAITING_MASTERY_API, RECEIVING_MASTERY_API, FAILING_MASTERY_API,
    WAITING_MASTERY_MATE_API, RECEIVING_MASTERY_MATE_API, FAILING_MASTERY_MATE_API,
    WAITING_ALL_CHAMPIONS_API, RECEIVING_ALL_CHAMPIONS_API, FAILING_ALL_CHAMPIONS_API,
} from './actions.js';

const appInitialState = {
    openMenu: false,
    searchSummonerName: '',
    summonerCountry: 'euw',
    summonerName: '',
    summonerId: '',
    summonerImage: '',
    summonerChampionsMastery: [],
    searchMateName: '',
    mateName: '',
    mateId: '',
    mateImage: '',
    mateChampionsMastery: [],
    championsInformations: [],
    summonerAPIStatus: '',
    mateAPIStatus: '',
    comparisonData: {},
};


function treatGrade(gradeToTreat) {
    if (gradeToTreat.length === 1) {
        gradeToTreat += '1';
    }
    for (const [key, gradeType] of Object.entries(['S', 'A', 'B', 'C', 'D', 'E'].reverse())) {
        gradeToTreat = gradeToTreat.replace(gradeType, key);
    }
    gradeToTreat = gradeToTreat.replace('-', '0');
    gradeToTreat = gradeToTreat.replace('+', '2');
    return gradeToTreat;
}


function compareGrades(firstLabel, secondLabel, firstGrade, secondGrade) {
    firstGrade = treatGrade(firstGrade);
    secondGrade = treatGrade(secondGrade);

    if (firstGrade > secondGrade) {
        return firstLabel;
    } else if (firstGrade < secondGrade) {
        return secondLabel;
    } else {
        return false;
    }
}

function comparePoints(firstLabel, secondLabel, firstPoints, secondPoints) {
    if (firstPoints > secondPoints) {
        return firstLabel;
    } else if (firstPoints < secondPoints) {
        return secondLabel;
    } else {
        return false;
    }
}

function processMasteryComparisonData(summonerChampionsMastery, mateChampionsMastery, championsInformations) {

    const masteryComparisonData = {
        score: {},
        detailsByChampion: [],
    };

    const summonerChampionsIDs = summonerChampionsMastery.map((championData) => championData.championId);

    for (const mateChampionData of mateChampionsMastery) {
        if (summonerChampionsIDs.includes(mateChampionData.championId)) {
            masteryComparisonData.detailsByChampion.push({
                id: mateChampionData.championId,
                mateMastery: {
                    highestGrade: mateChampionData.highestGrade ? mateChampionData.highestGrade : '',
                    level: mateChampionData.championLevel,
                    points: mateChampionData.championPoints,
                },
            });
        }
    }

    masteryComparisonData.detailsByChampion = masteryComparisonData.detailsByChampion.map(championData => {
        const summonerTargetedChampionData = summonerChampionsMastery.filter((summonerChampionData) => summonerChampionData.championId === championData.id)[0];
        championData.informations = Object.values(championsInformations).filter((champion) => champion.id === championData.id)[0];
        championData.summonerMastery = {
            highestGrade: summonerTargetedChampionData.highestGrade ? summonerTargetedChampionData.highestGrade : '',
            level: summonerTargetedChampionData.championLevel,
            points: summonerTargetedChampionData.championPoints,
        };
        championData.whoHasHigherPoints = comparePoints('summoner', 'mate', championData.summonerMastery.points, championData.mateMastery.points);
        championData.whoHasBestGrade = compareGrades('summoner', 'mate', championData.summonerMastery.highestGrade, championData.mateMastery.highestGrade);
        return championData;
    });

    return masteryComparisonData;
}

export default function appState(state = appInitialState, action) {
    switch (action.type) {
    case TOGGLE_APP_MENU:
        return Object.assign({}, state, {
            openMenu: !state.openMenu,
            searchMateName: '',
            mateAPIStatus: '',
        });
    case CLOSE_APP_MENU:
        return Object.assign({}, state, {
            openMenu: false,
        });
    case UPDATE_SEARCH_SUMMONER_NAME:
        return Object.assign({}, state, {
            searchSummonerName: action.newSearchName,
            summonerAPIStatus: '',
        });
    case UPDATE_SEARCH_MATE_NAME:
        return Object.assign({}, state, {
            searchMateName: action.newSearchName,
            mateAPIStatus: '',
        });
    case CHANGE_SUMMONER_COUNTRY:
        return Object.assign({}, state, {
            summonerCountry: action.newSummonerCountry,
        });
    case WAITING_SUMMONER_API:
        return Object.assign({}, state, {summonerAPIStatus: 'loading'});
    case RECEIVING_SUMMONER_API:
        return Object.assign({}, state, {
            summonerAPIStatus: 'ready',
            summonerName: action.summonerName,
            summonerId: action.summonerId,
            summonerImage: action.summonerImage,
        });
    case FAILING_SUMMONER_API:
        return Object.assign({}, state, {
            summonerAPIStatus: 'failed',
        });
    case WAITING_SUMMONER_MATE_API:
        return Object.assign({}, state, {mateAPIStatus: 'loading'});
    case RECEIVING_SUMMONER_MATE_API:
        return Object.assign({}, state, {
            mateAPIStatus: '',
            mateName: action.summonerName,
            mateId: action.summonerId,
            mateImage: action.summonerImage,
        });
    case FAILING_SUMMONER_MATE_API:
        return Object.assign({}, state, {
            mateAPIStatus: 'failed',
        });
    case WAITING_MASTERY_API:
        return state;
    case RECEIVING_MASTERY_API:
        return Object.assign({}, state, {
            summonerChampionsMastery: action.summonerChampionsMastery,
        });
    case FAILING_MASTERY_API:
        return Object.assign({}, state, {
            summonerAPIStatus: 'failed',
        });
    case WAITING_MASTERY_MATE_API:
        return state;
    case RECEIVING_MASTERY_MATE_API:
        return Object.assign({}, state, {
            mateAPIStatus: 'ready',
            comparisonData: processMasteryComparisonData(state.summonerChampionsMastery, action.summonerChampionsMastery, state.championsInformations),
            mateChampionsMastery: action.summonerChampionsMastery,
        });
    case FAILING_MASTERY_MATE_API:
        return Object.assign({}, state, {
            mateAPIStatus: 'failed',
        });
    case WAITING_ALL_CHAMPIONS_API:
        return state;
    case RECEIVING_ALL_CHAMPIONS_API:
        return Object.assign({}, state, {
            championsInformations: action.championsInformations,
        });
    case FAILING_ALL_CHAMPIONS_API:
        return state;
    default:
        return state;
    }
}

const store = combineReducers({
    appState,
    routing: routerReducer,
});

export default store;
