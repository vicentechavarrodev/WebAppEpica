import { ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import React, { Component } from 'react';

export default class CustomToolbar extends Component {
    render() {
        return (<ToolbarComponent>
            <div>
                <div><button class='e-btn e-tbar-btn'>Cut</button> </div>
                <div><button class='e-btn e-tbar-btn'>Copy</button> </div>
                <div><button class='e-btn e-tbar-btn'>Paste</button> </div>
                <div class='e-separator'> </div>
                <div><button class='e-btn e-tbar-btn'>Bold</button> </div>
                <div><button class='e-btn e-tbar-btn'>Italic</button> </div>
            </div>
        </ToolbarComponent>);
    }
}
