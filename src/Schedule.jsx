import React, {useState, useEffect} from 'react';
import './Schedule.css';
import leftarrow from './assets/left-arrow.svg';
import rightarrow from './assets/right-arrow.svg';
import closePopup from './assets/close-popup.svg';

import 'material-ui-popup-state';
import {styled} from '@mui/material/styles';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import {Typography} from '@mui/material';

/**
 * Simple component with no state.
 *
 * See the basic-react example for an example of adding and reacting to
 * changes in state and lecture 10 for details on Material-UI
 *
 * @return {object} JSX
*/
export default function Schedule() {
    const [schedule, setSchedule] = useState(() => {
      // given endpoint wasn't working for me
      fetch('response.json', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          },
      },
      )
        .then((response) => response.json())
        .then(function(data) {
          setSchedule(data.results[0]);
      });
    });
    const [day, setDay] = useState(0);
    // re-render when day changes/updates
    useEffect(() => {
      fetch('response.json', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          },
      },
      )
        .then((response) => response.json())
        .then(function(data) {
          console.log(data.results);
          if (day >= 0 && day < data.results.length) {
            setSchedule(data.results[day]);
          }
      });
    }, [day]);

    const prevDay = () => {
      setDay(day - 1);
    };
    const nextDay = () => {
      setDay(day + 1);
    };

    const BootstrapTooltip = styled(({className, ...props}) => (
      <Tooltip {...props} arrow classes={{popper: className}} />
    ))(({theme}) => ({
      [`& .${tooltipClasses.arrow}`]: {
        'color': '#17384F',
        '&::before': {
          border: '1px solid #7EE8FA',
        },
      },
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#17384F',
        fontSize: 24,
        borderRadius: 6,
        width: 520,
        height: 250,
        border: '1px solid #7EE8FA',
      },
    }));

    if (schedule) {
    return (
      <div id="schedule-container">
      <img id="left-arrow" onClick={prevDay} src={leftarrow}/>
      <table id="schedule-table">
        <tbody>
          <th id="date" colspan="2">{schedule.date}</th>
        {schedule.events.map((event) => (
          <BootstrapTooltip
          title={
            <div id="popup-container">
              <img id='closeWindow' src={closePopup}></img>
              <br></br>
              <div className='textpopup-wrapper'>
              <Typography
              align='center'>{event.name}</Typography>
              <Typography className='popup-text' align='right'>
              <label>
                First Name: <input className="input-box" />
              </label>
              </Typography>
              <Typography className='popup-text' align='right'>
              <label>
                Last Name: <input className="input-box" />
              </label>
              </Typography>
              <Typography className='popup-text' align='right'>
              <label>
                Email: <input className="input-box" />
              </label>
              </Typography>
              <Typography>
              <label>
                <input id="input-box"
                type="radio" name="myCheckbox"/>
                Would You Like a Reminder?
              </label>
              </Typography>
              <button>Register</button>
              </div>
            </div>
          }
          arrow>
          <tr>
            <td id="time">{event.time}</td>
            <td id="event">{event.name}</td>
          </tr>
          </BootstrapTooltip>
          ))}
         </tbody>
      </table>
      <img id="right-arrow" onClick={nextDay} src={rightarrow}/>
    </div>
    );
    }
}

