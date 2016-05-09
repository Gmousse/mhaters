import React, { PropTypes } from 'react';
import { AppBar as MUIAppBar, IconButton } from 'material-ui';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import AppMenu from './AppMenu.jsx';

function AppBar(props) {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <MUIAppBar
              title={props.title}
              style={{background: 'linear-gradient(#621814,#b72d25)'}}
              iconElementLeft={
                <IconButton onClick={props.handleMenuIconClick}>
                    <MoreVertIcon />
                </IconButton>
              }
              iconElementRight={props.elementRight} />
            <AppMenu
              open={props.openMenu}
              items={props.menuItems}
              routes={props.routes}
              handleItemClick={props.handleMenuItemClick}
              handleClose={props.handleMenuIconClick} />
        </div>
    );
}

AppBar.defaultProps = {
    handleMenuItemClick: () => {},
    handleMenuIconClick: () => {},
    openMenu: false,
    elementRight: '',
    menuItems: [],
    routes: [],
    title: '',
};

AppBar.propTypes = {
    handleMenuItemClick: PropTypes.func,
    handleMenuIconClick: PropTypes.func,
    openMenu: PropTypes.bool,
    elementRight: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    menuItems: PropTypes.array,
    routes: PropTypes.array,
    title: PropTypes.string,
};

export default AppBar;
