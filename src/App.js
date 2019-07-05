import React, { Component } from "react";
//import React, { useState } from "react";
import './App.css';
import Person from './Person/Person';
import Radium, { StyleRoot } from 'radium';

class App extends Component {
  state = {
    persons: [
      { id: 'asde1', name: 'Max', age: 28 },
      { id: 'rewvc5', name: 'John', age: 31 },
      { id: 'asdf7', name: 'Anna', age: 18 }
    ],
    otherState: 'some value',
    showPerson: false
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    //opat kopia objektu nie refencia, novsi a starsi sposob
    const person = { ...this.state.persons[personIndex] };
    //const person=Object.assign({}, this.state.persons[personIndex]);

    // najprv kopia jedneho objektu
    person.name = event.target.value;
    // potom celeho pola
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons })
  }

  deletePersonHandler = (index) => {
    //nepouzit refenciu ale novu kopiu!!
    //const persons=this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({ persons: persons });
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPerson;
    this.setState({ showPerson: !doesShow })
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': { //Radium
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if (this.state.showPerson) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              changed={(event) => this.nameChangeHandler(event, person.id)}
              name={person.name}
              age={person.age}
              key={person.id} />
          })}
        </div>
      );

      style.backgroundColor = 'red';
      style[':hover'] = { //Radium
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    //ak element obsahuje media-query, root element musi byt StyleRoot
    //Person obsahuje dynamicke mediaquery cez Radium
    return (
      <StyleRoot> 
        <div className="App">
          <h1>Hi, I'm React!</h1>
          <p className={classes.join(' ')}>This works :)</p>
          <button
            style={style}
            onClick={this.togglePersonHandler}>
            Toggle Persons
        </button>
          {persons}
        </div>
      </StyleRoot>
    );
  }
  //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hello, React!'));
}

export default Radium(App);

