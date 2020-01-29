import React from 'react';
import { diff, format } from './utils';

export default function Vacations({ vacations, destroyVacation }) {
  return (
    <ul>
      {vacations.map(vacation => {
        return (
          <li className="entry" key={vacation.id}>
            <button onClick={() => destroyVacation(vacation)}>X</button>
            {format(vacation.startDate)} to {format(vacation.endDate)} (
            {diff(vacation)} days)
          </li>
        );
      })}
    </ul>
  );
}
