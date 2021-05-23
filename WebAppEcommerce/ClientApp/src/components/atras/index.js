import React, { Component } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { LateralBarActions } from '.././lateral_bar/actions';
import { productoActions } from '../productos/actions';
import { withRouter } from "react-router-dom";


class Atras extends Component {

    constructor() {
      super();
      this.back = this.back.bind(this);
    }

    //-------------------------------Eventos------------------------

    back() {
        window.history.go(-1);
        return;
    }






    //---------------------------------------------------------------
    render() {

        return (
          
                <div className="contain-atras" id="contain-atras">
                    <a onClick={this.back}>
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                    </a>
                </div>
         


        );
    }

}

//-------------------------------Redux------------------------

const mapStateToProps = (state) => {
    const { menuLateralVisible } = state.lateralBarReducer;
    return {
        menuLateralVisible
     
    };


};

const mapDispatchToProps = {
    lateral_bar_visible: LateralBarActions.lateral_bar_visible,
    ver_car: productoActions.ver_car,
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Atras));
