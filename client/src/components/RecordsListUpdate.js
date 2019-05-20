import React, { Component } from 'react'
import PropTypes from 'prop-types';
import '../App.css';
import Record from './Record.js';
import RecordUpdate from './RecordUpdate';
import {Link} from 'react-router-dom';


class RecordsListUpdate extends Component {

  onSelectRecord(record){
    this.props.handleSelectRecord(record)
  } 

  componentDidMount() {
   this.props.getUserRecords()
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
    let recordsList = this.props.recordsList.map((record)=>(
            
      <RecordUpdate 
      key={record.record_id} record={record} 
      onSelectRecord = {this.onSelectRecord.bind(this)}
      currentRecord = {record}
        />
        
    ))
    return (
      <div style={{margin:'10px auto'}} >
        {/* <button onClick={this.props.getUserRecords} style={{fontSize:'20px', width:'50%', minWidth:'200px', alignItems:'center'}} className='subBtn' type="button">Get Records List
        </button>   */}
          <Link className="navbar-brand" to="/records/add">
            <i class="far fa-plus-square" style={{ fontSize: '1.7em', padding:'2px' }} > <span style={{fontFamily: 'Roboto', fontSize:'34px' }}> New Record </span></i>
          </Link>

       
          {recordsList}
      
      </div> 
    )
  }
}
   
// {searchList}
     

// PropTypes
RecordsListUpdate.propTypes= {
  recordsList: PropTypes.array.isRequired
}


export default RecordsListUpdate 
