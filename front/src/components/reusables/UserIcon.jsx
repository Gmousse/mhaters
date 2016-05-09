import React, { PropTypes } from 'react';

function UserIcon(props) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', ...props.style}}>
            <img src={props.src} height={props.height} width={props.width}/>
            <div style={{lineHeight: '1em'}}>{props.label}</div>
        </div>
    );
}

UserIcon.defaultProps = {
    label: '',
    heigt: '100%',
    width: '100%',
    src: '',
    style: {},
};

UserIcon.propTypes = {
    label: PropTypes.string,
    heigt: PropTypes.string,
    width: PropTypes.string,
    src: PropTypes.string,
    style: PropTypes.object,
};

export default UserIcon;
