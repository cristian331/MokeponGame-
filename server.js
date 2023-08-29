const express = require("express");
const cors = require("cors");

// inicializar express como "app"
const app = express();

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
    console.log(jugadores);
    console.log(jugadorId);
    res.end();
})  


app.listen(8080, () => {
    console.log('Server is online');
})
  