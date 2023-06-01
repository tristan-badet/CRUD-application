import React from 'react'
import { getPeople, addPerson } from "../services/peopleAPI";
import { useEffect, useState } from 'react'



const Tables = () => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        surname: '',
        mail: ''
      });

      const handleInputChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      }
      
   
    const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const result = await getPeople();
      console.log(result);
      setPeople(result);
    }

    fetchPeople();
    console.log(people);
  }, []);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const newPerson = await addPerson(formData);
      setPeople(prevPeople => [...prevPeople, newPerson]);
      setFormData({ id: '', name: '', surname: '', mail: '' });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
    <table>
        <thead>
            <tr>
                <th>ID</th> 
                <th>Name</th>
                <th>Surname</th>
                <th>Mail</th>
            </tr>
        </thead>
        <tbody>
            { /* Pour chaque personne dans le fichier JSON on affiche toutes ses informations en ligne dans le tableau */
            people.map((person)=> (
                <tr>
                    <td>{person.id}</td>
                    <td>{person.name}</td>
                    <td>{person.surname}</td>
                    <td>{person.mail}</td>
                </tr>
            )
            )
            }
        </tbody>
    </table>
    <h3>Add a new person</h3>
    {/* On créé un formulaire pour pouvoir ajouter une personne au fichier JSON */}
    <form onSubmit={handleFormSubmit}>
        <label for="id">ID : </label>
        <input type="text" name="id" value={formData.id} onChange={handleInputChange} required />
        <label for="name">Name : </label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        <label for="surname">Surname : </label>
        <input type="text" name="surname" value={formData.surname} onChange={handleInputChange} required />
        <label for="mail">Mail : </label>
        <input type="text" name="mail" value={formData.mail} onChange={handleInputChange} required />
        <button type="submit">Add</button>
      </form>
</div>
  )
}

export default Tables