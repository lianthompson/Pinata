import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import Chart from './components/Chart';


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import 'bootstrap/dist/css/bootstrap.min.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SkillDetails from './components/SkillDetails';
import AutoCompleteText from './components/AutoCompleteText';
import SkillsGrid from './components/SkillsGrid';
import CriticalSkillsGrid from './components/CriticalSkillsGrid'
import RecordsList from './components/RecordsList'
import RecordsListUpdate from './components/RecordsListUpdate'
import FormBlank from './components/FormBlank';

import AfterLvlPrompt from './components/AfterLvlPrompt';
import Landing from './components/Landing';

import Callback from './Callback';
import Sidenavbar from './components/Sidenavbar';
import SIResources from './components/SIResources';
import UpdateModal from './components/UpdateModal';
import MySlider from './components/MySlider';
import CustomSkillList from './components/CustomSkillList';
import MakeCustomSkill from './components/MakeCustomSkill';
import Search from './components/Search';



const http = require('http');
const fetch = require('node-fetch');

class App extends Component {
  state = { 
    customSkillsList:[
    
    ],
    searchList:[],
    key:'feeling',
    query:'Sad',
    test:'fail',
    modalShow: false,
    recordModalShow: false,
    skillsList:[],
      user_info:[],
      record_id:'',
      before_lvl:'',
      after_lvl:'',
      impact:null,
      emotion:'',
      emotion_id:'',
      skill_id:'',
      skill_icon:'',
      skill_title:'',
      skill_details:'',
      si:'',
      sh:'',
      recordsList : [],
      userSkillsArray : [],
      emotionSkillsArray : [],
      skillsGridArray : [],
      resEmotionId:'',
      has_prompted:0,
      prompt_record:{},
      pinata :   {
        "skill_title": "piñata",
        "skill_details": "Lorium sermpra filler text is filling the text sapce.",
        "skill_icon": "https://s3-us-west-2.amazonaws.com/pinata-images/icons/wildcard2.png",
        "skill_id": 0
      },

      emotionsArray:[
        {
          "emotion_id": 1,
          "emotion_text": "test emotion);\n"
        },
        {
          "emotion_id": 2,
          "emotion_text": "test emotion"
        },
        {
          "emotion_id": 3,
          "emotion_text": "Angry"
        },
        {
          "emotion_id": 4,
          "emotion_text": "Sad"
        },
        {
          "emotion_id": 5,
          "emotion_text": "Depressed"
        },
        {
          "emotion_id": 6,
          "emotion_text": "Isolated"
        },
        {
          "emotion_id": 7,
          "emotion_text": "Lonely"
        },
        {
          "emotion_id": 8,
          "emotion_text": "Scared"
        },
        {
          "emotion_id": 9,
          "emotion_text": "Hopeless"
        }
      ],

      baseSkillsArray:[]
    
  }
  

 

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // set state to back up in local storage 
    this.setState(JSON.parse(localStorage.getItem('backup')))
  }

  saveStateToLocalStorage() {
    localStorage.setItem('backup', JSON.stringify(this.state))
  }

  
  getUserInfo = (auth0_id, first_name, last_name) => {
    
    let url = `http://localhost:3001/api/user?auth0_id=${auth0_id}`
    
    if (auth0_id ){
      fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json'}
      })
      .then(res => res.json())
      .then(json => {
        if (json.length>0) { 
          console.log(json);
          this.setState({user_id:json[0].user_id}, 
          ()=> this.getCustomSkills()
          ); 
          // localStorage.setItem( 'user_id', json[0].user_id )
        }else{
        this.makeNewUser(auth0_id, first_name, last_name);
        console.log('Welcome new user!')}
      })      // .then(json => {return json[0].emotion_id})
      .catch(function(e) {console.log(e);
      })
    }
  }

  getBaseSkills = () => {
    if (this.state.user_id){
      let url = `http://localhost:3001/api/baseskills`
      console.log(url)
      fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(json => this.setState({baseSkillsArray: json}, () => this.setSkillsTypeahead()))
        .catch(function(e) {console.log(e)})
    }else {console.log('user id req.')}
  }

  setSkillsTypeahead = () => {
    let skillsTypeahead = [];
    for( let i=0; i< this.state.baseSkillsArray.length;i++){
      skillsTypeahead.push(this.state.baseSkillsArray[i].skill_title)
    }
    for(let i=0; i< this.state.customSkillsList.length;i++){
      skillsTypeahead.push(this.state.customSkillsList[i].skill_title)
    }
    this.setState({skillsTypeahead}, () => this.getPromptRecord(this.state.auth0_id))
  }

   getCustomSkills = () => {
  
    if (this.state.user_id){
      let url = `http://localhost:3001/api/customskills?user_id=${this.state.user_id}`
      console.log(url)
      fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(json => this.setState({customSkillsList: json}, () => this.getBaseSkills()))
        .catch(function(e) {console.log(e)})
    }else {console.log('user id req.')}
  }

  getPromptRecord = (auth0_id) => {
    
    let url = `http://localhost:3001/api/promptRecord?auth0_id=${auth0_id}`
    if (this.state.user_id && this.state.user_id!==''){
      fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(json => this.setPromptRecord(json))
        .catch(function(e) {console.log(e)}) 
    }else {console.log(`user id is required`)}
  }

  setPromptRecord = (record) => {  
    if (record.length>0 
      && !this.state.has_prompted
      ){
      this.setState({
        has_prompted:true,
        prompt_record: record[0]
      }
      , ()=>{ window.location='/finish'}
      );
    } 
  }

  recentRecord = (json) => {
  let url = `http://localhost:3001/api/mostRecentRecord?user_id=${json[0].user_id}`
    if (json[0].user_id && json[0].user_id!==''){
      fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(json => this.getRecentRecord(json))
        .catch(function(e) {console.log(e)}) 
    }else {console.log(`user id is required`)}
  }

  getRecentRecord = (record) => {
    this.setState({
      recentRecord: record
    });
    if (record.length>0 && this.state.prompt_count===0){
      this.state.prompt_count+=1;
      window.location='/'; 
    }
  }


  newRecord = () =>{
    let url = `http://localhost:3001/api/newRecord?user_id=${this.state.user_id}`
      if (this.state.user_id && this.state.user_id!==''){
        fetch(url, {
          method: 'get',
          headers: { 'Content-Type': 'application/json'}
          })
          .then(res => res.json())
          .then(json => this.getNewtRecord(json))
          .catch(function(e) {console.log(e)}) 
      }else {console.log(`user id is required`)}
  }

  getNewRecord = (record) => {
    this.setState({
    newRecord: record
    });
  }



  selectRecord =(record) => {
    console.log('in record select')
    this.setState({  
    update_record_id:record.record_id,
    update_before_lvl:record.before_lvl,
    update_after_lvl:record.after_lvl,
    update_emotion:record.emotion_text,
    update_emotion_id:record.emotion_id,
    update_skill:record.skill_title,
    update_skill_id:record.skill_id,
    update_si:record.si,
    update_sh:record.sh,
    update_date:record.date  

  },this.recordClicked(),console.log('after recordClicked'))
  }

  recordClicked=()=>{ 
    console.log(this.state.update_record_id, this.state.update_before_lvl, this.state.update_date)
    this.setState({
      recordModalShow:true
    })
      
  }
  
  recordModalClose = () =>{
    this.setState({recordModalShow:false}, this.getUserRecords)
  }



  setRecord_id=(record_id) => {
    console.log('app 215 sent',record_id)
    this.setState({record_id:record_id})
    console.log('app 217 state ',this.state.record_id)
  }


  getUserRecords = () => {
    if (this.state.user_id){
      let url = `http://localhost:3001/api/userRecords?user_id=${this.state.user_id}`
      console.log(url)
      fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json'}
        })
        .then(res => res.json()).then(json => this.setState({recordsList: json})).catch(function(e) {
        console.log(e); // “oh, no!”
      })
    }else {console.log('user id req.')}
  }

  searchByQuery = (key, query) => {
    let url;
    if(key === 'critical'){
      url = `http://localhost:3001/api/search/critical?user_id=${this.state.user_id}`
    }else{
      url = `http://localhost:3001/api/search/${key}?user_id=${this.state.user_id}&keyword=${query}`
    }
    

    console.log(`the url is ${url}`)
    fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      // .then(json => console.log(json))
      .then(json => this.setState({
        searchList: json
      }, console.log('search results?',this.state.searchList)))
      .catch(e => {
        console.log(`fetch failed`)
      })
    
    console.log(' app state searchList', this.state.searchList)
  }


  updateRecord = (record_id, before_lvl, after_lvl) => {
    if(record_id!==''&& before_lvl!=='' && after_lvl!==''){
      let url = `http://localhost:3001/api/userRecords?record_id=${record_id}`
      let update = {
        before_lvl: parseInt(before_lvl),
        after_lvl: parseInt(after_lvl)
      }
      console.log('app 371 update',update)
      fetch(url, {
        method: 'put',
        body: JSON.stringify(update),
        headers: { 'Content-Type': 'application/json'}
      })
      // .then(r => r.json())
      // .then(json=>{this.setState({recent_record:json}); console.log(json); return json})
      .catch(function(e) {console.log(`something is wrong ${e}`)})
    }else{(console.log(`missing record_id or lvls`))}
  }

  addSkillToRecord = (skill_id) => {
      if (!this.state.recent_record.skill_id){
        let url = `http://localhost:3001/api/setSkill`
        let body = {
          record_id:this.state.recent_record.record_id,
          skill_id:this.state.skill_id
        }
        console.log(body)
        fetch(url, {
          method: 'put',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json'}
        })
        .then(r => r.json())
        // .then(json=>{ console.log(json); return json})
        .then(json=>{this.setState({recent_record:json.record}); console.log(json); return json})
        .catch(function(e) {console.log(`something is wrong ${e}`)})
      }else{
        this.makeNewRecordWithSkill();
      }
}

  makeNewRecordWithSkill  = () => {
    
    console.log('grid 40 newRecord')
 
    let url = `http://localhost:3001/api/recordwithskill`            
    let record = 
      {
      before_lvl:this.state.recent_record.before_lvl,
      emotion_id:this.state.recent_record.emotion_id,
      si:this.state.recent_record.si,
      sh:this.state.recent_record.sh,
      user_id:this.state.recent_record.user_id,
      date: Math.round((new Date()).getTime() / 1000),
      skill_id:this.state.skill_id
      };       
    fetch(url, {
      method: 'post',
      body: JSON.stringify(record),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(r => r.json())
    .then(json=>{this.setState({recent_record:json.record}); return json})
    .catch(function(e) {console.log(`something is wrong! : ${e}`); })           
  }

  addFullRecord = (skill_id,emotion_id, before_lvl, after_lvl,si,sh, date) => {
    let url = `http://localhost:3001/api/fullRecord`

    let newRecord = 

      {
      skill_id,
      emotion_id,
      before_lvl,
      after_lvl,
      si,
      sh,
      user_id:this.state.user_id,
      date,
      impact: before_lvl - after_lvl
      }

    fetch(url, {
      method: 'post',
      body: JSON.stringify(newRecord),
      headers: { 'Content-Type': 'application/json'}
      
      })
    .catch(function(e) {console.log(`something is wrong! : ${e}`); })

  }


 

  getUserSkills = () => {
    if (this.state.user_id && this.state.emotion){   
      let url = `http://localhost:3001/api/userSkills?user_id=${this.state.user_id}&emotion=${this.state.emotion}`

      fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(json => this.setState({userSkillsArray: json}))
        .catch(function(e) {
        console.log(e); // “oh, no!”
      })
    }else {console.log('user id and emotion required')}
  }

  getEmotionSkills = () => {
    let url = `http://localhost:3001/api/emotionSkills?emotion=${this.state.emotion}`
    fetch(url, {
      method: 'get',
      headers: { 'Content-Type': 'application/json'}
      })
      .then(res => res.json()).then(json => this.setState({emotionSkillsArray: json})).catch(function(e) {
      console.log(e); // “oh, no!”
    })
  }



  getSkillsGrid = () => {
  
   this.setState({skillsGridArray:[]}, 
    this.makeSkillsGrid()
    )
   }

    makeSkillsGrid = () => {
      console.log('made it to make')
      let idx;
      let target;
    // add user skills 
    while (this.state.skillsGridArray.length < 3) {
      if (this.state.skillsGridArray.length === 1) {
        this.state.skillsGridArray.push(this.state.pinata)
      } else if (this.state.userSkillsArray.length > 0) {
        idx = Math.floor((Math.random() * this.state.userSkillsArray.length))
        target = this.state.userSkillsArray[idx]
        console.log('make 545', target)
        this.state.skillsGridArray.push(target)
        if (this.state.emotionSkillsArray){
          this.state.emotionSkillsArray = this.state.emotionSkillsArray.filter(e => e.skill_id !== target.skill_id)};
          this.state.baseSkillsArray = this.state.baseSkillsArray.filter(e => e.skill_id !== target.skill_id);
          this.state.userSkillsArray = this.state.userSkillsArray.filter(e => e.skill_id !== target.skill_id);

      } else {
        idx = Math.floor((Math.random() * this.state.baseSkillsArray.length))
        target = this.state.baseSkillsArray[idx]
        this.state.skillsGridArray.push(target)
        if (this.state.emotionSkillsArray){
          this.state.emotionSkillsArray = this.state.emotionSkillsArray.filter(e => e.skill_id !== target.skill_id)};
          this.state.emotionSkillsArray = this.state.emotionSkillsArray.filter(e => e.skill_id !== target.skill_id);
          this.state.baseSkillsArray = this.state.baseSkillsArray.filter(e => e.skill_id !== target.skill_id);
      }
    }

    // add emotion skills 

    while (this.state.skillsGridArray.length < 6) {
      if (this.state.emotionSkillsArray && this.state.emotionSkillsArray.length > 0) {
        idx = Math.floor(Math.random() * this.state.emotionSkillsArray.length)
        target = this.state.emotionSkillsArray[idx]
        this.state.skillsGridArray.unshift(target)
        console.log(`${target} emotion`)
        this.state.emotionSkillsArray = this.state.emotionSkillsArray.filter(e => e.skill_id !== target.skill_id);
        this.state.baseSkillsArray = this.state.baseSkillsArray.filter(e => e.skill_id !== target.skill_id);

      } else {
        idx = Math.floor(Math.random() * this.state.baseSkillsArray.length)
        target = this.state.baseSkillsArray[idx]
        this.state.skillsGridArray.unshift(target)
        this.state.baseSkillsArray = this.state.baseSkillsArray.filter(e => e.skill_id !== target.skill_id);
      }
    }
    // add base skills 
    while (this.state.skillsGridArray.length < 9) {
      idx = Math.floor(Math.random() * this.state.baseSkillsArray.length)
      target = this.state.baseSkillsArray[idx]
      this.state.skillsGridArray.push(this.state.baseSkillsArray[idx])
      this.state.baseSkillsArray = this.state.baseSkillsArray.filter(e => e.skill_id !== target.skill_id);
    }

  }
   

  getEmotionId =(emotion) => {
    if (emotion!==''){
      let url = `http://localhost:3001/api/emotion_id?emotion_text=${emotion}`
      console.log(url)
      fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json'}
        })
        .then(res => res.json()).then(json => {return json[0].emotion_id}).catch(function(e) {
        console.log(e); // “oh, no!”
      })
    } else {console.log('emotion required')}
  }


  skillClicked=(skill_id, skill_icon, skill_details, skill_title)=>{ 
    this.setState({
      skill_id:skill_id, 
      skill_icon:skill_icon, 
      skill_details:skill_details, 
      skill_title:skill_title, 
      modalShow: true}, 
      // recordModalShow
      ()=> {console.log(skill_icon)
    })
  }

 


  myCallback= (skillsGridArray, recent_record, criticalSkills, userSkillsArray, emotionSkillsArray, baseSkillsArray, si, sh, before_lvl)=>{
    this.setState({skillsGridArray, recent_record, criticalSkills, userSkillsArray, emotionSkillsArray, baseSkillsArray, si, sh, before_lvl}, () =>{
      let grid;

        if (si){
            grid = '/suicideprevention'
        } else if (before_lvl>6){
            grid='/criticalgrid'
        } else {
            grid = '/grid'
        }
        window.location=grid;
    })

  }

  showModalCallback = () =>{
    this.setState({modalShow:false, skill_id:'', skill_details:'', skill_icon:''})
  }

  userIdCallback= (json)=>{
    this.setState({user_id:json.user_id})
  }


  makeNewUser =  (auth0_id, first_name, last_name) =>{
    let url = `http://localhost:3001/api/user`
    let body = {
      auth0_id, 
      first_name,
      last_name
    }

    fetch(url, {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json'}
      
    })
    .catch(function(e) {console.log(`something is wrong! : ${e}`); })
  }


  render() {

    let modalClose = () => console.log('app 469');
    return (
      
      <MuiThemeProvider>
        <Router>
        
          <div className="main">
          <div className='background'>

          <Route path="/callback" exact 
            component={Callback}
          />
          
          <Route path="/" render = { props =>(
             this.props.auth.isAuthenticated() 
             ? <React.Fragment>
                 
                 <Sidenavbar
                  {...this.props}{...props} 
                  user_id ={this.props.user_id} 
                  getUserInfo={this.getUserInfo}  
                  userIdCallback= {this.userIdCallback}
                  getPromptRecord = {this.getPromptRecord}
                  />  
             </React.Fragment>
             :
             <React.Fragment>
                  <Landing 
                 {...this.props}{...props} 
                 user_id ={this.props.user_id} 
                 getUserInfo={this.getUserInfo}  
                 userIdCallback= {this.userIdCallback}
                 getPromptRecord = {this.getPromptRecord}
               />   
                    
             </React.Fragment>     
            )} />         

              <Route path="/" exact render = { props =>(
                this.props.auth.isAuthenticated() 
                ? <React.Fragment>
                   <Landing 
                 {...this.props}{...props} 
                 user_id ={this.props.user_id} 
                 getUserInfo={this.getUserInfo}  
                 userIdCallback= {this.userIdCallback}
                 getPromptRecord = {this.getPromptRecord}
               />       

             </React.Fragment>
             :
             <React.Fragment>
             </React.Fragment>     
            )} />  

          

         <Route path="/feeling" exact render = { props =>(
            this.props.auth.isAuthenticated() 
            ?
            <React.Fragment>
                
                <div style={{ paddingTop:'50px', margin:'0 auto'}}>

                  <AutoCompleteText 
                  myCallback = {this.myCallback} 
                  baseSkillsArray={this.state.baseSkillsArray}  
                  customSkillsArray= {this.state.customSkillsList}
                  user_id= {this.state.user_id}/>   
                </div>
                
              </React.Fragment>
              :
              <React.Fragment>
                  <Landing 
                    {...this.props}{...props} 
                    user_id ={this.props.user_id} 
                    getUserInfo={this.getUserInfo}  
                    userIdCallback= {this.userIdCallback}
                    getPromptRecord = {this.getPromptRecord}
                  />
              </React.Fragment>
            )}
          />



          <Route path="/custom" exact render = { props =>(
            this.props.auth.isAuthenticated() 
            ?
            <React.Fragment>
                
                <div style={{ paddingTop:'50px', margin:'0 auto'}}>

                  <CustomSkillList 
                    getCustomSkills={this.getCustomSkills}
                    customSkillsList={this.state.customSkillsList}
                    user_id= {this.state.user_id}
                  />   
                </div>
                
              </React.Fragment>
              :
              <React.Fragment>
                 
              </React.Fragment>
            )}
          />

          <Route path="/custom/new" exact render = { props =>(
            this.props.auth.isAuthenticated() 
            ?
            <React.Fragment>
                
                <div style={{ paddingTop:'50px', margin:'0 auto'}}>

                  <MakeCustomSkill
                    getCustomSkills={this.getCustomSkills}
                    customSkillsList={this.state.customSkillsList}
                    user_id= {this.state.user_id}
                  />   
                </div>
                
              </React.Fragment>
              :
              <React.Fragment>
          
              </React.Fragment>
            )}
          />




          <Route exact path="/grid" exact render = { props =>(
            this.props.auth.isAuthenticated() 
            ? 
            <React.Fragment>
              <div className = 'skillsGrid'>

                <SkillDetails 
                updateRecord = {this.updateRecord}
                newRecord={this.newRecord}
                addSkillToRecord = {this.addSkillToRecord}
                recent_record = {this.state.recent_record}
                user_id={this.state.user_id} 
                skill_title={this.state.skill_title} 
                skill_icon = {this.state.skill_icon}
                skill_details={this.state.skill_details}  
                skill_id = {this.state.skill_id} 
                show={this.state.modalShow}
                showModalCallback={this.showModalCallback}
                {...this.props} 
                {...props}             
                />
              <SkillsGrid  
              getSkillsGrid = {this.getSkillsGrid}
              user_id = {this.state.user_id}
              newRecord={this.newRecord}
              addSkillToRecord = {this.addSkillToRecord}
              skillClicked = {this.skillClicked} 
              userSkillsArray = {this.state.userSkillsArray} 
              emotionSkillsArray={this.state.emotionSkillsArray} 
              customSkillsArray= {this.state.customSkillsList}
              baseSkillsArray={this.state.baseSkillsArray} 
              skillsGridArray={this.state.skillsGridArray}
              setRecord_id = {this.setRecord_id}
              getRecentRecordWithoutSkill = {this.getRecentRecord}
              recent_record = {this.state.recent_record}
              show={this.state.modalShow}
                showModalCallback={this.showModalCallback}
                {...this.props} 
                {...props}       
              />                             
              </div>    
              </React.Fragment>
            : <React.Fragment>
          
              </React.Fragment>           
          )} 
          />     
          <Route exact path="/criticalgrid" exact render = { props =>(
            this.props.auth.isAuthenticated() 
            ? 
            <React.Fragment>
              <div >

                <SkillDetails 
                  updateRecord = {this.updateRecord}
                  newRecord={this.newRecord}
                  addSkillToRecord = {this.addSkillToRecord}
                  recent_record = {this.state.recent_record}
                  user_id={this.state.user_id} 
                  skill_title={this.state.skill_title} 
                  skill_icon = {this.state.skill_icon}
                  skill_details={this.state.skill_details}  
                  skill_id = {this.state.skill_id} 
                  show={this.state.modalShow}
                  showModalCallback={this.showModalCallback}
                  {...this.props} 
                  {...props}         
                />
                <CriticalSkillsGrid  
                updateRecord = {this.updateRecord}
                  criticalSkills= {this.state.criticalSkills}
                  user_id = {this.state.user_id}
                  newRecord={this.newRecord}
                  addSkillToRecord = {this.addSkillToRecord}
                  skillClicked = {this.skillClicked} 
                  userSkillsArray = {this.state.userSkillsArray} 
                  emotionSkillsArray={this.state.emotionSkillsArray} 
                  baseSkillsArray={this.state.baseSkillsArray} 
                  skillsGridArray={this.state.skillsGridArray}
                  setRecord_id = {this.setRecord_id}
                  getRecentRecordWithoutSkill = {this.getRecentRecord}
                  recent_record = {this.state.recent_record}
                  show={this.state.modalShow}
                  showModalCallback={this.showModalCallback}
                  {...this.props} 
                  {...props}
                />                          
              </div>    
            </React.Fragment>
            : 
            <React.Fragment>
          
            </React.Fragment>         
            )} 
            />

          <Route path="/suicideprevention" exact render = { props =>(
            !this.props.auth.isAuthenticated() 
              ? <React.Fragment>
          
              </React.Fragment>
              :
              <React.Fragment>
               
                <SIResources />             
              </React.Fragment>              
          )} />


            <Route exact path="/finish" exact render = { props =>(
              this.props.auth.isAuthenticated() 
              ? <React.Fragment>
                <div >
                  <AfterLvlPrompt
                  updateRecord = {this.updateRecord}  
                  record_id = 'test' 
                  prompt_record = {this.state.prompt_record} 
                  />
                </div>
                </React.Fragment>
              : <React.Fragment>
                 
                </React.Fragment>
                )} 
              />
            {/* <Route path="/records" render = { props =>(
              this.props.auth.isAuthenticated() 
              ? <React.Fragment>
                  <div >
                               
                  </div>
                </React.Fragment>
            :
                <React.Fragment>
                        <Landing 
                    {...this.props}{...props} 
                    user_id ={this.props.user_id} 
                    getUserInfo={this.getUserInfo}  
                    userIdCallback= {this.userIdCallback}
                    getPromptRecord = {this.getPromptRecord}
                  />
                </React.Fragment>
            )} /> */}

            <Route exact path="/records/old" exact render = { props =>(
              this.props.auth.isAuthenticated() 
              ? <React.Fragment>
                  <div >
                    <button onClick={this.getUserRecords}>get user Records</button>
                    <RecordsList recordsList = {this.state.recordsList}/>
                    </div>
                  </React.Fragment>
            :  <React.Fragment>
                  <Landing 
                    {...this.props}{...props} 
                    user_id ={this.props.user_id} 
                    getUserInfo={this.getUserInfo}  
                    userIdCallback= {this.userIdCallback}
                    getPromptRecord = {this.getPromptRecord}
                  />
                </React.Fragment>
            )} />

            <Route exact path="/records/add" exact render = { props =>(
              this.props.auth.isAuthenticated() 
              ? <React.Fragment> 
                  <FormBlank 
                  addFullRecord= {this.addFullRecord} 
                  getEmotionId={this.getEmotionId} 
                  customSkillsArray = {this.state.customSkillsArray}
                  baseSkillsArray = {this.state.baseSkillsArray}
                  skillsTypeahead = {this.state.skillsTypeahead}
                  
                  />        
                </React.Fragment>
              : <React.Fragment>
                  <Landing 
                    {...this.props}{...props} 
                    user_id ={this.props.user_id} 
                    getUserInfo={this.getUserInfo}  
                    userIdCallback= {this.userIdCallback}
                    getPromptRecord = {this.getPromptRecord}
                  />
                </React.Fragment>
                
            )} />
            <Route path="/search" exact render = { props =>(
              this.props.auth.isAuthenticated() 
                ? <React.Fragment>
                   


                    <Search  
                    handleSelectRecord = { this.selectRecord.bind(this) } 
                    skillsTypeahead = {this.state.skillsTypeahead}
                    searchByQuery = {this.searchByQuery}
                    searchList= {this.state.searchList}
                    />
                          
                                
                    
                </React.Fragment>
                :
                <React.Fragment>
                    <Landing 
                    {...this.props}{...props} 
                    user_id ={this.props.user_id} 
                    getUserInfo={this.getUserInfo}  
                    userIdCallback= {this.userIdCallback}
                    getPromptRecord = {this.getPromptRecord}
                  />             
                </React.Fragment>              
            )} />

            <Route path="/chart" exact render = { props =>(
              this.props.auth.isAuthenticated() 
                ? <React.Fragment>
                  <Chart/>
                </React.Fragment>
                :
                <React.Fragment>
                    <Landing 
                    {...this.props}{...props} 
                    user_id ={this.props.user_id} 
                    getUserInfo={this.getUserInfo}  
                    userIdCallback= {this.userIdCallback}
                    getPromptRecord = {this.getPromptRecord}
                  />   
                </React.Fragment>              
              )} />

            <Route exact path="/records/list" exact render = { props =>(
              this.props.auth.isAuthenticated() 
              ? <React.Fragment>
                   
                  <div style={{margin:'0 auto',paddingLeft:'10%',paddingRight:'10%', width:'75%'}} >  
                  <UpdateModal 
                  recordModalShow={this.state.recordModalShow}
                  update_date={this.state.update_date}
                  update_record_id = {this.state.update_record_id}
                  update_before_lvl = {this.state.update_before_lvl}
                  update_after_lvl = {this.state.update_after_lvl}
                  update_emotion = {this.state.update_emotion}
                  update_skill = {this.state.update_skill}
                  update_si = {this.state.update_si}
                  update_sh = {this.state.update_sh}

                  recordClicked = {this.recordClicked}
                  
                  recordModalClose = {this.recordModalClose}
                  searchList = {this.state.searchList}
                  handleSelectRecord = { this.selectRecord.bind(this)} 
                  recordsList = {this.state.recordsList}
                  updateRecord = {this.updateRecord} 
     
                  />
                     
                    <RecordsListUpdate 
                    getUserRecords = {this.getUserRecords}
                    recordClicked = {this.recordClicked}
                    recordModalCloseCallback = {this.recordModalCloseCallback}
                    searchList = {this.state.searchList}
                    handleSelectRecord = { this.selectRecord.bind(this) } 
                    recordsList = {this.state.recordsList}
                    />   
                  </div>
                </React.Fragment>
              : <React.Fragment>
                
                </React.Fragment>
              )} 
            />
          </div>
          </div>
        </Router>
      </MuiThemeProvider> 
    );
  }
}

export default App;
