import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertActions } from './components/alerts_message/actions';
import SweetAlert from 'react-bootstrap-sweetalert';


class App extends Component {



    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }


    updateDimensions = () => {
        if (window.innerWidth <= 800) {
            localStorage.setItem('EsMovil', true);

        } else {
            localStorage.setItem('EsMovil', false);
        }
    };




    render() {


        const { show, message, title } = this.props;

        return (
            //Contenedor dinamico de las paginas, sus hijos son todas las paginas del router app
            <div className="wrapper">

                {this.props.children}
                <SweetAlert
                    show={show}
                    title={title}
                    onConfirm={() => { this.props.showMessage('', false, '') }}
                    onCancel={this.onCancel}
                    customButtons={
                        <React.Fragment>
                            <button className="btn btn-default-pz " onClick={() => { this.props.showMessage('', false, '') }}>Entendido</button>
                        </React.Fragment>}>
                    {message}
                </SweetAlert>

            </div>

        );
    }

}



//-------------------------------Redux------------------------

function mapStateToProps(state) {
    const { show, message, type, title } = state.alerts;
    return { show, message, type, title };
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage

};


export default connect(mapStateToProps, mapDispatchToProps)(App);
