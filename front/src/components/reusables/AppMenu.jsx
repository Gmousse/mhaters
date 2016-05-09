import React, { PropTypes } from 'react';
import { LeftNav, MenuItem, RaisedButton } from 'material-ui';

function AppMenu(props) {
    return (
        <LeftNav open={props.open}>
            {
                props.items.map((item, index) => {
                    return (
                        <MenuItem onClick={() => props.handleItemClick(props.routes[index])}>
                            {item}
                        </MenuItem>
                    );
                })
            }
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <RaisedButton
                  label="Close"
                  labelPosition="after"
                  onClick={props.handleClose}
                  labelColor="white"
                  backgroundColor="linear-gradient(#18771d,#25b72d)"
                  style={{margin: '1em', background: 'linear-gradient(#18771d,#25b72d)'}}
                />
            </div>
        </LeftNav>
    );
}

AppMenu.defaultProps = {
    handleItemClick: () => {},
    handleClose: () => {},
    open: false,
    items: [],
    routes: [],
};

AppMenu.propTypes = {
    handleItemClick: PropTypes.func,
    handleClose: PropTypes.func,
    open: PropTypes.bool,
    items: PropTypes.array,
    routes: PropTypes.array,
};

export default AppMenu;
