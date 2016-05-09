import React, { PropTypes } from 'react';
import { RaisedButton, TextField } from 'material-ui';

function Search(props) {
    const style = Object.assign({}, {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }, props.style);
    return (
            <div style={style}>
                <TextField
                  value={props.value}
                  hintText="Summoner's name"
                  onChange={(event) => {props.handleChange(event.target.value);}}
                  onEnterKeyDown={() => {props.handleClick();}} />
                <RaisedButton
                  label="Search"
                  labelPosition="after"
                  onClick={() => {props.handleClick();}}
                  labelColor="white"
                  backgroundColor="linear-gradient(#18771d,#25b72d)"
                  style={{margin: '1em', background: 'linear-gradient(#18771d,#25b72d)'}}
                />
            </div>
    );
}

Search.defaultProps = {
    handleChange: () => {},
    handleClick: () => {},
    value: '',
    style: {},
};

Search.propTypes = {
    handleChange: PropTypes.func,
    handleClick: PropTypes.func,
    value: PropTypes.string,
    style: PropTypes.object,
};

export default Search;
