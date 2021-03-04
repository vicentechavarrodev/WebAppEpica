import React, { Component } from 'react';


class Content extends Component {

     
    render() {
        const { DynamiContent } = this.props;
       
        return (
             //Contenedor dinamico de los formularios y pantallas 
            <div className="jumbotron container-fluid table-responsive">
                {DynamiContent}
            </div>

        );
    }

}


export default Content;
