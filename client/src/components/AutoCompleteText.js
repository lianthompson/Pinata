import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Form }  from 'react-bootstrap';
import Moment from 'react-moment';

export default class AutoCompleteText extends Component {
  constructor(props){
      super(props);
    this.items = [
    "Fear",
    "Angry",
    "Sad",
    "Disconnected",
    "Disoriented",
    "Unreal",
    "Jittery",
    "Anxious",
    "Depressed",
    "Scared",
    "Isolated",
    "Lonely",
    "Hopeless", 
    "Unreal"   
    ];

    
    this.state={
        test:'callback test',
        suggestions:[],
        skillsGridArray:[],
        userSkillsArray:[],
        text:"",
        record_id:'',
        emotion_text:'TEST',
        before_lvl:'',
        si:false,
        sh:false,
        emotions:{
            Scared:8,
            Angry:3,
            Sad:4,
            Depressed:5,
            Isolated:6,
            Lonely:7,
            Hopeless:9, 
            Disconnected:11,
            Disoriented:12,
            Unreal:10,
            Jittery:13,
            Anxious:14,
            Depressed:15
        },
        pinata :   {
            "skill_title": "piñata",
            "skill_details": "Lorium sermpra filler text is filling the text sapce.",
            "skill_icon": "https://s3-us-west-2.amazonaws.com/pinata-images/wildcard.png",
            "skill_id": 0
        },
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
            "skill_details":"later later later write it later" ,
            "skill_icon": "https://s3-us-west-2.amazonaws.com/pinata-images/takebreather.png",
            "skill_id": 5
            },
            {
            "skill_title": "Punch a Pillow",
            "skill_details": "punch pillow text. texty text text text",
            "skill_icon": "https://s3-us-west-2.amazonaws.com/pinata-images/punchpillow.png",
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
    };

    this.onSubmit= this.onSubmit.bind(this);
    this.handleBefore_lvlChange = this.handleBefore_lvlChange.bind(this);
    this.getSkillsGrid = this.getSkillsGrid.bind(this);
    this.someFn = this.someFn.bind(this);
    
    // end of constructor
    }
        
    handleBefore_lvlChange(before_lvl) {
    this.setState({before_lvl: before_lvl.target.value})
    }

    handleSHChange(e) {
        e.preventDefault();

        if(this.state.sh){
            this.setState({sh: false})
        }else {this.setState({sh: true})}
    }
    
    handleSIChange(e) {
        e.preventDefault();
    if(this.state.si){
        this.setState({si: false})
    }else {this.setState({si: true})}

    }

    onSubmit =(e)=> {
    e.preventDefault();
    // console.log(this.props.state)
    // this.props.updateRecord(this.state.record_id, this.state.before_lvl, this.state.before_lvl);


    this.setState({
        
        message:`Record Made.`
        });

    }


    onTextChanged = (e) =>{
        const value = e.target.value; 
        let suggestions = [];
        if (value.length >0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }
            this.setState({suggestions, text:value});

    }

    suggestionSelected(value){
        console.log('line 106',value)
        console.log('line 107',this.state.emotion_text)
        let the_id = this.state.emotions[value]
        this.setState({
            emotion_text:value,
            suggestions:[],
            text:value ,
            emotion_id:the_id 
        })
        console.log('line 116',this.state.emotion_text)
        
        console.log(`line 117`, this.state.emotion_text)
        this.getEmotionSkills(value);
        console.log(`line 121`, this.state.emotion_text)
    }


    newRecord  = (e) => {
        // make new record
        console.log('216 newRecord')
        e.preventDefault();
        let url = `http://localhost:3001/api/records`            
        let record = 
            {
            before_lvl:this.state.before_lvl,
            emotion_id:this.state.emotion_id,
            si:this.state.si,
            sh:this.state.sh,
            user_id:this.props.user_id,
            date: Math.round((new Date()).getTime() / 1000)
            };       
        fetch(url, {
            method: 'post',
            body: JSON.stringify(record),
            headers: { 'Content-Type': 'application/json'}
        })
        .then(r => r.json())
        .then(json=>{this.setState({recent_record:json}, this.getUserSkills())})
        .catch(function(e) {console.log(`something is wrong! : ${e}`); })           
    }

    getNewRecord = (e) => {
        console.log('216 getNewRecord')
        e.preventDefault();
        let auth0_id= this.props.auth0_id
        let url = `http://localhost:3001/api/newRecord?auth0_id=${auth0_id}`
        if (this.props.auth0_id && this.props.auth0_id!==''){
    
        fetch(url, {
            method: 'get',
            headers: { 'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(json => console.log('256',json))
            // .then(json=>{console.log('line 32',json); return json})
            .catch(function(e) {console.log(e)})
        
        }else {console.log(`user id is required`)}
    }
    
    getRecentRecord = () => {

        this.setState({test:'test successful'})
    
    //     let url = `http://localhost:3001/api/mostRecentRecord?user_id=${this.props.user_id}`
    //   console.log('252', url)


    //   if (this.props.user_id){
    //     fetch(url, {
    //         method: 'get',
    //         headers: { 'Content-Type': 'application/json'}
    //         })
    //         .then(res => res.json()).then(json => console.log(json)).catch(function(e) {console.log(e)})
        
    //     }

        }
        

    getEmotionSkills = (emotion_text) => {
        console.log(`line 148`, this.state.emotion_text)
    let url = `http://localhost:3001/api/emotionSkills?emotion=${emotion_text}`
    console.log(url)
    console.log("line 151", this.state.emotion_text)
    fetch(url, {
    method: 'get',
    headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(json=>{console.log(json); return json})
    .then(json=>{console.log('line 158',this.state.emotion_text); return json})
    .then(json => this.setState({emotionSkillsArray: json}))
    .then(json=>{console.log('line 160',this.state.emotion_text); return json})
    .catch(e => {console.log(e)})

    }

    getUserSkills = () => {

        let url = `http://localhost:3001/api/userSkills?id=${this.props.user_id}&emotion=${this.state.emotion_text}`
    
        console.log(`userSkills ${url}`)
        fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json'}
        })
        .then(res => res.json()).then(json => this.setState({userSkillsArray: json},() =>this.getSkillsGrid())).catch(function(e) {
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
console.log('grid length from 284', this.state.userSkillsArray.length)
            idx = Math.floor((Math.random() * this.state.userSkillsArray.length))
            target = this.state.userSkillsArray[idx]            
console.log('target from 287', target)
            this.state.skillsGridArray.push(target)
            this.state.emotionSkillsArray = this.state.emotionSkillsArray.filter(e => e.skill_id !== target.skill_id);
            this.state.baseSkillsArray = this.state.baseSkillsArray.filter(e => e.skill_id !== target.skill_id);
            this.state.userSkillsArray = this.state.userSkillsArray.filter(e => e.skill_id !== target.skill_id);
console.log('grid array from 285', this.state.skillsGridArray)
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

        if (this.state.skillsGridArray.length === 9 ){
            console.log('correct length at end of function')
            this.setState({skillsGridArray:this.state.skillsGridArray},() => this.getCriticalSkills())

            // this.setState({skillsGridArray:this.state.skillsGridArray},() => this.someFn())
        }
    
    }


    getCriticalSkills = () => {
        console.log('made it to critical skills')
        if (this.state.si || this.state.sh || this.state.before_lvl>5 ){
    
            let url = 'http://localhost:3001/api/criticalSkills'
    
            fetch(url, {
                method: 'get',
                headers: { 'Content-Type': 'application/json'}
                })
                .then(res => res.json())
                .then(json => this.setState({criticalSkills:json}, () => this.someFn()))
                .catch(function(e) {
                console.log(e); // “oh, no!”
            })
        }else {
            this.setState({criticalSkills:[]}, () => this.someFn())
        }
    }

    someFn(){
        console.log('made it to somefn')
        let skillsGridArray= this.state.skillsGridArray
        let userSkillsArray= this.state.userSkillsArray
        let si = this.state.si
        let sh= this.state.sh
        let before_lvl =this.state.before_lvl
        let recent_record = this.state.recent_record.record;
        let criticalSkills = this.state.criticalSkills;
        this.props.myCallback(skillsGridArray, recent_record, criticalSkills, userSkillsArray, si, sh, before_lvl);
    }

    renderSuggestions(){
        const {suggestions} = this.state;
        if (suggestions.length === 0 ){
            return null
        }
        return (
            <ul>       
                {suggestions.map((item) => <li onClick={()=> 
                this.suggestionSelected(item)             
                }>{item}</li>)              
                }             
            </ul>
        )
    }

    render() {
        const { text } = this.state
        let grid;

        if (this.state.si){
            grid = '/suicideprevention'
        } else if (this.state.before_lvl>5){
            grid='/criticalgrid'
        } else {
            grid = '/grid'
        }
        return (
            <div >
                <h1 style={{padding:'25px 70px'}}>I am feeling</h1>
                <div className="AutoCompleteText">
                    <input value={text} type="text" onChange={this.onTextChanged} />
                    <ul>
                        {this.renderSuggestions()}
                    </ul>                
                </div>
                <br/>
                
                <Form>
                    <div className = {this.state.emotion_text === 'TEST' ? 'hidden': ''}>
                        <h3>
                        On a scale from 1-7 
                        <br/>
                        the intensity of this feeling is 
                        </h3>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>
                               
                            </Form.Label>
                            <Form.Control as="select"  defaultValue={this.state.before_lvl}
                                onChange={this.handleBefore_lvlChange.bind(this)}>
    
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                            
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className = {this.state.before_lvl<6 ? 'hidden': ''}>
                        <h3>I am also thinking about </h3>  
                        <input type="submit" value="Suicide" className="btn" style={{ margin:'20px', background:'hsla(360, 100%, 100%, 0.5)'} }
                        onClick={this.handleSIChange.bind(this)}
                        />  
                        <input type="submit" value="Self Harm" className="btn" style={{ margin:'20px', background:'hsla(360, 100%, 100%, 0.5)'} }
                        onClick={this.handleSHChange.bind(this)}
                        />  
                    </div>
                    <div className = {this.state.before_lvl ? '':'hidden'}>

                    <input type="submit" value="Submit" className="btn" style={{ margin:'20px', background:'hsla(360, 100%, 100%, 0.5)'} }
                    onClick={this.newRecord.bind(this)}
                    />  
                    </div>             
                </Form>
            </div>
        )
    }

 
}



