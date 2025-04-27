const letras = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N","O", "P","R", "S",
    "T", "U", "V","Z"
  ];
  
  const preguntas = {
    A: "Insecto pequeño con ocho patas.",
    B: "Animal parecido al caballo, con orejas largas.",
    C: "Animal blanco que salta y le gusta la zanahoria.",
    D: "Animal marino que salta y es muy inteligente.",
    E: "Animal muy grande con trompa larga.",
    F: "Animal muy grande que vive en el agua",
    G: "Animal doméstico que dice miau.",
    H: "Insecto pequeño, negro y que junta comida",
    I: "Reptil verde que se arrastra y le gusta el sol.",
    J: "Animal de cuello muy largo que vive en África.",
    K: "Animal gris que duerme en los árboles de Australia.",
    L: "Rey de la selva con melena grande.",
    M: "Animal que trepa árboles y come bananas.",
    N: "Animal que nada y tiene pelaje marrón.",
    Ñ: "Ave grande que corre muy rápido en el campo.",
    O: "Animal grande y peludo que duerme en invierno.",
    P: "Animal doméstico que ladra.",
    R: "Animal pequeño que come queso.",
    S: "Animal largo que se arrastra y saca la lengua.",
    T: "Felino grande con rayas negras y naranjas.",
    U: "[Contiene U] Pajaro con pico muy grande]",
    V: "Animal que da leche y dice muu.",
    Z: "Animal con cola larga y naranja"
  };
  
  const respuestas = {
    A: "araña",
    B: "burro",
    C: "conejo",
    D: "delfin",
    E: "elefante",
    F: "foca",
    G: "gato",
    H: "hormiga",
    I: "iguana",
    J: "jirafa",
    K: "koala",
    L: "león",
    M: "mono",
    N: "nutria",
    Ñ: "ñandú",
    O: "oso",
    P: "perro",
    R: "raton",
    S: "serpiente",
    T: "tigre",
    U: "Tucan",
    V: "vaca",
    Z: "zorro"
  };
  
  let letraActual = null;
  let letrasPendientes = [...letras]; // Lista de letras para recorrer
  
  function crearRosco() {
    const rosco = document.getElementById('rosco');
    const ancho = rosco.offsetWidth;
    const alto = rosco.offsetHeight;
    const radio = (Math.min(ancho, alto) / 2) - (ancho * 0.1);
    const centroX = ancho / 2;
    const centroY = alto / 2;
  
    letras.forEach((letra, index) => {
      const angulo = (index / letras.length) * 2 * Math.PI - Math.PI / 2;
      const x = centroX + radio * Math.cos(angulo) - (ancho * 0.05);
      const y = centroY + radio * Math.sin(angulo) - (ancho * 0.05);
  
      const boton = document.createElement('div');
      boton.className = 'letra';
      boton.style.left = `${x}px`;
      boton.style.top = `${y}px`;
      boton.innerText = letra;
      boton.dataset.letra = letra;
      rosco.appendChild(boton);
    });
  }
  
  function seleccionarLetra(letra) {
    letraActual = letra;
    document.getElementById('pregunta').innerText = preguntas[letra];
    document.getElementById('respuesta').value = '';
    document.getElementById('respuesta').focus();
  }
  
  function comprobar() {
    if (!letraActual) return;
  
    const respuestaUsuario = document.getElementById('respuesta').value.trim().toLowerCase();
    const respuestaCorrecta = respuestas[letraActual];
  
    const boton = document.querySelector(`.letra[data-letra="${letraActual}"]`);
  
    if (respuestaUsuario === respuestaCorrecta) {
      boton.style.backgroundColor = 'green';
    } else {
      boton.style.backgroundColor = 'red';
    }
  
    document.getElementById('pregunta').innerText = `Respuesta correcta: ${respuestaCorrecta}`;
    document.getElementById('boton-siguiente').disabled = false;
  }
  
  function pasar() {
    if (!letraActual) return;
  
    const boton = document.querySelector(`.letra[data-letra="${letraActual}"]`);
    boton.style.backgroundColor = 'yellow';
  
    document.getElementById('pregunta').innerText = '¡Pasaste esta letra!';
    document.getElementById('boton-siguiente').disabled = false;
  }
  
  function siguiente() {
    if (letrasPendientes.length === 0) {
      document.getElementById('pregunta').innerText = '¡Juego terminado!';
      return;
    }
  
    const siguienteLetra = letrasPendientes.shift();
    seleccionarLetra(siguienteLetra);
  
    document.getElementById('boton-siguiente').disabled = true;
  }
  
  window.addEventListener('resize', () => {
    document.getElementById('rosco').innerHTML = '';
    crearRosco();
  });
  
  window.onload = () => {
    crearRosco();
    siguiente(); // Empieza automáticamente
  };
  