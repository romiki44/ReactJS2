import React, {useEffect, useRef, useContext} from 'react';
import classes from './Cockpit.module.css';
import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {
  const toggleBtnRef=useRef(null);
  const authContext=useContext(AuthContext);

  console.log(authContext.authenticated);

  useEffect(()=>{
    //console.log('Cockpit.js useEffect');

    //po componenetDidMount sa aktivuje click-event
    toggleBtnRef.current.click();
  }, []);
  
  const assignedClasses = [];
  let btnClass='';
  if(props.showPersons) {
    btnClass=classes.red;
  }
  
  if (props.persons.length <= 2) {
    assignedClasses.push(classes.red);
  }
  if (props.persons.length <= 1) {
    assignedClasses.push(classes.bold);
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This works :)</p>
      <button
        ref={toggleBtnRef}
        className={btnClass}
        onClick={props.clicked}>
        Toggle Persons
      </button>
      <button onClick={authContext.login}>Login</button>
    </div>
  );
}

export default Cockpit;