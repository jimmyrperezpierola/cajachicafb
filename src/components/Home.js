import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import './Home.css';
    import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
 //import CajaChica from './CajaChica/CajaChica';
import CajaChica from './CajaChicaItems/CajaChicaItems';
 //import CajaChicaForm from './CajaChicaForm/CajaChicaForm';
    //import SharedFilesWithMe from './ShareFilesWithMe/SharedFilesWithMe';
    //import NewFile from './NewFile/NewFile';
//import MyUnitTitle from './MyUnitTitle/MyUnitTitle';
import NoMatch from './NoMatch';
import Administracion from './Administracion/Administracion';
    //import TextDetail from './TextDetail/TextDetail';
    //import TextShareDetail from './TextShareDetail/TextShareDetail';
    //import Logo from './Header/Logo/Logo';
    //import Search from './Header/Search/Search';
import Account from './Header/Account/Account';
    //import ButtonNew from './Contained/SideMenu/ButtonSide/ButtonNew';
import * as ROUTES from '../constants/routes';
import {firebaseConection} from '../config/firebase';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';
//import Administracion from './pages/Administracion/Administracion';
var db= {}; 

const logo= 'https://www.sketchappsources.com/resources/source-image/googledrive_logo.png';
const srcButtonNew= 'https://icon-library.net/images/plus-icon-transparent/plus-icon-transparent-0.jpg';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            filesShared: [],
            filesSelected: [],
            titleContainer: '',
            uid: '',
            email:'',
            isClickedCard: false,
            fileIdSelect:{},
            fileTitle: '',
            fileContent:'',
            docId: '',
            // isSignedIn: this.props.location.state.isSignedIn,
            isSignedIn: true
        };		     
        this.logout = this.logout.bind(this);        		
        this.addNewFile = this.addNewFile.bind(this);
        this.getUserId = this.getUserId.bind(this);
        this.getFileNumber = this.getFileNumber.bind(this);
        this.onClickCard = this.onClickCard.bind(this);
        this.handleShareFile = this.handleShareFile.bind(this);
        this.sharedFiles = this.sharedFiles.bind(this);
        this.onDownloadFile = this.onDownloadFile.bind(this);
        this.loadFiles = this.loadFiles.bind(this);
        this.onSaveTextDetail = this.onSaveTextDetail.bind(this);
        this.onSaveTextShareDetail = this.onSaveTextShareDetail.bind(this);
        this.showToast = this.showToast.bind(this);
        console.log('calling home/constructor');
        firebaseConection();            
        //Setting Up Db connection to firestore 
        db = firebase.firestore();     
    }

    showToast = (type, message) => {
        // 0 = warning, 1 = success
        switch (type) {
            case 0:
                toast.warning(message)
                break
            case 1:
                toast.success(message)
                break
            default:
                break
        }
    }

	componentDidMount() {
        console.log('componentDidMount on Home');        
            firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({isSignedIn: !!user, 
                uid: firebase.auth().currentUser.uid ,
                email: firebase.auth().currentUser.email});
       
                document.getElementById('landingItem').style.display = 'none';    
                if (this.state.isSignedIn && (firebase.auth().currentUser != null)) {
                    this.loadFiles();        
                    //this.sharedFiles();
                }    
            } else {
                // No user is signed in.
                //alert('No user is signed in');
                console.log('No user is signed in');
            }                
        });
    }

    componentWillUnmount() {
        //TODO: unsuscribe snapshot
        //db = null;
    }    

    loadFiles() {
        console.log('loadFiles...');
        let listFiles = [];
        // document.getElementById('shareIcon').style.display = 'none';     
        // document.getElementById('downloadFile').style.display = 'none';               
       
        const scope= this;        
        // db.collection('gdrive').doc(scope.getUserId()).collection('files').get()
        // .then(snapshot => {
        //     const values = snapshot.docs.map(scope.filesDoc);
        //     values.map(file => {
        //         listFiles.push({
        //             fileId: file.fileId,
        //             fileTitle: file.fileTitle,
        //             fileContent: file.fileContent,
        //             docId: file.docId               
        //          });     
        //     });
        //     this.setState({files: listFiles});
        // });                       
    }

    sharedFiles() {
        const scope= this;        
        let shareCol = [];
        let fileCol = [];
        console.log('..::shareFiles::..');
         
        db.collection('gdrive')
        .get() 
        .then(function(snapshot) {
            snapshot.docs.forEach(doc => {
                shareCol.push(doc.id);
            });
        })
        .then(function(snapshot) {
            shareCol.map(f => {                                  
                    db.collection('gdrive').doc(f).collection('files').where("share_with", "array-contains", scope.getEmail()) 
                    .get() 
                    .then(function(snapshot) {                      
                         snapshot.docs.forEach(doc => {
                                //fileCol.push(doc.data().docId);
                                fileCol.push({
                                    fileId: doc.data().fileId,
                                    fileTitle: doc.data().fileTitle,
                                    fileContent: doc.data().fileContent,
                                    docId: doc.data().docId
                                });                                 
                         });
                         scope.setState({filesShared: fileCol});                                                                                   
                    })
                    .catch(function (error) {
                        console.error('shared-Files-', error);
                    });   
            });            
        })
        .catch(function (error) {
            console.error('Getting shared function-', error);
        });
    }    
    
    filesDoc(doc) {
        return {id: doc.id, ...doc.data()};
    }	

    getUserId() {
        console.log('getUserId/this.state.uid:' + this.state.uid);
        return this.state.uid;
    }

    getEmail() {
        console.log('getEmail/My email:' + this.state.email);
        return this.state.email;
    }

    getFileNumber() {
        return this.state.files.length;
    }

    onSaveTextDetail(fileContent, docId) {
        console.log('onSaveTextDetail:' + fileContent + '  id:' + docId);
        const scope= this;          

        let filesCollection =
        db.collection('gdrive').doc(scope.getUserId())
          .collection('files');

          filesCollection
          .doc(docId.toString())
          .update({
              fileContent: fileContent            
          })
          .then(function () {
              scope.showToast(1, 'Document updated successfuly!'); 
              let nullArray=[];
              scope.setState({files: nullArray});
              scope.loadFiles();             
          })
          .catch(function (error) {
              console.error('Error updating document: ', error);
              scope.showToast(0, error);
          });        
    }

    onSaveTextShareDetail(fileContent, id) {
        console.log('onSaveTextShareDetail Home');
    }

    addNewFile=(title, content) => {
        const newFiles = {
           fileTitle: title,
           fileContent: content,
           fileId: this.state.files.length +1,
           key: this.state.files.length +1
        }
        this.setState({
            files: [...this.state.files, newFiles]
        })

        const scope= this;
        let db = firebase.firestore();

        db.collection("gdrive").doc(scope.getUserId()).set({
             email: scope.getEmail()
        })
        .then(function() {
            console.log('email added');
        })
        .catch(function(error) {
             console.error("Error writing Uid document: ", error);
        });

         const ref = db.collection("gdrive").doc(scope.getUserId()).collection("files").doc();
         const docId = ref.id;

        let filesCollection =
        db.collection('gdrive').doc(scope.getUserId())
          .collection('files');

          let numDoc = scope.getFileNumber() +1;

          filesCollection
          .doc(docId.toString())
          .set({
              fileId: scope.getFileNumber() +1,
              fileTitle: title,
              fileContent: content,
              owner: scope.getEmail(),
              docId: docId             
          })
          .then(function () {
              console.log('Document added!');
              scope.showToast(1, 'NewFile Saved!');               
          })
          .catch(function (error) {
              console.error('Error adding document: ', error);
              scope.showToast(0, error); 
          });
    }

    onClickCard(id, fileTitle, fileContent, docId) {  
        this.setState({fileIdSelect: id});    
        this.setState({fileTitle: fileTitle});    
        this.setState({fileContent:fileContent});    
        this.setState({docId: docId});

        document.getElementById('shareIcon').style.display = 'contents';   
        document.getElementById('downloadFile').style.display = 'contents';        
    }

    handleShareFile() {
        console.log('handleShareFile');
    }

    onDownloadFile() {
        console.log('onDownloadFile');
        const _fileTitle= this.state.fileTitle;
        const _fileContent= this.state.fileContent;

        const element = document.createElement("a");
        const file = new Blob([new TextEncoder().encode(_fileContent)],{type:'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = _fileTitle + ".txt";
        document.body.appendChild(element); 
        element.click();                
    }

    logout() {
        console.log('Process logout...');
        firebase.auth().signOut();
        // document.getElementById('idLogin').style.display = 'block';    
        // document.getElementById('idContainer').style.display = 'none';              
        //this.props.history.push("/");                  
    }

    render() {
        if (this.state.isSignedIn && (firebase.auth().currentUser != null)) {     

        return (
            <div className="container" id="idContainer">
				<div className="header">
                    {/* <Logo src={logo}/> */}
                    {/* <Search/> */}
                    <div className="configuration">
                        <button className="logout"  onClick = {() => {firebase.auth().signOut()}}>Logout</button>
                        <span>
                            <label htmlFor="welcome">Bienvenido {this.state.email}</label>
                        </span>
                    </div>
                    <Account src={ firebase.auth().currentUser ? firebase.auth().currentUser.photoURL : ""}/>
				</div>  
                <hr />                          
                <div className="contained"> 
                    <Router>
                    <div className="SideMenu">
                        <div className="buttonSide">
                                <Link to={'/newfile'} className="nav-link">
                                    {/* <ButtonNew srcButtonNew={srcButtonNew}/>                                     */}
                                </Link>                       
                        </div>
                        <div className="itemsSide">
                                <ul>
                                    <li><i className="fas fa-home"></i><Link underline='none' to={ROUTES.HOME} className="nav-link">Caja Chica</Link></li>
                                    <li><i className="fas fa-user-friends"></i><Link underline='none' to={ROUTES.ADMINISTRACION} className="_nav-link">Administracion</Link></li>
                                    <li><Link to="/">Login</Link></li>
                                </ul>
                        </div>
                    </div>
                    <div className="SectionContent">  
                        {/* <MyUnitTitle titleContainer={this.state.titleContainer} isClickedCard={this.isClickedCard} uid={this.state.uid} fileIdSelect={this.state.fileIdSelect} docId={this.state.docId} handleShareFile={this.handleShareFile} onDownloadFile={this.onDownloadFile} showToast={this.showToast} /> */}
                        <div className="myUnitContent">
                            <ToastContainer
                                autoClose={2000}
                                hideProgressBar={true}
                                position={toast.POSITION.BOTTOM_RIGHT}
                            />                             
                                    <Switch>
                                        <Route exact path="/home" render={() => {
                                            return <CajaChica files={this.state.files} titleContainer={this.state.titleContainer} fileTitle={this.props.fileTitle} fileContent={this.state.fileContent} docId={this.state.docId} filesSelected={this.state.filesSelected} isClickedCard={this.state.isClickedCard} onClickCard={this.onClickCard} /> }}>             
                                        </Route>
                                        <Route exact path="/administracion" render={() => {
                                            return <Administracion files={this.state.files} titleContainer={this.state.titleContainer} fileTitle={this.props.fileTitle} fileContent={this.state.fileContent} docId={this.state.docId} filesSelected={this.state.filesSelected} isClickedCard={this.state.isClickedCard} onClickCard={this.onClickCard} /> }}>             
                                        </Route>

                                        {/* <Route path='/sharedfileswithme' render= {() => {                                           
                                            return <SharedFilesWithMe filesShared={this.state.filesShared} email={this.state.email} uid={this.state.uid} titleContainer={this.state.titleContainer} onClickCardShare={this.onClickCardShare} /> }}>
                                        </Route>
                                        <Route path='/newfile' render= {() => {
                                            return <NewFile addNewFile={this.addNewFile}/> }}>
                                        </Route>
                                        <Route path="/text/:id" render={props => {
                                            return <TextDetail files={this.state.files} id={props.match.params.id}  onSaveTextDetail={this.onSaveTextDetail} fileContent={this.props.fileContent} fileId={this.props.fileId} docId={this.props.docId} />
                                        }} />                                                                                
                                        <Route path="/textshared/:id" render={props => {
                                            return <TextShareDetail filesShared={this.state.filesShared} id={props.match.params.id} onSaveTextShareDetail={this.onSaveTextShareDetail} />
                                        }} />     */}
                                        <Route component={NoMatch}/> 
                                    </Switch>                                   		                                   		
                        </div>
                    </div>                
                    </Router>
                </div>				                
            </div>
        );
        } else {
            console.log('calling Redirect to LadingPage');
            // return <Redirect to="/" />
            return(
                <div>
                    <br/> <br/>
                    <h1>Home Page</h1>
                    <Link to="/">Login</Link>
                </div>                
            );
        }
    }
}

export default Home;