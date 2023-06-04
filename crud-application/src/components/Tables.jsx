import React, { useEffect, useState } from "react";
import {
  getPeople,
  addPerson,
  deletePerson,
  editPerson,
} from "../services/peopleAPI";
import styles from "./Tables.module.css";

const Tables = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    surname: "",
    mail: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = (person) => {
    setFormData(person);
    setIsEditing(true);
  };

  const [people, setPeople] = useState([]);
  const handleDelete = async (id) => {
    try {
      await deletePerson(id);
      setPeople((prevPeople) =>
        prevPeople.filter((person) => person.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      const result = await getPeople();
      setPeople(result);
    })();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const idExist = people.some((person) => formData.id === person.id);

    try {
      let updatedPeople = [...people];
      let updatedFormData = { id: "", name: "", surname: "", mail: "" };

      if (idExist) {
        const updatedPerson = await editPerson(formData.id, formData);
        updatedPeople = people.map((person) =>
          person.id === formData.id ? updatedPerson : person
        );
        setIsEditing(false);
      } else {
        const newPerson = await addPerson(formData);
        updatedPeople = [...people, newPerson];
      }

      setPeople(updatedPeople);
      setFormData(updatedFormData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Mail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.surname}</td>
              <td>{person.mail}</td>
              <td>
                <button
                  className={styles.btn}
                  onClick={() => handleDelete(person.id)}
                >
                  Delete
                </button>
                <button
                  className={styles.btn}
                  onClick={() => handleEdit(person)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add a new person</h3>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="id">ID : </label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="name">Name : </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="surname">Surname : </label>
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="mail">Mail : </label>
        <input
          type="text"
          name="mail"
          value={formData.mail}
          onChange={handleInputChange}
          required
        />
        <button className={styles.btn} type="submit">
          {isEditing ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default Tables;
