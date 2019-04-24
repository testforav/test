/**
*
* GlobalLink
*
*/

import React from 'react';
// import styled from 'styled-components';

import { push } from 'react-router-redux';

function GlobalLink(props) {
    return (
        <a
            className={props.className}
            href={props.to}
            onClick={(evt) => {
                if (
                    !evt.ctrlKey && 
                    !evt.shiftKey && 
                    !evt.metaKey && 
                    !(evt.button && evt.button == 1) 
                ) {
                    evt.preventDefault();
                    props.dispatch(push(props.to));
                }
            }}
        >{props.children}</a>
    );
}

GlobalLink.propTypes = {

};

export default GlobalLink;
