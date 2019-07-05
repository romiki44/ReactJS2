import React, { Component } from "react";
//import React, { useState } from "react";
import classes from './App.module.css';
import Person from './Person/Person';

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
    let persons = null;
    let btnClass='';

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

      btnClass=classes.red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    //ak element obsahuje media-query, root element musi byt StyleRoot
    //Person obsahuje dynamicke mediaquery cez Radium
    return (

        <div className={classes.App}>
          <h1>Hi, I'm React!</h1>
          <p className={assignedClasses.join(' ')}>This works :)</p>
          <button
            className={btnClass}
            onClick={this.togglePersonHandler}>
            Toggle Persons
        </button>
          {persons}
        </div>

    );
  }
  //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hello, React!'));
}

export default App;

