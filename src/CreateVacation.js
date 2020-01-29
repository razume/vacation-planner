import React, { useState } from 'react';
import moment from 'moment';

const today = () => moment().format('MM/DD/YYYY');
const week = () =>
  moment()
    .add('weeks', 1)
    .format('MM/DD/YYYY');

const CreateVacation = ({ createVacation }) => {
  const [startDate, setStartDate] = useState(today());

  const [endDate, setEndDate] = useState(week());

  const [error, setError] = useState('');

  const onSubmit = async ev => {
    ev.preventDefault();
    try {
      await createVacation({ startDate, endDate });
      setStartDate(today());
      setEndDate(week());
      setError('');
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  return (
    <form className="input-container" onSubmit={onSubmit}>
      <span className="error">{error}</span>
      <label>
        Start Date
        <input
          value={startDate}
          onChange={ev => setStartDate(ev.target.value)}
        />
      </label>
      <label>
        End Date
        <input value={endDate} onChange={ev => setEndDate(ev.target.value)} />
      </label>
      <button>Create</button>
    </form>
  );
};

export default CreateVacation;
