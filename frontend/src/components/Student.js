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
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete('http://localhost:8081/student/'+id)
            window.location.reload()
        } catch(err){
            console.log(err);
        }
    };

    //Certaines fonctions en JavaScript doivent être async/await et d’autres non, tout simplement selon 
    // ce qu’elles font : si la fonction doit attendre un résultat “lent” 
    // (genre une requête vers un serveur, lire un fichier, ou appeler une API), elle doit être en async/await.

// Fonction synchrone
//     Si la fonction fait juste des calculs, du filtrage, ou manipule des données déjà en mémoire, 
// tout se fait “instantanément” : pas besoin de async / await, elle renvoie le résultat directement.

// Fonction asynchrone
//     Si la fonction attend une opération longue(réseau, lecture disque, timer), elle devient async 
//     car elle doit “attendre” sans bloquer le reste du programme.
// async rend possible l’utilisation de await pour attendre le résultat de la promesse, puis continuer le 
// code une fois le résultat reçu.

// Résumé simple
//     async / await est utile quand il faut attendre un résultat qui arrive plus tard(ex : requête Axios, fetch).
// Pas besoin de async / await quand tout se passe localement et tout de suite(ex : trier un tableau, faire une addition).

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
                                    <Link to={`update/${data.id}`} className='btn btn-primary'>Modifier</Link>
                                    <button className='btn btn-danger' onClick={e => handleDelete(data.id)}>Supprimer</button>
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
