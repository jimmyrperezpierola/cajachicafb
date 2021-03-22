import React, { useEffect,useState } from 'react';
import './CajaChicaItems.css';
import CajaChicaForm from '../CajaChicaForm/CajaChicaForm';
import firebase from 'firebase';
import 'firebase/firestore';
//import 'firebase/auth';
import {firebaseConection, firestore} from '../../config/firebase';
var db= {}; 

export default function CajaChicaItems() {  

    useEffect(() => {    
        firebaseConection();            
        db = firebase.firestore();                

        console.log('CajaChicaItems Getting data...');
        getItems();
    }, []);

    const [items, setItems] = useState([]);

    const getItems = async () => {
        // const querySnapshot = await db.collection('cajachica').get();
        db.collection('cajachica').onSnapshot((querySnapshot) => {
            const docs = [];           
            querySnapshot.forEach(doc => {
                docs.push({...doc.data(), id: doc.id});
            });
            setItems(docs);
        });
    };

    const saveTransaction =  async(date,detail,tipoOperacion,tipoCaja,amount) => {
        console.log('...::saveTransaction::...');        
        console.log('Fecha: ' + date);
        console.log('Detalle: ' + detail);
        console.log('TipoOperacion: ' + tipoOperacion);
        console.log('TipoCaja: ' + tipoCaja);
        console.log('Amount: ' + amount);

        await db.collection('cajachica').doc().set({
            date,
            detail,
            tipoOperacion,
            tipoCaja,
            amount
        });

        alert("Datos guardados !");        
    }

    return (
        <>
            <CajaChicaForm addOrEdit={saveTransaction}/>      
            <div className="container-cajachica">
                { items.map(i => ( 
                    <div className="card">
                        <div className="title">{i.tipoCaja}</div>
                        <span className="date">{i.date}</span>
                        <div className="detail">{i.detail}</div>
                        <span className="amount">{i.amount}</span>
                    </div>
                ))}
            </div>            
        </>
    )
}
