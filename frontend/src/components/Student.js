import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Student() {

    const [student, setStudent] = useState([])

    // useEffect(() => { // useEffect est utilisé pour récupérer les données du serveur lorsque le composant est mount
    //     axios.get('http://localhost:8081')
    //     .then(res => console.log(res)) // response
    //     .catch(err => console.log(err)); // error
    // }, []) // tableau pour qu'il s'execute une seule fois au mount
    
    useEffect(() => { 
        axios.get('http://localhost:8081')
        .then(res => setStudent(res.data))
        .catch(err => console.log(err));
    }, [])

  return (
    <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <Link to="/create" className='btn btn-success'>Ajouter</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        student.map((data, i) => (
                            <tr key={i}>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>
                                    <button className='btn btn-primary'>Modifier</button>
                                    <button className='btn btn-danger'>Supprimer</button>
                                </td>
                            </tr>
                        ))
                    }          
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Student
