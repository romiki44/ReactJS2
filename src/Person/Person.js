import React from 'react';
import './Person.css';

const person = (props) => {
  //return <p>I'm a Person and i'm  {Math.floor(Math.random()*70)} years old!</p>
  return (
    <div className="Person">
      <p onClick={props.click}> I'm {props.name} and i'm {props.age} years old!</p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name}/>
    </div>
  )
}

export default person;
