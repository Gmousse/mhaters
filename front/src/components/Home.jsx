import React, { Component } from 'react';
import SearchSummoner from './SearchSummoner.jsx';
import '../css/main.css';

class Home extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.summonerAPIStatus === 'ready' && nextProps.mateAPIStatus === 'ready') {
            nextProps.onSuccesRedirection();
        }
    }

    _renderSummonerResearch() {
        const { searchSummonerName, summonerCountry, summonerAPIStatus, handleCountryChange, handleUpdateSummonerName, handleSearchSummonerName } = this.props;
        return (
            <div>
                <h3>First, find your LoL account:</h3>
                <SearchSummoner
                  searchValue={searchSummonerName}
                  selectValue={summonerCountry}
                  status={summonerAPIStatus}
                  handleSelectChange={(newSummonerCountry) => handleCountryChange(newSummonerCountry)}
                  handleSearchChange={(newSearchSummonerName) => handleUpdateSummonerName(newSearchSummonerName)}
                  handleSearchClick={() => handleSearchSummonerName(searchSummonerName, summonerCountry, false)}/>
            </div>
        );
    }

    _renderMateResearch() {
        const { summonerCountry, searchSummonerName, searchMateName, mateAPIStatus, handleUpdateSummonerName, handleSearchSummonerName } = this.props;
        const handleSearchClick = () => handleSearchSummonerName(searchMateName, summonerCountry, true);
        return (
            <div>
                  <h3>Now, find your friend:</h3>
                  <SearchSummoner
                    withCountries={false}
                    status={mateAPIStatus}
                    searchValue={searchMateName}
                    handleSearchChange={(newSearchMateName) => handleUpdateSummonerName(newSearchMateName, true)}
                    handleSearchClick={searchMateName !== searchSummonerName ? handleSearchClick : ''} />
                {searchMateName !== searchSummonerName ? '' : <div style={{color: 'red'}}>Your mate's name should be different than your's.</div>}
            </div>
        );
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                <h2>Welcome summoner !</h2>
                <div style={{maxWidth: '70%'}}>Test your champions mastery against a mate. Fear your friendship !</div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    {this.props.summonerAPIStatus === 'ready' ? this._renderMateResearch() : this._renderSummonerResearch()}
                </div>
            </div>
        );
    }
}

export default Home;
