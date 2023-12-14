// MyComponent.js
import React from 'react';
import { Variable } from './Variable';

class MyComponent extends React.Component {
 render() {
    return (
      <div>
        <p>{Variable}</p>
      </div>
    );
 }
}

export default MyComponent;