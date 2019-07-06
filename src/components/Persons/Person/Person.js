import React, { Component } from 'react';
import classes from './Person.module.css';
import Aux from '../../../hoc/Auxilarity';
import withClasses from '../../../hoc/withClasses';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
  constructor() {
    super();
    //this.inputElement=React.createRef()
    this.inputElementRef=React.createRef();
  }

  // len v class-componentoch
  static contextType=AuthContext;

  componentDidMount() {
    //klasicky javascript - vzdy len prvy
    //document.querySelector('input').focus();

    //len pre class component...posledny element
    //this.inputElement.focus();

    //novsi sposob
    this.inputElementRef.current.focus();

    console.log(this.context.authenticated);
  }

  render() {
    //console.log('Person.js render');
    return (
      <Aux>
        {this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
        <p onClick={this.props.click}> I'm {this.props.name} and i'm {this.props.age} years old!</p>
        <p>{this.props.children}</p>
        <input 
          //ref={(inputEl)=>{this.inputElement = inputEl}}
          ref={this.inputElementRef} //novsi sposob
          type="text" 
          onChange={this.props.changed} 
          value={this.props.name} />
      </Aux>
    )
  }
}

// definicia povolenych props a typov props
// pokial nesedia, vyhodi chybovu hlasku - len v developer mode
Person.propTypes={
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default withClasses(Person, classes.Person);
