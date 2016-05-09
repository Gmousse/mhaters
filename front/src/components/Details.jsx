import React, { Component } from 'react';

import LineChart from './LineChart.jsx';
import BarChart from './BarChart.jsx';
import UserIcon from './reusables/UserIcon.jsx';

import '../css/main.css';

const SUMMONER_IMAGE_URL = 'http://ddragon.leagueoflegends.com/cdn/6.9.1/img/profileicon/';
const CHAMPION_IMAGE_URL = 'http://ddragon.leagueoflegends.com/cdn/6.9.1/img/champion/';

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animateCharts: true,
        };
    }

    componentWillMount() {
        if (this.props.summonerName === '' || this.props.mateName === '') {
            this.props.onErrorRedirection();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.summonerName === '' || nextProps.mateName === '') {
            nextProps.onErrorRedirection();
        }
        this.setState({animateCharts: false});
    }

    render() {
        const { summonerName, summonerImage, mateName, mateImage, comparisonData, history } = this.props;
        const winsByLevel = {
            summoner: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
            },
            mate: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
            },
        };
        const bestGradesAndWins = {
            levels: {
                summoner: 0,
                mate: 0,
            },
            grades: {
                summoner: 0,
                mate: 0,
            },
        };

        for (const championData of comparisonData.detailsByChampion) {
            if (championData.whoHasBestGrade) {
                winsByLevel[championData.whoHasBestGrade][championData.summonerMastery.level] += 1;
                bestGradesAndWins.grades[championData.whoHasBestGrade] += 1;
            }
            if (championData.whoHasHigherPoints) {
                bestGradesAndWins.levels[championData.whoHasHigherPoints] += 1;
            }
        }

        return (
            <div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                    <h3 style={{maxWidth: '70%', marginBottom: '0.5em', lineHeight: '1.1em'}}> Want you more informations about grades and levels ? Let's go! </h3>
                    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '1em', marginBottom: '2em'}}>
                        <UserIcon width="60px" height="60px" src={`${SUMMONER_IMAGE_URL}${summonerImage}.png`} label={summonerName}/>
                        <p style={{width: '40px'}}>VS</p>
                        <UserIcon width="60px" height="60px" src={`${SUMMONER_IMAGE_URL}${mateImage}.png`} label={mateName}/>
                    </div>
                </div>
                <div style={{textAlign: 'center'}}>Relationship between champion level and number of winned grades comparisons</div>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '-3em'}}>
                    <p style={{color: 'green'}}>YOU</p>
                    <p style={{color: 'green', minWidth: '2em'}}>&nbsp;</p>
                    <p style={{color: 'red'}}>HIM</p>
                </div>
                <LineChart data={winsByLevel.summoner} data2={winsByLevel.mate} animate={this.state.animateCharts} />
                <div style={{textAlign: 'center', marginTop: '2em'}}>Relationship between champion level and number of winned champions grades comparisons</div>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '-3em'}}>
                    <p style={{color: 'green'}}>YOU</p>
                    <p style={{color: 'green', minWidth: '2em'}}>&nbsp;</p>
                    <p style={{color: 'red'}}>HIM</p>
                </div>
                <BarChart data={bestGradesAndWins.grades} label="grades" animate={this.state.animateCharts} />
                <div style={{textAlign: 'center', marginTop: '2em'}}>Relationship between champion level and number of winned champions levels comparisons</div>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '-3em'}}>
                    <p style={{color: 'green'}}>YOU</p>
                    <p style={{color: 'green', minWidth: '2em'}}>&nbsp;</p>
                    <p style={{color: 'red'}}>HIM</p>
                </div>
                <BarChart data={bestGradesAndWins.levels} label="levels" animate={this.state.animateCharts} />
            </div>
        );
    }
}

export default Details;
