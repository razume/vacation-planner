import React, { useState, useEffect } from 'react';
import CreateVacation from './CreateVacation';
import Vacations from './Vacations';
import axios from 'axios';
import './App.css';

const API = 'https://acme-users-api-rev.herokuapp.com/api';

const fetchUser = async () => {
  const storage = window.localStorage;
  const userId = storage.getItem('userId');
  if (userId) {
    try {
      return (await axios.get(`${API}/users/detail/${userId}`)).data;
    } catch (ex) {
      storage.removeItem('userId');
      return fetchUser();
    }
  }
  const user = (await axios.get(`${API}/users/random`)).data;
  storage.setItem('userId', user.id);
  return user;
};

function App() {
  const [user, setUser] = useState({});
  const [vacations, setVacations] = useState([]);

  useEffect(() => {
    fetchUser().then(user => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (user.id) {
      axios
        .get(`${API}/users/${user.id}/vacations`)
        .then(response => setVacations(response.data));
    }
  }, [user]);

  const createVacation = vacation => {
    return axios
      .post(`${API}/users/${user.id}/vacations`, vacation)
      .then(response => setVacations([...vacations, response.data]));
  };

  const destroyVacation = vacationToDestroy => {
    return axios
      .delete(`${API}/users/${user.id}/vacations/${vacationToDestroy.id}`)
      .then(response =>
        setVacations(
          vacations.filter(vacation => vacation.id !== vacationToDestroy.id)
        )
      );
  };

  return (
    <div className="App">
      <h1 className="header">
        Vacation Planner for {user.fullName} ({vacations.length})
      </h1>
      <CreateVacation createVacation={createVacation} />
      <Vacations vacations={vacations} destroyVacation={destroyVacation} />
    </div>
  );
}

export default App;
