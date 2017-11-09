import React from 'react';
import ReactDOM from 'react-dom';
import * as V from 'victory';

class Main extends Component {
  render() {
    return (
      <div>
        <h1>Victory Tutorial</h1>
      </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Main />, app);