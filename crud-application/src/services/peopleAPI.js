import axios from 'axios';

  export async function getPeople() {
    try {
      const response = await axios.get('http://localhost:3000/people');
      console.log(response);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  export async function addPerson(person) {
    try {
      const response = await axios.post('http://localhost:3000/people', person);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }