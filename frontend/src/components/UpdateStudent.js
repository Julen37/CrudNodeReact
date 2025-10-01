import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStudent() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

    // function handleSubmit(event) {
    //     event.preventDefault();
    //     axios.put('http://localhost:8081/update/${id}', {id, name, email})
    //     .then(res => {
    //         console.log("Update Student", res);
    //         navigate('/');
    //     });
    // };
    function handleSubmit(event) {
        event.preventDefault();
        const updatedStudent = {name, email};
        axios.put(`http://localhost:8081/update/${id}`, updatedStudent)
        .then(res => {
            console.log(res);
            navigate('/');
        }).catch(err => console.log(err));
    };

  return (
    <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form action="" onSubmit={handleSubmit}>
                <h1>Modifier l'étudiant</h1>
                <div className='mb-2'>
                    <label htmlFor="">Nom</label>
                    <input type="text" placeholder='Entrez votre nom' className='form-control' onChange={e => setName(e.target.value)}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Entrez votre email' className='form-control' onChange={e => setEmail(e.target.value)}/>
                </div>
                <button className='btn btn-success'>Soumettre</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateStudent
