import React from 'react';
import Schedule from './Schedule';
import './App.css';
import lightbulb from './assets/lightbulb.svg';

/**
 * Simple schedule component for challenge
 */
class App extends React.Component {
  /**
   * @return {object} a <div> containing a schedule
   */
  render() {
    return (
      <div>
        <div className="top-bar">
        <img className="lightbulb"src={lightbulb}/>
        </div>
        <div className="schedule-header">Schedule</div>
        <Schedule className="schedule"/>
      </div>
    );
  }
}

export default App;
