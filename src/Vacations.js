import React from 'react';
import moment from 'moment';

export default function Vacations({ vacations, destroyVacation }) {
  return (
    <ul>
      {vacations.map(vacation => {
        return (
          <li className="entry" key={vacation.id}>
            <button onClick={() => destroyVacation(vacation)}>X</button>
            {moment(vacation.startDate).format('dddd MM/DD/YYYY')} to{' '}
            {moment(vacation.endDate).format('dddd MM/DD/YYYY')} (
            {moment(vacation.endDate).diff(moment(vacation.startDate), 'days')}{' '}
            days)
          </li>
        );
      })}
    </ul>
  );
}
