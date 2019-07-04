import React, { Component } from "react";
//import React, { useState } from "react";
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state={
    persons: [
      {name: 'Max', age: 28},
      {name: 'John', age: 31},
      {name: 'Anna', age: 18}
    ],
    otherState: 'some value'
  }

  switchNameHandler = (newName) => {
    this.setState({persons : [
      {name: newName, age: 28},
      {name: 'John', age: 31},
      {name: 'Anna', age: 16}
    ]})
  }

  nameChangeHandler = (event) => {
    this.setState({persons : [
      {name: 'Max', age: 28},
      {name: event.target.value, age: 31},
      {name: 'Anna', age: 16}
    ]})
  }

  render() {
    const style={
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    return (
      <div className="App">
        <h1>Hi, I'm React!</h1>
        <p>This works :)</p>
        <button 
          style={style}
          onClick={()=>this.switchNameHandler('MadMax')}>
          Switch Name
        </button>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age} />
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Maximus')} 
          changed={this.nameChangeHandler}>
          My Hobbies: Racing
        </Person>
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age} />
      </div>
    );
  }
  //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hello, React!'));
}

export default App;

/*
const App=props=> {
    const [personsState, setPersonsState]=useState({
      persons: [
        {name: 'Max', age: 28},
        {name: 'John', age: 31},
        {name: 'Anna', age: 18}
      ], 
      //otherState: 'some value'
    });

    const [otherState, setOtherState]=useState({
      otherState: 'anther value set'
    })

    console.log(personsState, otherState);

    const switchNameHandler = () => {
      setPersonsState ({persons : [
          {name: 'Maximilian', age: 28},
          {name: 'John', age: 31},
          {name: 'Anna', age: 16}
        ], 
        //ostatne objekty sa musia vzdy skopirovat, aj ked sa nemenili, inac sa stratia!!!
        //pri class-componente a setState to netreba
        //otherState: personsState.otherState 
      })
    };

    return (
      <div className="App">
        <h1>Hi, I'm React!</h1>
        <p>This works :)</p>
        <button onClick={switchNameHandler}>Switch Name</button>
        <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
        <Person name={personsState.persons[1].name} age={personsState.persons[1].age} >
          My Hobbies: Racing
        </Person>
        <Person name={personsState.persons[2].name} age={personsState.persons[2].age} />
      </div>
    );
  }

export default App;
*/
