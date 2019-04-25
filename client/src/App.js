import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'



import 'bootstrap/dist/css/bootstrap.min.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './App.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import SkillsList from './components/SkillsList';


import AutoCompleteText from './components/AutoCompleteText';

import pinata_big from './components/img/pinata_big.png';
import SkillsGrid from './components/SkillsGrid';

import Record from './components/Record';
import RecordUpdate from './components/RecordUpdate';
import RecordsList from './components/RecordsList'
import RecordsListUpdate from './components/RecordsListUpdate'

import AddFullRecord from './components/AddFullRecord'
import AddRecordEmotion from './components/AddRecordEmotion'
import AddRecordSkill from './components/AddRecordSkill'


import FormBlank from './components/FormBlank';
import Update from './components/Update';
import FinishRecordPrompt from './components/FinishRecordPrompt';


const http = require('http');
const fetch = require('node-fetch');

class App extends Component {
state = { 
  skillsList:[],
    user_id:'2',
    record_id:'',
    before_lvl:'',
    after_lvl:'3',
    impact:null,
    emotion:'Angry',
    emotion_id:'',
    skill_id:'',
    skill:'',
    si:'',
    sh:'',
    recordsList : [],
    userSkillsArray : [],
    emotionSkillsArray : [],
    skillsGridArray : [],
    resEmotionId:'',
    pinata :   {
      "skill_title": "piñata",
      "skill_details": "Lorium sermpra filler text is filling the text sapce.",
      "skill_icon": "https://s3-us-west-2.amazonaws.com/pinata-images/wildcard.png",
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
   
    baseSkillsArray :
    [
      {
          "skill_title": "Test skill",
          "skill_details": "Lorium sermpra filler text is filling the text sapce.",
          "skill_icon": "https://s3-us-west-2.amazonaws.com/pinata-images/wildcard.png",
          "skill_id": 1
      },
      {
          "skill_title": "Play Video Games",
          "skill_details": "Lorium sermpra filler text is filling the text sapce.",
          "skill_icon": "https://s3-us-west-2.amazonaws.com/pinata-images/playvideogames.png",
          "skill_id": 2
      },
      {
          "skill_title": "Wring a Towel",
          "skill_details": "Lorium sermpra filler text is filling the text sapce.",
          "skill_icon": "https://s3-us-west-2.amazonaws.com/pinata-images/wringtowel.png",
          "skill_id": 3
      },
      {
          "skill_title": "Workout",
          "skill_details": "Lorium sermpra filler text is filling the text sapce.",
          "skill_icon": "https://s3-us-west-2.amazonaws.com/pinata-images/workout.png",
          "skill_id": 4
      },
      {
          "skill_title": "Take a Breather",
          "skill_details": "https://s3-us-west-2.amazonaws.com/pinata-images/takebreather.png",
          "skill_icon": "url to the image",
          "skill_id": 5
      },
      {
          "skill_title": "Punch a Pillow",
          "skill_details": "https://s3-us-west-2.amazonaws.com/pinata-images/punchpillow.png",
          "skill_icon": "url to the image",
          "skill_id": 6
      }, 
      {
        "skill_title": "Dance",
        "skill_details": "Lorium sermpra filler text is filling the text sapce.",
        "skill_icon": "https://s3-us-west-2.amazonaws.com/pinata-images/wildcard.png",
        "skill_id": 7
    }, 
    {
      "skill_title": "Listen to Music",
      "skill_details": "Lorium sermpra filler text is filling the text sapce.",
      "skill_icon": "https://s3-us-west-2.amazonaws.com/pinata-images/wildcard.png",
      "skill_id": 8
  }, 
  {
    "skill_title": "Make Art",
    "skill_details": "Lorium sermpra filler text is filling the text sapce.",
    "skill_icon": "https://s3-us-west-2.amazonaws.com/pinata-images/wildcard.png",
    "skill_id": 9
}, 
{
  "skill_title": "Phone a Friend",
  "skill_details": "Lorium sermpra filler text is filling the text sapce.",
  "skill_icon": "https://s3-us-west-2.amazonaws.com/pinata-images/phonefriend.png",
  "skill_id": 10
}, 
{
  "skill_title": "Take a Walk",
  "skill_details": "Lorium sermpra filler text is filling the text sapce.",
  "skill_icon": "https://s3-us-west-2.amazonaws.com/pinata-images/takewalk.png",
  "skill_id": 11
}, 
{
  "skill_title": "Cook",
  "skill_details": "Lorium sermpra filler text is filling the text sapce.",
  "skill_icon": "https://s3-us-west-2.amazonaws.com/pinata-images/cookfood.png",
  "skill_id": 12
},
{
  "skill_title": "Play with Pet",
  "skill_details": "Lorium sermpra filler text is filling the text sapce.",
  "skill_icon": "https://s3-us-west-2.amazonaws.com/pinata-images/wildcard.png",
  "skill_id": 12
}  
]
}

selectRecord =(record) =>{
  this.setState({  
  record_id:record.record_id,
  before_lvl:record.before_lvl,
  after_lvl:record.after_lvl,
  emotion:record.emotion_text,
  emotion_id:record.emotion_id,
  skill:record.skill_title,
  skill_id:record.skill_id,
  si:record.si,
  sh:record.sh,
  date:record.date  

})
}


getUserRecords = () => {

  let url = `http://localhost:3001/api/userRecords?user_id=${this.state.user_id}`

  fetch(url, {
    method: 'get',
    headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json()).then(json => this.setState({recordsList: json})).catch(function(e) {
    console.log(e); // “oh, no!”
   })

}



updateRecord = (record_id, before_lvl, after_lvl) => {

  let url = `http://localhost:3001/api/userRecords?record_id=${record_id}`

  let update = {
    before_lvl: parseInt(before_lvl),
    after_lvl: parseInt(after_lvl)
  }

  console.log(update)

  fetch(url, {
    method: 'put',
    body: JSON.stringify(update),
    headers: { 'Content-Type': 'application/json'}
    })
    .catch(function(e) {console.log(`something is wrong ${e}`)})

}


addFullRecord = (skill_id,emotion_id, before_lvl, after_lvl,si,sh) => {
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
    date:  "2099-02-20",
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

  let url = `http://localhost:3001/api/userSkills?id=${this.state.user_id}&emotion=${this.state.emotion}`

  fetch(url, {
    method: 'get',
    headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json()).then(json => this.setState({userSkillsArray: json})).catch(function(e) {
    console.log(e); // “oh, no!”
   })

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

  let idx;
  let i = 0;
  let target;

  // add user skills 

  while (this.state.skillsGridArray.length < 3) {
    if (this.state.skillsGridArray.length === 1) {
      this.state.skillsGridArray.push(this.state.pinata)
    } else if (this.state.userSkillsArray.length > 0) {
      idx = Math.floor((Math.random() * this.state.userSkillsArray.length))
      target = this.state.userSkillsArray[idx]
      this.state.skillsGridArray.push(target)
      this.state.emotionSkillsArray = this.state.emotionSkillsArray.filter(e => e.skill_id !== target.skill_id);
      this.state.baseSkillsArray = this.state.baseSkillsArray.filter(e => e.skill_id !== target.skill_id);
      this.state.userSkillsArray = this.state.userSkillsArray.filter(e => e.skill_id !== target.skill_id);

    } else {
      idx = Math.floor((Math.random() * this.state.baseSkillsArray.length))
      target = this.state.baseSkillsArray[idx]
      this.state.skillsGridArray.push(target)
      this.state.emotionSkillsArray = this.state.emotionSkillsArray.filter(e => e.skill_id !== target.skill_id);
      this.state.baseSkillsArray = this.state.baseSkillsArray.filter(e => e.skill_id !== target.skill_id);
    }
  }

  // add emotion skills 

  while (this.state.skillsGridArray.length < 6) {
    if (this.state.emotionSkillsArray.length > 0) {
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
  let url = `http://localhost:3001/api/emotion_id?emotion_text=${emotion}`
  console.log(url)
  fetch(url, {
    method: 'get',
    headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json()).then(json => {return json[0].emotion_id}).catch(function(e) {
    console.log(e); // “oh, no!”
   })

}



  render() {
    return (
      
      <MuiThemeProvider>
        <Router>
          <div className="App">
          {/* <NavBar/> */}
          
          
  
          <Route path="/" exact render = { props =>(
            <React.Fragment>
          <header className="App-header">
  
          <h1>Piñata</h1>
          <Link to ='/feeling'>
          <img style={{"padding":"50px", "width":"35%"}} src={pinata_big} alt={'pinata'}/>
          </Link>

          </header>
          </React.Fragment>)} />


          <Route path="/" render = { props =>(
            <React.Fragment>
         
         <div className="sidenav">
             
             <Link to ='/feeling' className="link"> Start</Link>
             <Link to ='/records/list' className="link"> List</Link>
               <Link to ='/records/add' className="link"> Add</Link>
               <Link to ='/records/update' className="link">Update</Link>
               <Link to ='/records/search' className="link">Search</Link>
               <Link to ='/finish' className="link">Finish</Link>
             
             </div>

          </React.Fragment>)} />
          
          <Route path="/feeling" exact render = { props =>(
            <React.Fragment>
              <div className="main">
              <div style={{width:'50%', paddingTop:'100px', margin:'0 auto'}}>

                <AutoCompleteText baseSkillsArray={this.state.baseSkillsArray}  user_id= {this.state.user_id}/>

               
                

</div>
              </div>
          </React.Fragment>)} />


          <Route exact path="/grid" exact render = { props =>(
            <React.Fragment>
               <div className="main">
             
               <SkillsGrid userSkillsArray = {this.state.userSkillsArray} emotionSkillsArray={this.state.emotionSkillsArray} baseSkillsArray={this.state.baseSkillsArray} skillsGridArray={this.state.skillsGridArray}/>
              
             </div>

         
              
            </React.Fragment>)} />



            <Route path="/records" render = { props =>(
            <React.Fragment>

              <div className="main">
             
              
              </div>


              <div className="main">
              <h1>Records</h1>
              
               </div>
            </React.Fragment>)} />

            <Route exact path="/records/list" exact render = { props =>(
            <React.Fragment>

              <div className="main">

              <button onClick={this.getUserRecords}>get user Records</button>
               <RecordsList recordsList = {this.state.recordsList}/>
               
              </div>
            </React.Fragment>)} />

            <Route exact path="/records/add" exact render = { props =>(
            <React.Fragment>
             
             <FormBlank addFullRecord= {this.addFullRecord} getEmotionId={this.getEmotionId} />

             
               {/* <AddFullRecord addFullRecord = {this.addFullRecord}/> */}
        
            </React.Fragment>)} />

            <Route exact path="/records/update" exact render = { props =>(
            <React.Fragment>

              <div className="main">
              {this.state.date} - {this.state.emotion} :  {this.state.skill}
              <br/>
              Before : {this.state.before_lvl}
              <br/>
              After : {this.state.after_lvl}
              </div>

            
              <div className="main">
              
              <Update updateRecord = {this.updateRecord}  record_id = {this.state.record_id} before_lvl = {this.state.before_lvl} />

              <hr/>
              <button onClick={this.getUserRecords}>get user Records</button>
              
              <RecordsListUpdate handleSelectRecord = { this.selectRecord.bind(this) } recordsList = {this.state.recordsList}/>

               {/* <RecordsList recordsList = {this.state.recordsList}/> */}
               
              </div>
            </React.Fragment>)} />

{/* finish record */}

            <Route path="/finish" exact render = { props =>(
            <React.Fragment>
         <div className='main'>
         <FinishRecordPrompt updateRecord = {this.updateRecord}/>
         
         </div>
          </React.Fragment>)} />





  
            


    
        </div>
        </Router>
        </MuiThemeProvider>
    );
  }
}

export default App;
