import * as React from 'react';
import axios from 'axios';
import {Dropdown} from 'office-ui-fabric-react/lib/Dropdown';
import './App.css';
import {connect} from 'react-redux';

class App extends React.Component { 

  constructor() {
    super()
    this.state = {
       optionsArrayForID: [{key: '0' , text: 'No Data Available'}],
       name: '',
       pic: '',
       id: '0',
       displayId: ''
    };
  }


  selectOptionForId(data){
    this.setState({optionsArrayForID: [{key: '0' , text: 'No Data Available'}]})
    let depmnt = data;
    if (depmnt==='HR') {
      this.setState({
        optionsArrayForID: [
        {key: '1' , text: '1'},
        {key: '2' , text: '2'},
        {key: '3' , text: '3'},
        {key: '4' , text: '4'},
        {key: '5' , text: '5'},
      ]
      })
    } else if (depmnt==='ENGINEERING'){
      this.setState({
        optionsArrayForID: [
        {key: '6' , text: '6'},
        {key: '7' , text: '7'},
        {key: '8' , text: '8'},
        {key: '9' , text: '9'},
        {key: '10' , text: '10'},
      ]
      })
    }
  }

  valueOfId(data){
    this.setState({id:''})
    if(data!=='0'){
      this.setState({id:data})
    }
    console.log(this.state.id)
  }
  handleClick(){
    if(this.state.id!=='0'){
     axios.get(`https://reqres.in/api/users/${this.state.id}`).then(  
      res => { 
       this.setState({
         name:res.data.data.first_name+' '+res.data.data.last_name,
         pic: res.data.data.avatar,
         displayId: res.data.data.id 
       })
      })
    }
  }
    componentDidMount(){   
     this.props.selectOptionForDepart()

  }

  reset = () => {
    this.setState({optionsArrayForID: [{key: '0' , text: 'No Data Available'}],
    reponseData: [],
    pic: '',
    id: '0',
    name: '',
    displayId: ''
  })

  }

  render() {

    return (
      <React.Fragment className="App">
        <header className="App-header">
         Employee Portal
        </header>
        <div className="App-body">
         <Dropdown label="Department"
          options={this.props.optionsArray} defaultSelectedKey="S" onChange={(e) => this.selectOptionForId(e.currentTarget.title)}/>
         <Dropdown  label="Employee Id"
          options={this.state.optionsArrayForID} defaultSelectedKey="0" onChange={(e) => this.valueOfId(e.currentTarget.title)}
          />
          <button className="margin-top-30px" onClick={() => this.handleClick()}>GetDetails</button>
          <button className="margin-top-30px" onClick={this.reset}>Clear</button>  
        </div>
        <div className="App-body">               
          <img src={this.state.pic} alt='none'/>
        </div>
        <div className="App-body">
          <span>ID : {this.state.displayId}</span>
          <span className="padding-left-25px"> Name : {this.state.name}</span>
        </div>       
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    optionsArray : state.optionsArray,
  }
}

const mapDispachToProps = (dispach) => {
  return{
    selectOptionForDepart: () => dispach({type:'DEPARTMENT_OPTION'})
  }
}

export default connect(mapStateToProps,mapDispachToProps)(App);
