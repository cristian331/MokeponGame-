const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')

const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const mensajeResultadoParcial = document.getElementById('resultadoParcial')

const contenedorTarjetas = document.getElementById('contenedorTarjetas')

const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataquesJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let mascotaJugador
let ataquesMokepon
let ataquesMascotaSeleccionada
let botonFuego
let botonAgua
let botonTierra
let botones = []
let ataquesMokeponEnemigo = []
let secuenciaAtaqueEnemigo = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3

// section de canvas
let mascotaJugadorObjeto
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 570

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
  constructor(nombre, foto, vida, fotoMapa, id = null){
    this.id = id
    this.nombre = nombre
    this.foto = foto
    this.vida = vida
    this.ataques = []
    this.ancho = 40
    this.alto = 40
    this.x = aleatorio(0, mapa.width - this.ancho)
    this.y = aleatorio(0, mapa.height - this.alto)
    this.mapaFoto = new Image()
    this.mapaFoto.src = fotoMapa
    this.velocidadX = 0
    this.velocidadY = 0
  }  
  pintarMokepon() {
    lienzo.drawImage(
        this.mapaFoto,
        this.x,
        this.y,
        this.ancho,
        this.alto
    )
  }
}
let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')

let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')

let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')

const hipodoge_ataques = [
  {nombre: '💧', id:'boton-agua'},
  {nombre: '💧', id:'boton-agua'},
  {nombre: '💧', id:'boton-agua'},
  {nombre: '🔥', id:'boton-fuego'},
  {nombre: '🌱', id:'boton-tierra'},
]

const capipepo_ataques = [
  {nombre: '🌱', id:'boton-tierra'},
  {nombre: '🌱', id:'boton-tierra'},
  {nombre: '🌱', id:'boton-tierra'},
  {nombre: '💧', id:'boton-agua'},
  {nombre: '🔥', id:'boton-fuego'},
]

const ratigueya_ataques = [
  {nombre: '🔥', id:'boton-fuego'},
  {nombre: '🔥', id:'boton-fuego'},
  {nombre: '🔥', id:'boton-fuego'},
  {nombre: '🌱', id:'boton-tierra'},
  {nombre: '💧', id:'boton-agua'},
]

hipodoge.ataques.push(...hipodoge_ataques)
capipepo.ataques.push(...capipepo_ataques)
ratigueya.ataques.push(...ratigueya_ataques)

//hipodogeEnemigo.ataques.push(...hipodoge_ataques)
//capipepoEnemigo.ataques.push(...capipepo_ataques)
//ratigueyaEnemigo.ataques.push(...ratigueya_ataques)

mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego() {
 
  sectionSeleccionarAtaque.style.display = 'none'
  sectionReiniciar.style.display = 'none'
  sectionVerMapa.style.display = 'none'

  mokepones.forEach((Mokepon) => {
    opcionDeMokepones = `
      <input type="radio" name="mascota" id=${Mokepon.nombre} />
      <label class="tarjeta-de-mokepon" for="${Mokepon.nombre}">
      <p>${Mokepon.nombre}</p>
      <img src=${Mokepon.foto} alt=${Mokepon.nombre}>
      </label>`
    contenedorTarjetas.innerHTML += opcionDeMokepones
    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')
  })

  botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

  botonReiniciar.addEventListener('click', reiniciarJuego)

  uniserAlJuego()
}

function uniserAlJuego() {
  fetch("http://192.168.0.29:8080/unirse")
      .then(function(res){
        if(res.ok){
          res.text()
          .then(function(respuesta){
          console.log(respuesta)
          jugadorId = respuesta
          })
        }
      })

}
function seleccionarMascotaJugador() {
    
  sectionSeleccionarMascota.style.display = 'none'
  //sectionSeleccionarAtaque.style.display = 'flex'

  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id
    mascotaJugador = inputHipodoge.id
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id
    mascotaJugador = inputCapipepo.id
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id
    mascotaJugador = inputRatigueya.id
  } else {
    location.reload()
  }

  extraerAtaques(mascotaJugador)
  sectionVerMapa.style.display = 'flex'
  iniciarMapa()
  //seleccionarMascotaEnemigo()

  seleccionMokepon(mascotaJugador)

}

function seleccionMokepon(mascotaJugador) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}`,{
    method: "post",
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      mokepon: mascotaJugador
    })
  })

}

function extraerAtaques(mascotaJugador){
  for (i = 0; i < mokepones.length; i++) {
    if (mascotaJugador == mokepones[i].nombre) 
    ataquesMascotaSeleccionada = mokepones[i].ataques
    }
  mostrarAtaques(ataquesMascotaSeleccionada)
}

function mostrarAtaques(ataquesMascotaSeleccionada){
  ataquesMascotaSeleccionada.forEach((ataques) => { 
  ataquesMokepon = `<button id=${ataques.id} class="boton-de-ataque BAtaque">${ataques.nombre}</button>`
    contenedorAtaques.innerHTML += ataquesMokepon
  })
  botonFuego = document.getElementById('boton-fuego')
  botonAgua = document.getElementById('boton-agua')
  botonTierra = document.getElementById('boton-tierra')

  botones = document.querySelectorAll('.BAtaque') 
}

function secuenciaAtaques() {
  botones.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      if(e.target.textContent === '🔥') {
        ataquesJugador.push('FUEGO')
        boton.style.background = '#112f58'
        boton.disabled = true
      } else if(e.target.textContent === '💧') {
        ataquesJugador.push('AGUA')
        boton.style.background = '#112f58'
        boton.disabled = true
      } else {
        ataquesJugador.push('TIERRA')
        boton.style.background = '#112f58' 
        boton.disabled = true
      }
      //iniciarSecuenciaAtaquesEnemigo()
      if(ataquesJugador.length === 5){
        enviarAtaques()
      }
    })
  })  
}

function enviarAtaques(){
  fetch(`http://192.168.0.29:8080/mokepon/${jugadorId}/ataques`,{
    method: "post",
    headers: {
      "Content-Type": "applicaction/json"
    },
    body: JSON.stringify({
      ataques: ataquesJugador
    })
  })

  intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
  fetch(`http://192.168.0.29:8080/mokepon/${enemigoId}/ataques`)
    .then(function(res){
      if (res.ok) {
        res.json()
          .then(function({ ataques }){
            if (ataques.length === 5){
              ataqueEnemigo = ataques
              combate()
            }
          })
      }
  })
}

function seleccionarMascotaEnemigo(mascotaColisiono) {
  //let mascotaAleatoria = aleatorio(0,mokepones.length-1)

  spanMascotaEnemigo.innerHTML = mascotaColisiono.nombre
  ataquesMokeponEnemigo = mascotaColisiono.ataques
  secuenciaAtaques()
}

function iniciarSecuenciaAtaquesEnemigo(){
    if(ataquesJugador.length === 5){
     ataquesAleatorioEnemigo()
  }
}

function ataquesAleatorioEnemigo() {
  let a
  let ataqueAleatorio
  ataqueAleatorio = aleatorio(0,ataquesJugador.length -1)
  secuenciaAtaqueEnemigo[0] = ataqueAleatorio 
  
  for (let j=0; j < ataquesJugador.length-1; j++){
    a = secuenciaAtaqueEnemigo.length
    ataqueAleatorio = aleatorio(0,ataquesJugador.length -1)
    for (let i = 0; i < a; i++) {
      if (ataqueAleatorio != secuenciaAtaqueEnemigo[i]) {
        secuenciaAtaqueEnemigo[j + 1] = ataqueAleatorio
      }else if (ataqueAleatorio == secuenciaAtaqueEnemigo[i] && i==0) {
        j--
        i= ataquesJugador.length + 2
      }else if (ataqueAleatorio == secuenciaAtaqueEnemigo[i] && i!=0) {
        secuenciaAtaqueEnemigo.pop()
        j--
        i= ataquesJugador.length + 2
      }
    }
  }
  for(i = 0; i < secuenciaAtaqueEnemigo.length; i++ ){
    if(ataquesMokeponEnemigo[secuenciaAtaqueEnemigo[i]].nombre == '🔥'){
      ataqueEnemigo[i] = 'FUEGO'
    } else if(ataquesMokeponEnemigo[secuenciaAtaqueEnemigo[i]].nombre == '💧'){
      ataqueEnemigo[i] = 'AGUA'
    }else {
      ataqueEnemigo[i] = 'TIERRA'
    }
  }
  //console.log(ataqueEnemigo,ataquesJugador)
  iniciarCombate()
}

function iniciarCombate(){
  if(secuenciaAtaqueEnemigo.length === 5){
    combate()
  }
}

function indexAmbosOponentes(jugador,enemigo) {
  indexAtaqueJugador = ataquesJugador[jugador]
  indexAtaqueEnemigo = ataqueEnemigo[enemigo]
  
}

function combate() {
  clearInterval(intervalo)

  for (let index=0; index < ataquesJugador.length; index++) {
    if(ataquesJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index)
      crearMensaje("😒")
    } else if(ataquesJugador[index] == 'FUEGO' && ataqueEnemigo[index] == 'TIERRA') {
      indexAmbosOponentes(index, index)
      crearMensaje("😊")
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador
    } else if(ataquesJugador[index] == 'AGUA' && ataqueEnemigo[index] == 'FUEGO') {
      indexAmbosOponentes(index, index)
      crearMensaje("😊")
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador
    }else if(ataquesJugador[index] == 'TIERRA' && ataqueEnemigo[index] == 'AGUA') {
      indexAmbosOponentes(index, index)
      crearMensaje("😊")
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador
    } else {
      indexAmbosOponentes(index, index)
      crearMensaje("😖")
      victoriasEnemigo++
      spanVidasEnemigo.innerHTML = victoriasEnemigo
    }
  }

  revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
      crearMensajeFinal("Empate :|")
    } else if (victoriasJugador < victoriasEnemigo) {
      crearMensajeFinal('Lo siento, perdiste :(')
    }else {
      crearMensajeFinal("FELICITACIONES! Ganaste :)")
    }
}

function crearMensaje(resultado) {

    
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    let nuevoMensajeResultadoParcial = document.createElement('p')

    nuevoMensajeResultadoParcial.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
    mensajeResultadoParcial.appendChild(nuevoMensajeResultadoParcial)
}

function crearMensajeFinal(resultadoFinal) {
  
  sectionMensajes.innerHTML = resultadoFinal
  
  sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
  mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
  mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
  lienzo.clearRect(0, 0, mapa.width, mapa.height)
  lienzo.drawImage(
      mapaBackground,
      0,
      0,
      mapa.width,
      mapa.height
  )
  mascotaJugadorObjeto.pintarMokepon()
  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
  //console.log(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

  mokeponesEnemigos.forEach(function (mokepon){
    mokepon.pintarMokepon()
    revisarColision(mokepon)
  })
}

function enviarPosicion(x, y) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      x,
      y
    })
  })
  .then(function (res) {
    if (res.ok) {
        res.json()
            .then(function ({ enemigos }) {
            //console.log(enemigos)
            mokeponesEnemigos = enemigos.map(function (enemigo) {
              let mokeponEnemigo = null
              const mokeponNombre = enemigo.mokepon.nombre || ""
              if(mokeponNombre === "Hipodoge"){
                mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', enemigo.id)
              }else if(mokeponNombre === "Capipepo"){
                mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', enemigo.id)
              }else if(mokeponNombre === "Ratigueya"){
                mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', enemigo.id)
              }
              mokeponEnemigo.x = enemigo.x
              mokeponEnemigo.y = enemigo.y

              return mokeponEnemigo
          })
        })
      }
    })
}

function moverDerecha() {
  mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
  mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
  mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
  mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
  mascotaJugadorObjeto.velocidadX = 0
  mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
  switch (event.key) {
      case 'ArrowUp':
          moverArriba()
          break
      case 'ArrowDown':
          moverAbajo()
          break
      case 'ArrowLeft':
          moverIzquierda()
          break
      case 'ArrowRight':
          moverDerecha()
          break
      default:
          break
  }
}

function iniciarMapa() {

  //mapa.width = 550
  //mapa.height = 400
  mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
  //console.log(mascotaJugadorObjeto, mascotaJugador);
  intervalo = setInterval(pintarCanvas, 50)
  
  window.addEventListener('keydown', sePresionoUnaTecla)

  window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
  for (let i = 0; i < mokepones.length; i++) {
      if (mascotaJugador === mokepones[i].nombre) {
          return mokepones[i]
      }
      
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y
  const abajoEnemigo = enemigo.y + enemigo.alto
  const derechaEnemigo = enemigo.x + enemigo.ancho
  const izquierdaEnemigo = enemigo.x

  const arribaMascota = 
      mascotaJugadorObjeto.y
  const abajoMascota = 
      mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
  const derechaMascota = 
      mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
  const izquierdaMascota = 
      mascotaJugadorObjeto.x

  if(
      abajoMascota < arribaEnemigo ||
      arribaMascota > abajoEnemigo ||
      derechaMascota < izquierdaEnemigo ||
      izquierdaMascota > derechaEnemigo
  ) {
      return
  }

  detenerMovimiento()
  clearInterval(intervalo)
  console.log('Se detecto una colision');

  enemigoId = enemigo.id
  sectionSeleccionarAtaque.style.display = 'flex'
  sectionVerMapa.style.display = 'none'
  const mascotaColisiono = enemigo
  seleccionarMascotaEnemigo(mascotaColisiono)
}
window.addEventListener('load', iniciarJuego)
