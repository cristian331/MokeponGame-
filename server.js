const express = require("express");
const cors = require("cors");

// inicializar express como "app"
const app = express();

// Servir archivos estaticos en un endpoint de la ruta.
app.use(express.static('public'));

//Para evitar tener errores de cors
app.use(cors());

//habilitar la capacidad de recibir info en formato json
app.use(express.json());

const jugadores = [];

class Jugador {
    constructor (id) {
        this.id = id;
    }
    asignarMokepon(mokepon) {
        this.mokepon = mokepon;
    }
    actualizarPosicion(x,y){
        this.x = x;
        this.y = y;
    }
    asignarAtaques(ataques){
        this.ataques = ataques || []
    }
}

class Mokepon {
    constructor(nombre){
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.floor(Math.random()*10000)}`;

    const jugador = new Jugador(id);

    jugadores.push(jugador);

    res.setHeader('Access-Control-Allow-Origin', '*')

    res.send(id)
})

app.post('/mokepon/:jugadorId', (req, res) => {     // parametros en express con :
    const jugadorId = req.params.jugadorId || "";
    const nombreMkpn = req.body.mokepon || "";
    const mokepon = new Mokepon(nombreMkpn)

    const jugadorIndex = jugadores.findIndex(jugador => jugadorId === jugador.id);

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon);
    }
    res.end();
})  

app.post('/mokepon/:jugadorId/posicion', (req, res) => {
    const jugadorId = req.params.jugadorId || "";
    const x = req.body.x || 0;
    const y = req.body.y || 0;

    const jugadorIndex = jugadores.findIndex(jugador => jugadorId === jugador.id);

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x,y);
    }

    const enemigos = jugadores.filter(jugador => jugadorId != jugador.id)
    
    res.send({
        enemigos
    });

})

app.post('/mokepon/:jugadorId/ataques', (req, res) => {  
    const jugadorId = req.params.jugadorId || "";
    const ataquesMpkn = req.body.ataques || [];
    const jugadorIndex = jugadores.findIndex(jugador => jugadorId === jugador.id);

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataquesMpkn);
    }

    res.end();
})  

app.get('/mokepon/:jugadorId/ataques', (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find(jugador => jugador.id === jugadorId)

    res.send({
        ataquesEne: jugador.ataques
    })

})

app.listen(8080, () => {
    console.log('Server is online');
})
  