import React, { PropTypes } from 'react';

function Select(props) {
    return (
        <select
          onChange={(event) => props.handleChange(event.target.value)}
          style={props.style}
          value={props.value}>
            {
                props.values.map((value, index) => {
                    return (
                        <option value={value} key={index}>{props.labels ? props.labels[index] : value}</option>
                    );
                })
            }
        </select>
    );
}

Select.defaultProps = {
    value: '',
    values: [],
    handleChange: () => {},
    style: {},
};

Select.propTypes = {
    value: PropTypes.string,
    values: PropTypes.array,
    labels: PropTypes.array,
    handleChange: PropTypes.func,
    style: PropTypes.object,
};

export default Select;
