import React, { useState, useEffect } from 'react';
// import Axios from 'axios';
import getPatients from '../API/index';

export default function Patients() {
  const [data, setData] = useState();

  // const fetchData = async () => {
  //   try {
  //     const res = await Axios.get('http://localhost:8080/patients');
  //     console.log(res);
  //     setData(res.data.data.patients);
  //     console.log(data[0].first_name);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  useEffect(() => {
    async function fetchData() {
      const patients = await getPatients();
      setData(patients);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Patients</h1>
      {data && data.map((patient) => <h3 key={patient.id}>{patient.first_name}</h3>)}
    </div>
  );
}
