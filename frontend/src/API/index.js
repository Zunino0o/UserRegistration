import Axios from 'axios';
const getPatients = async () => {
  try {
    const res = await Axios.get('http://localhost:8080/patients');

    return res.data.data.patients;
  } catch (err) {
    console.log(err);
  }
};
export default getPatients;