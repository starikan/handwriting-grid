import React from 'react';
import ReactDOM from 'react-dom';
import Cell from './Cell/Cell';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Cell></Cell>
      </div>
    );
  }
}

ReactDOM.render(<App></App>, document.getElementById('root'));
