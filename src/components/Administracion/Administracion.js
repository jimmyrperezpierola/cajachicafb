import React, { Component } from 'react';
//import TextFile from '../TextFile/TextFile';
import './Administracion.css';

class Administracion extends Component {
    constructor(props) {
        super(props);
        this.state = {    
            filesSelected: [][2],
            titleContainer: props.titleContainer,
        };
        this.onClickCard = this.onClickCard.bind(this);           
    }

    onClickCard(file,fileTitle,fileContent,docId,event) {
        event.preventDefault();

        var selectedFiles= [];
        this.setState({
            filesSelected: selectedFiles
        });
        
        this.props.onClickCard(file, fileTitle, fileContent, docId);        
    }

    componentDidMount() {
        this.setState({titleContainer: "My Unit"});
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
            <div className="listTextFile">    
                {/* {fields} */}
                <h1>Hola Administracion ....</h1>
            </div>
         );
    }
}
 
export default Administracion;
