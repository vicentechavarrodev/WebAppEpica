import React, { Component } from 'react';
import Header from '../header/index';
import { connect } from 'react-redux';
import { alertActions } from '../alerts_message/actions';
import { withRouter } from "react-router-dom";
import { loader } from '../helpers/loader';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './style.scss';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class Pagina extends Component {


    constructor(props) {
        super(props);

        this.state = {
            list: [
                { name: 'Categoría 1' },
                { name: 'Categoría 2' },
                { name: 'Categoría 3' },
                { name: 'Categoría 4' },
                { name: 'Categoría 5' },
            ],
            selected: 'item1'

        };

       

    }

    componentDidMount() {

        

        loader.hide();

    }

    onSelect = key => {
        this.setState({ selected: key });
    }

    render() {

        const MenuItem = ({ text, selected }) => {
            return <div
                className={`menu-item ${selected ? 'active' : ''}`}
            >{text}</div>;
        };

      
         const Menu = (list, selected) =>
            list.map(el => {
                const { name } = el;

                return <MenuItem text={name} key={name} selected={selected} />;
            });


        const Arrow = ({ text, className }) => {
            return (
                <div
                    className={className}
                >{text}</div>
            );
        };

        const ArrowLeft = Arrow({ text: <ArrowBackIosIcon />, className: 'arrow-prev' });
        const ArrowRight = Arrow({ text: <ArrowForwardIosIcon />, className: 'arrow-next' });

        this.menuItems = Menu(this.state.list, this.state.selected);

        return (
            <div className="wrapper ">
                <Header visiblePagina="true" />
             

                <div id="content" >
                    <ScrollMenu
                        alignCenter={true}
                        alignOnResize={true}
                        data={this.menuItems}
                        arrowLeft={ArrowLeft}
                        arrowRight={ArrowRight}
                        selected={this.state.selected}
                        onSelect={this.onSelect}
                        scrollBy={1}
                        scrollToSelected={true}
                        transition={1}
                        clickWhenDrag={false}
                    
                    />

                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, user } = state.authentication;
    const { esPrincipal } = state.ventanaPrincipalReducer;
    return { loggingIn, user, esPrincipal };
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,

};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pagina));