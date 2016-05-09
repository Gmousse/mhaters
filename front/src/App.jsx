import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
     toggleAppMenu, closeAppMenu, updateSearchName,
     changeSummonerCountry, callSummonerAPI, callMasteryAPI, callAllChampionsAPI,
  } from './actions.js';

import AppBar from './components/reusables/AppBar.jsx';
import UserIcon from './components/reusables/UserIcon.jsx';
import './css/main.css';

const IMAGE_URL = 'http://ddragon.leagueoflegends.com/cdn/6.9.1/img/profileicon/';

class App extends Component {

    componentWillMount() {
        const { dispatch, app } = this.props;
        dispatch(callAllChampionsAPI(app.summonerCountry));
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch, app } = this.props;
        if (nextProps.app.summonerCountry !== app.summonerCountry) {
            dispatch(callAllChampionsAPI(nextProps.app.summonerCountry));
        }
        if (nextProps.app.summonerId !== app.summonerId) {
            dispatch(callMasteryAPI(nextProps.app.summonerId, nextProps.app.summonerCountry));
        }
        if (nextProps.app.mateId !== app.mateId) {
            dispatch(callMasteryAPI(nextProps.app.mateId, nextProps.app.summonerCountry, true));
        }
    }

    _displaySummonerImage(width = '30px', height = '30px') {
        const { app } = this.props;
        return (
            app.summonerImage ? <UserIcon
              src={`${IMAGE_URL}${app.summonerImage}.png`}
              label={app.summonerName}
              width={width}
              height={height}
              style={{color: 'white'}} /> : '',
        );
    }

    _renderChildrens() {
        const { dispatch, app, history } = this.props;
        const childrenPropsToPass = {
            Home: {
                handleUpdateSummonerName: (newSearchName, isMate) => dispatch(updateSearchName(newSearchName, isMate)),
                handleSearchSummonerName: (summonerName, summonerCountry, isMate) => dispatch(callSummonerAPI(summonerName, summonerCountry, isMate)),
                handleCountryChange: (newSummonerCountry) => dispatch(changeSummonerCountry(newSummonerCountry)),
                summonerCountry: app.summonerCountry,
                searchSummonerName: app.searchSummonerName,
                searchMateName: app.searchMateName,
                summonerAPIStatus: app.summonerAPIStatus,
                mateAPIStatus: app.mateAPIStatus,
                onSuccesRedirection: () => {history.push('/comparator');},
            },
            Comparator: {
                summonerName: app.summonerName,
                summonerImage: app.summonerImage,
                comparisonData: app.comparisonData,
                mateName: app.mateName,
                mateImage: app.mateImage,
                onErrorRedirection: () => {history.push('/');},
            },
            Details: {
                summonerName: app.summonerName,
                summonerImage: app.summonerImage,
                comparisonData: app.comparisonData,
                mateName: app.mateName,
                mateImage: app.mateImage,
                onErrorRedirection: () => {history.push('/');},
            },
        };
        const children = Object.assign({}, this.props.children);
        children.props = Object.assign({}, children.props, childrenPropsToPass[children.type.name]);
        return children;
    }

    render() {
        const { dispatch, app, history } = this.props;
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <AppBar
                  title={'M(h)ate(r)s'}
                  openMenu={app.openMenu}
                  handleMenuIconClick={() => {dispatch(toggleAppMenu());}}
                  handleMenuItemClick={(newRoute) => {history.push(newRoute);}}
                  menuItems={['Home', 'Grades Comparator', 'Grades Details']}
                  routes={['/', '/comparator', '/details']}
                  elementRight={this._displaySummonerImage()} />
                <div onClick={() => dispatch(closeAppMenu())} style={{display: 'flex', flexDirection: 'column'}}>
                    {this._renderChildrens()}
                </div>
            </div>
        );
    }
}

function stateToProps(state) {
    return {
        app: state.appState,
    };
}

export default connect(stateToProps)(App);
