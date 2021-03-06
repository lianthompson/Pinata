import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import '../App.css';
import Moment from 'react-moment';
import { Form,OverlayTrigger,Tooltip, Card}  from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SkillsTypeahead from './SkillsTypeahead';
import EmotionsTypeahead from './EmotionsTypeahead';
import RecordUpdate from './RecordUpdate';
import MySlider from './MySlider';

 
export default class Update extends Component {
  constructor(props){
    super(props);
    // this.state={
    //   emotion:'',
    //   emotion_id:'',
    //   skill:'',
    //   skill_id:'0',
    //   before_lvl:'5',
    //   after_lvl:'5',
    //   si:false,
    //   sh:false,
    //   message:'',
    //   startDate: new Date(),
    //   date:new Date().getTime() / 1000
    // }
    this.handleBefore_lvlChange = this.handleBefore_lvlChange.bind(this);
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  handleKeyChange(key) {
    this.setState({key: key.target.value})
    }

    handleQueryChange(query) {
      this.setState({query: query.target.value})
      }

  search=(e)=>{
    e.preventDefault();
  
    if (this.state.key==='Action'){
        this.props.searchByQuery('Skill', this.state.skill_id);
    }

    if (this.state.key==='Thinking about suicide or self harm'){
        this.props.searchByQuery('critical', true);
    }
    if(this.state.key==='Feeling'){
      this.props.searchByQuery('Feeling', this.state.query)
    }
    if(this.state.key==='Impact'){
      this.props.searchByQuery('Impact', this.state.query)
    }
  }

  setSkillCallback = (skill) =>{

    this.setState({skill})
    let url = `http://localhost:3001/api/skill_id?skill_title=${skill}`
    
    fetch(url, {
      method: 'get',
      headers: { 'Content-Type': 'application/json'}
      })
      .then(res => res.json()).then(json => this.setState({skill_id:json[0].skill_id})).catch(function(e) {
      console.log(e); // “oh, no!”
     })

  }
  onSelectRecord(record){
    this.props.handleSelectRecord(record)
  } 


  setEmotionCallback = (emotion)=>{
 
    this.setState({query:emotion})
    
    
    let url = `http://localhost:3001/api/emotion_id?emotion_text=${emotion}`
  console.log(url)
  fetch(url, {
    method: 'get',
    headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json()).then(json => this.setState({emotion_id:json[0].emotion_id})).catch(function(e) {
    console.log(e); // “oh, no!”
   })
 
  }

  handleBefore_lvlChange(impact) {
    // let fieldName = event.target.name;
    // let fleldVal = event.target.value;
    this.setState({query:impact})
  }

  render() {

    let searchList  = this.props.searchList.map((record)=>(           
      <RecordUpdate 
        key={record.record_id} 
        record={record} 
        onSelectRecord = {this.onSelectRecord.bind(this)}
        currentRecord = {record}
      />         
    ))
     
    return (
      <div style={{width:'100%'}}>
        <div style={{width:'40%', margin:'0 auto'}}>

          <form>

            <div class="form-group">
              <label >Key</label>
              <Form.Control as="select" onChange={this.handleKeyChange.bind(this)}>
              
                <option>Feeling</option>
                <option>Action</option>
                <option>Impact</option>
                <option>Unfinished</option> 
                <option>FullList</option>
                <option>Thinking about suicide or self harm</option>
              </Form.Control>
            </div>


          <h1>Emotions</h1>
          <EmotionsTypeahead setEmotionCallback= {this.setEmotionCallback} />


          <h1>Actions</h1>
            <SkillsTypeahead  
              skillsTypeahead = {this.props.skillsTypeahead}
              setSkillCallback = {this.setSkillCallback}
            />
            
      <h1>Impact</h1>
            <MySlider handleBefore_lvlChange = {this.handleBefore_lvlChange}/>
          </form>
        </div>
        <div style={{width:'60%', margin:'0 auto'}}>
          <button onClick={this.search}>Search user Records</button> 
          {searchList}
        </div>
        
      </div>  
      
    )
  }
}