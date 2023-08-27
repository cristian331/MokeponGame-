function secuenciaAleatoria () {

  let ataqueAleatorio
  let a
  let secuenciaAtaqueEnemigo = []
  function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  ataqueAleatorio = aleatorio(0, 4)
  secuenciaAtaqueEnemigo[0] = ataqueAleatorio
  // console.log(secuenciaAtaqueEnemigo[0])

  for (let j = 0; j < 4; j++) {
    a = secuenciaAtaqueEnemigo.length
    ataqueAleatorio = aleatorio(0, 4)
    // console.log(j,a,ataqueAleatorio,secuenciaAtaqueEnemigo)
    //console.log(ataqueAleatorio)
    //console.log(secuenciaAtaqueEnemigo)
    for (let i = 0; i < a; i++) {
      if (ataqueAleatorio != secuenciaAtaqueEnemigo[i]) {
        secuenciaAtaqueEnemigo[j + 1] = ataqueAleatorio
      }else if (ataqueAleatorio == secuenciaAtaqueEnemigo[i] && i==0) {
        j--
        i= 7
      }else if (ataqueAleatorio == secuenciaAtaqueEnemigo[i] && i!=0) {
        secuenciaAtaqueEnemigo.pop()
        j--
        i= 7
      }
    }
  }
  // console.log(secuenciaAtaqueEnemigo)
  return secuenciaAtaqueEnemigo
}