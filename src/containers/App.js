import React, { Component } from "react";
//import React, { useState } from "react";
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';
import AuthContext from '../context/auth-context';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   console.log('App.js constructor');
  // }

  state = {
    persons: [
      { id: 'asde1', name: 'Max', age: 28 },
      { id: 'rewvc5', name: 'John', age: 31 },
      { id: 'asdf7', name: 'Anna', age: 18 }
    ],
    otherState: 'some value',
    showPersons: false,
    counter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state) {
    //console.log('App.js getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount() {
    //console.log('App.js componentDidMount');
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

    this.setState((prevState, props) => {
      return {
        persons: persons,
        counter: prevState.counter + 1  //korekny counter, nikdy nie priamo!!
      };
    });
  }

  deletePersonHandler = (index) => {
    //nepouzit refenciu ale novu kopiu!!
    //const persons=this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({ persons: persons });
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow })
  }

  loginHandler = () => {
    //len priklad
    this.setState({ authenticated: true })
  }

  render() {
    //console.log('App.js render');
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangeHandler}
        isAuthenticated={this.state.authenticated} />;
    }

    return (
      <WithClass classes={classes.App}>
        <AuthContext.Provider value={{
          authenticated: this.state.authenticated,
          login: this.loginHandler
        }}>
          <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonHandler} />
          {persons}
        </AuthContext.Provider>
      </WithClass >
    );
  }
}

export default App;

