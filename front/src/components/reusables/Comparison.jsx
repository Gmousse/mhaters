import React, { PropTypes } from 'react';
import { FontIcon } from 'material-ui';

function Comparison(props) {
    const signs = {
        inferior: <FontIcon className="material-icons" style={{transform: 'rotate(180deg)'}} color={'red'}>trending_flat</FontIcon>,
        superior: <FontIcon className="material-icons" color={'green'}>trending_flat</FontIcon>,
        equal: <FontIcon className="material-icons" color={'blue'}>compare_arrows</FontIcon>,
    };
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', ...props.style}}>
            {props.leftItem}
            {signs[props.sign]}
            {props.rightItem}
        </div>
    );
}

Comparison.defaultProps = {
    leftItem: '',
    rightItem: '',
    sign: '',
    style: {},
};

Comparison.propTypes = {
    leftItem: PropTypes.element,
    rightItem: PropTypes.element,
    sign: PropTypes.string,
    style: PropTypes.object,
};

export default Comparison;
