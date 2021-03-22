import React, { Component } from 'react';
import CajaChicaForm from '../CajaChicaForm/CajaChicaForm';
import CajaChicaItems from '../CajaChicaItems/CajaChicaItems';

class CajaChica extends Component {
    state = {  }
    render() { 
        return (
            <>
                <CajaChicaForm/>
                <CajaChicaItems/>
            </>
          );
    }
}
 
export default CajaChica;
