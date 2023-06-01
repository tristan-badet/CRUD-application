import React, { useState } from "react";

import axios from "axios";

//j'importe la fake database

import People from "./people.json";


function JsonTable(){
    
    //je récupère les valeurs de mon fichier json

   const [persons, setPersons] = useState(People); 

   const [addPersonInformations, setAddPersonInformations] = useState({id:'', name:'', surname:'', mail:''});

   const addFormInformations = (event) =>{
    event.preventDefault();

    /* On récupère le nom de l'input */

    const fieldName = event.target.getAttribute('name');

    /* On récupère l'information que l'on a mis dans l'input */

    const fieldInfo = event.target.value;

    /* On créé une nouvelle constante qui récupère les informations à vide */

    const newInfo = {...addPersonInformations};

    /* On rajoute les informations que l'on a rentré dans les valeurs des inputs correspondants */

    newInfo[fieldName] = fieldInfo;

    setAddPersonInformations(newInfo);
   };

   const submitFormInformations = async (event) =>{
    event.preventDefault();

    const newPerson = {id: addPersonInformations.id, name:addPersonInformations.name, surname:addPersonInformations.surname, mail:addPersonInformations.mail};

    const newPersons = [...persons, newPerson];
        setPersons(newPersons);
   }


   //je créé le tableau avec le nom des colonnes et les data du json en

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
                        persons.map((person)=> (
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
                <form onSubmit={submitFormInformations}>
                    <label for="id">ID : </label>
                    <input type="text" name="id" onChange={addFormInformations} required></input>
                    <label for="id">Name : </label>
                    <input type="text" name="name" onChange={addFormInformations}  required></input>
                    <label for="id">Surname : </label>
                    <input type="text" name="surname" onChange={addFormInformations}  required></input>
                    <label for="id">Mail : </label>
                    <input type="text" name="mail" onChange={addFormInformations}  required></input>
                    <button type="submit">Add</button>
                </form>
            </div>
        )
}
export default JsonTable;