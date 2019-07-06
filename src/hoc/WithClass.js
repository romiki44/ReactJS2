import React from 'react';

const WithClasss = props => (
  <div className={props.classes}>{props.children}</div>
);

export default WithClasss;