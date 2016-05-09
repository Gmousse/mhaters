import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';

import Comparison from './reusables/Comparison.jsx';
import UserIcon from './reusables/UserIcon.jsx';

import '../css/main.css';

const SUMMONER_IMAGE_URL = 'http://ddragon.leagueoflegends.com/cdn/6.9.1/img/profileicon/';
const CHAMPION_IMAGE_URL = 'http://ddragon.leagueoflegends.com/cdn/6.9.1/img/champion/';

class Comparator extends Component {

    componentWillMount() {
        if (this.props.summonerName === '' || this.props.mateName === '') {
            this.props.onErrorRedirection();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.summonerName === '' || nextProps.mateName === '') {
            nextProps.onErrorRedirection();
        }
    }

    _displayChampionImage(championImage) {
        championImage = championImage.replace(' ', '');
        championImage = championImage.replace('.', '');
        championImage = championImage.replace('\'', '');
        // EXCEPTIONNAL CASE; THX RITO;
        championImage = championImage.replace('Zix', 'zix');
        return `${CHAMPION_IMAGE_URL}${championImage}.png`;
    }

    _displayComparisonDetails(championComparison) {
        const championImage = this._displayChampionImage(championComparison.informations.name);
        const leftItem = (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{marginRight: '1em'}}>{championComparison.summonerMastery.highestGrade === '' ? '?' : championComparison.summonerMastery.highestGrade}</div>
                    <div style={{marginRight: '1em'}}>lvl: {championComparison.summonerMastery.level}</div>
                </div>
                <UserIcon width="40px" height="40px" src={championImage} label={championComparison.informations.name} style={{maxWidth: '40px'}}/>
            </div>);
        const rightItem = (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <UserIcon width="40px" height="40px" src={championImage} label={championComparison.informations.name} style={{maxWidth: '40px'}}/>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{marginLeft: '1em'}}>{championComparison.mateMastery.highestGrade === '' ? '?' : championComparison.mateMastery.highestGrade}</div>
                    <div style={{marginLeft: '1em'}}>lvl: {championComparison.mateMastery.level}</div>
                </div>
            </div>);

        let sign;
        if (championComparison.whoHasBestGrade === 'summoner') {
            sign = 'superior';
        } else if (championComparison.whoHasBestGrade === 'mate') {
            sign = 'inferior';
        } else {
            sign = 'equal';
        }
        return <Comparison leftItem={leftItem} rightItem={rightItem} sign={sign} style={{marginBottom: '2em ', marginLeft: '1em', marginRight: '1em'}}/>;
    }

    _displayComparisonScore(comparisonData) {
        const summonerPoints = comparisonData.detailsByChampion.filter((championComparison) => championComparison.whoHasBestGrade === 'summoner').length;
        const matePoints = comparisonData.detailsByChampion.filter((championComparison) => championComparison.whoHasBestGrade === 'mate').length;
        let customMessage;
        let color;
        if (summonerPoints > matePoints) {
            customMessage = `YOU WIN BRO! But care, your mate is just not a NoLife like you. (...maybe help him to progess). YOU: ${summonerPoints} HIM: ${matePoints}`;
            color = 'green';
        } else if (summonerPoints < matePoints) {
            customMessage = `DAMN YOU LOOSE! For sure your mate is a Nerd. Leave Him Alone !! (...or learn from him). YOU: ${summonerPoints} HIM: ${matePoints}`;
            color = 'red';
        } else {
            customMessage = `EQUALITY! That\'s not funny. You have an equivalent skill! Kiss you! YOU: ${summonerPoints} HIM: ${matePoints}`;
            color = 'blue';
        }
        return <div style={{marginBottom: '0.5em', lineHeight: '1.1em', color}}>{customMessage}</div>;
    }

    render() {
        const { summonerName, summonerImage, mateName, mateImage, comparisonData, history } = this.props;
        return (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                <h3 style={{maxWidth: '70%', marginBottom: '0.5em', lineHeight: '1.1em'}}>Now, let's have a look on who has best grades! </h3>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '1em', marginBottom: '2em'}}>
                    <UserIcon width="60px" height="60px" src={`${SUMMONER_IMAGE_URL}${summonerImage}.png`} label={summonerName}/>
                    <p style={{width: '40px'}}>VS</p>
                    <UserIcon width="60px" height="60px" src={`${SUMMONER_IMAGE_URL}${mateImage}.png`} label={mateName}/>
                </div>
                {this._displayComparisonScore(comparisonData)}
                <div style={{maxWidth: '70%', marginBottom: '1em', fontSize: '0.8em', lineHeight: '1em'}}>*Care about this comparison. Grades aren't directly related to your skill. Moreover, grades are directly correlated with the champion level.</div>
                <div style={{maxWidth: '70%', marginBottom: '1em', fontSize: '0.8em', lineHeight: '1em'}}>**Only champions played by both players are taken in account. We just count how many times you have better grade than your mate.</div>
                <RaisedButton
                  label="Get Details"
                  labelPosition="after"
                  primary
                  onClick={() => {history.push('/details');}}
                  labelColor="white"
                  backgroundColor="linear-gradient(#18771d,#25b72d)"
                  style={{margin: '1em', background: 'linear-gradient(#18771d,#25b72d)'}}
                />
                <div style={{maxWidth: '70%', marginBottom: '2em', fontSize: '1em', lineHeight: '1em'}}>Or scroll to discover comparison by champion</div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
                    {
                        comparisonData.detailsByChampion.map((championComparison) => this._displayComparisonDetails(championComparison))
                    }
                </div>
            </div>
        );
    }
}

export default Comparator;
