import React, { Component } from 'react';
import './styles.scss';

class Footer extends Component {
    render() {
      
        return (

            <div ><h6 className="footer">&reg; Pazzi Software S.A.S {(new Date().getFullYear())}</h6></div>

        );
    }
}

export default Footer;