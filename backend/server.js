const express = require("express"); // création de const express qui permet d'acceder a express (qui est dans node_modules)
const cors = require("cors"); // permet aux differents serveurs d'échanger des données entre eux
const mysql = require("mysql"); 

const app = express(); // permet d'utiliser les méthodes de l'objet express dans la variable "app"

const corsOptions = {
    origin: [ // Liste des origines autorisées, seules ces adresses pourront communiquer avec ton backend.
        'http://localhost:3000', // Serveur frontend (React par exemple), visible dans le navigateur.
        'http://localhost:8081', // Serveur backend (parfois nécessaire quand on teste via un autre port).
    ],
    optionsSuccessStatus: 200, // Code de réponse renvoyé pour une requête pré-vol (preflight request). // on met en 200, et pas en 204 pcq certains browser ne supporte pas le 204, pour assurer la comppatibilité
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Méthodes HTTP autorisées pour les requêtes cross-origin
    headers: 'Content-Type,Authorization', // En-têtes HTTP que le client est autorisé à utiliser dans ses requêtes
    credentials: true, // Autorise l'envoi de cookies, tokens d'auth (headers Authorization), et autres informations d'identification avec les requêtes cross-origin.
};

// Création d'une connexion à la bdd MySQL
const database = mysql.createConnection({
    host: 'localhost', // Adresse IP ou nom de domaine du serveur MySQL
    user: 'root', // Nom d'utilisateur pour se connecter à la bdd
    password: '', // Mot de passe pour se connecter à la bdd
    database: 'crudnodereact', // Nom de la bdd à utiliser
});

// Route pour récupérer tous les étudiants
app.get("/", (req, res) => { //crée un endpoint/route a l'adress "/" et ensuite attend une requete (req) et une reponse (res)
    // res.json("Salut à toi depuis le backend");
    const sql = "SELECT * FROM student"; // Requête SQL pour récupérer tous les étudiants
    database.query(sql, (err, data) => { // Exécution de la requête SQL
        if(err) return res.json("Error"); // Si une erreur se produit, renvoie un message d'erreur
        return res.json(data); // Sinon, renvoie les données récupérées
    });
});

// doit etre tout en bas, toujours
app.listen(8081, () => { // attribue le port 8081 au serveur et execute une fonction anonyme listen 
    console.log('Server is running on port 8081'); // s'affiche quand il est run
})