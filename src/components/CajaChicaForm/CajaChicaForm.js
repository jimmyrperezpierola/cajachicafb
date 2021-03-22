import React,{ Component } from 'react';
import './CajaChicaForm.css';
import { GiRhinocerosHorn } from 'react-icons/gi';

class CajaChicaForm extends Component {
    constructor(props) {
        super(props);
        // Create a ref to store the tbDetalle DOM element    
        this.tbDetalle = React.createRef();
        this.rbIngreso = React.createRef();
        this.rbEgreso =  React.createRef();
        this.rbBienes = React.createRef();
        this.rbServicios = React.createRef();
        this.rbResto = React.createRef();
        this.rbNc = React.createRef();
        this.nMonto = React.createRef();
        this.btSaveButton = React.createRef();

        let newDate = new Date(); 
        let date = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();

        const initialStateValues = {
            titleContainer: props.titleContainer,
            date: date,
            detail: "",
            tipoOperacion: "egreso",
            tipoCaja: "Bienes",
            amount : 0.00,
        };

        this.state = {                
            titleContainer: props.titleContainer,
            date: date,
            detail: "",
            tipoOperacion: "egreso",
            tipoCaja: "bienes",
            amount : 0.00,
        };
        this.onClickCard = this.onClickCard.bind(this);   
        this.toggle = this.toggle.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this.saveButton = this.saveButton.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setInitialValues = this.setInitialValues.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    onClickCard(file,fileTitle,fileContent,docId,event) {
        event.preventDefault();

        this.setState({
     
        });
        
        this.props.onClickCard(file, fileTitle, fileContent, docId);        
    }

    componentDidMount() {
        this.setInitialValues();

        // for (let x in this.refs) {
        //     this.refs[x].onkeypress = (e) =>    
        //       this._handleKeyPress(e, this.refs[x]);
        // }
        //this.refs.name.focus();
    }

    setInitialValues()
    {
        let newDate = new Date(); 
        let today = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();        

        this.setState({                
            titleContainer: "Caja Chica IO",
            date: this.today,
            detail: "",
            tipoOperacion: "egreso",
            tipoCaja: "bienes",
            amount : 0.00,
        });
    }

    // bindRefsToKeypress() {
    //     for (let x in this.refs) {
    //         this.refs[x].onkeypress = (e) => 
    //           this.onKeyPressed(e, this.refs[x]);
    //       }
    // }
    
    onKeyPressed(field, e) {        
        if(e.key === 'Enter') {
            //e.preventDefault();
            console.log('Enter ref: ' + this.refs[e]);
            this.refs[e].focus();
        }

        // if (e.keyCode === 13) {
        //     e.preventDefault(); // Prevent form submission if button present
        //     let next = this.refs[field.name].nextSibling;
      
        //     if (next && next.tagName === "INPUT") {
        //       this.refs[field.name].nextSibling.focus();
        //     }
        // }
    }

    _handleKeyPress(e, field) {
        if (e.keyCode === 13) {
          e.preventDefault();

          try {
                let next = this.refs[field.name].nextSibling;
                if (next && next.tagName === "INPUT") {
                    console.log('Focus Input ' + this.refs[field.name] + '-' + this.refs[field.name].nextSibling);
                    this.refs[field.name].nextSibling.focus();
                }  
          }
          catch(e)
          {
              console.log('error on Keypress:' + e);
          }
        }
    }

    handleKeyDown(event) {
        console.log('event:' + event);
        if (event.keyCode === 13) {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    }
    
    handleKeyPress(event) {
        const {name, value} = event.target;
        console.log('name: ' + name + ' - value:' + value);
        console.log('keycode:'+ event.keyCode);

        if (event.keyCode == 13) {   
            event.preventDefault();
            if(name == "fecha") {
                console.log('inside fecha');
                this.tbDetalle.current.focus(); //document.getElementById("detalle").focus();
            }
            else if (name == "detalle") {
                console.log('inside ingreso');
                this.rbIngreso.current.focus(); //document.getElementById("ingreso").focus();
            }
            else if (name == "operacion" && value == "ingreso") {
                console.log('inside bienes');
                this.rbBienes.current.focus(); //document.getElementById("bienes").focus();
            }
            else if (name == "operacion" && value == "egreso") {
                console.log('inside bienes');
                this.rbBienes.current.focus(); //document.getElementById("bienes").focus();
            }	
            else if (name == "tipo" && value == "bienes") {
				this.nMonto.current.focus(); //document.getElementById("monto").focus();
            }	
            else if (name == "tipo" && value == "servicios") {
				this.nMonto.current.focus(); //document.getElementById("monto").focus();
            }	
            else if (name == "tipo" && value == "resto") {
				this.nMonto.current.focus(); //document.getElementById("monto").focus();
            }	
            else if (name == "tipo" && value == "nc") {
				this.nMonto.current.focus(); //document.getElementById("monto").focus();
            }	
            else if (name == "monto") {
				this.btSaveButton.current.focus(); //document.getElementById("saveButton").focus();
            }	
            else if (name == "saveButton") {
                this.saveButton();      
                this.tbDetalle.current.focus();          
			}            
        }   
    }

    handleInputChange = e => {
        const {name, value} = e.target;
        // const name = e.target.name;
        // const value = e.target.value;
        
        // this.setState({
        //     [name]: value
        // });
        if(name == "fecha") {
            this.setState({date: e.target.value });   
        }
        else if(name == "detalle")
        {
            this.setState({detail: e.target.value });   
        }
        else if (name == "operacion")
        {
            this.setState({tipoOperacion: e.target.value });  
            if(value == "ingreso")
            {
                var ref= document.getElementById("ingreso");
                ref.value = value;
            }
            else
            {
                var ref= document.getElementById("egreso");
                ref.value = value;
            }
        }
        else if (name == "tipo")
        {
            this.setState({tipoCaja: e.target.value });  
        }                
        else if (name == "monto")
        {
            this.setState({amount: e.target.value });            
        }
    }

    saveButton(e) {
        e.preventDefault();
        this.props.addOrEdit(this.state.date,this.state.detail,this.state.tipoOperacion,this.state.tipoCaja,this.state.amount);
        this.setInitialValues();
        //  this.setState({
        //      [name]: value
        //  });        
    }

    // toggle = (type, value) => ({ key }) => {
    //     // [" ", "Enter"].includes(key) && dispatch({ type, value });    
    //     console.log('toggle:' + type + '-' + value);
    // }
    toggle(type, value) {        
        console.log('toggle:' + type + '-' + value);   
    }

    render() { 
        const { files } = this.props;        
        // const fields = files.map((field, index) =>                                        
        //                    <TextFile                                 
        //                         fileTitle={field.fileTitle} 
        //                         fileContent={field.fileContent} 
        //                         fileId={field.fileId}
        //                         docId={field.docId}
        //                         key={field.fileId} {...field}
        //                         viewLink= {"/text/" + field.fileId}
        //                         onClickCard = {this.onClickCard.bind(this,field.fileId, field.fileTitle, field.fileContent, field.docId)}
        //                    />)

        return ( 
            <div className="cajachica-content">    
                {/* {fields} */}
                <div className="box-date">
                    <div className="label-fecha">
                        <label htmlFor="lb-fecha">Fecha</label>
                    </div>
                    <input tabIndex="-1" type="date" name="fecha" onChange={this.handleInputChange} value={this.date} ref='fecha' onKeyDown={this.handleKeyPress}/>
                </div>
                {/* <input type="date" name="cumpleanios" step="1" min="2013-01-01" max="2013-12-31" value="2013-01-01"/> */}
                <div className="box-detalle">
                    <div className="dlv-detalle">
                        <label htmlFor="lb-detalle" className="lb-detalle">Detalle</label>
                    </div>                    
                    <input type="text" id="detalle" name="detalle" tabIndex="0" text="Detalle" placeholder="Detalle" onChange={this.handleInputChange} value={this.state.detail} onKeyDown={this.handleKeyPress}  ref={this.tbDetalle} />
                </div>
                
                <div className="box-tipo-operacion">
                    <p>Tipo de Operacion</p>
                    <span className="tipo-operacion">
                        <span>
                            <input type="radio" id="ingreso" name="operacion" value="ingreso" tabIndex="1" onChange={this.handleInputChange} onKeyDown={this.handleKeyPress} ref={this.rbIngreso}/>
                            <label htmlFor="ingreso">Ingreso</label>
                        </span>

                        <span className="tipo-operacion-space"/>

                        <span>
                            <input type="radio" id="egreso" name="operacion"  value="egreso" tabIndex="2" onChange={this.handleInputChange} onKeyDown={this.handleKeyPress} ref={this.rbEgreso} checked />
                            <label htmlFor="egreso">Egreso</label>
                        </span>
                    </span>
                </div>                

                <div className="box-tipo-caja">
                    <p>Seleccione el tipo de caja</p>
                    <span>
                        <input type="radio" id="bienes" name="tipo" value="bienes" tabIndex="3" onChange={this.handleInputChange} ref={this.rbBienes} onKeyDown={this.handleKeyPress} checked />
                        <label htmlFor="bienes">Bienes</label>
                    </span>
                    <span>
                        <input type="radio" id="servicios" name="tipo" value="servicios" tabIndex="4" onChange={this.handleInputChange} onKeyDown={this.handleKeyPress} ref={this.rbServicios} />
                        <label htmlFor="servicios">Servicios</label>
                    </span>
                    <span>
                        <input type="radio" id="resto" name="tipo" value="resto" tabIndex="5" onChange={this.handleInputChange} onKeyDown={this.handleKeyPress} ref={this.rbResto} />
                        <label htmlFor="resto">Resto</label>
                    </span>
                    <span>
                        <input type="radio" id="nc" name="tipo" value="nc" tabIndex="6" onChange={this.handleInputChange} onKeyDown={this.handleKeyPress} ref={this.rbNc}/>
                        <label htmlFor="nc">No Corresponde</label>
                    </span>
                </div>

                <div className="monto-io">
                    <label htmlFor="lb-importe">Importe</label>
                    <input type="number" id="monto" name="monto" tabIndex="7" onChange={ this.handleInputChange } value={this.state.amount}  step="1" onKeyDown={this.handleKeyPress} ref={this.nMonto} />
                </div>

                <div className="save-button">
                    <button type="button" id="saveButton" className="saveButton" onClick={this.saveButton} tabIndex="8" ref={this.btSaveButton}  onKeyDown={this.handleKeyPress}>Save</button>
                </div>
            </div>
         );
    }
}
 
export default CajaChicaForm;