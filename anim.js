(function () {
  var jardin = document.getElementById("jardin");
  var audio = document.getElementById("cancion");
  var letra = document.getElementById("letra");
  var dedicatoria = document.getElementById("dedicatoria");
  var botonSonido = document.getElementById("sonido");
  var botonPantalla = document.getElementById("pantalla");
  var raiz = document.documentElement;
  var pedirPantalla = raiz.requestFullscreen || raiz.webkitRequestFullscreen;
  var salirPantalla = document.exitFullscreen || document.webkitExitFullscreen;
  var parametros = new URLSearchParams(location.search);

  var lineas = [
    { texto: "Ay, ella sabe", tiempo: 8.48, palabras: [8.48, 9.4, 9.5] },
    { texto: "Ella sabe que siente conmigo", tiempo: 10.82, palabras: [10.82, 12.06, 12.52, 12.74, 13.06] },
    { texto: "Y todos saben", tiempo: 13.84, palabras: [13.84, 14.26, 14.68] },
    { texto: "Aunque dice que somos amigos", tiempo: 15.98, palabras: [15.98, 16.86, 17.26, 17.52, 17.9] },
    { texto: "A ella le gusta, le gusta que hablen de mí", tiempo: 18.58, palabras: [18.58, 18.94, 19.02, 19.32, 21.14, 21.74, 21.96, 22.18, 22.4, 22.62] },
    { texto: "Pero se asusta y dice que no es así", tiempo: 23.36, palabras: [23.36, 23.72, 24.06, 25.08, 26.1, 26.84, 27.18, 27.36, 27.56] },
    { texto: "Mira yo ya no sé qué quiere esconder", tiempo: 27.94, palabras: [27.94, 29, 29.14, 29.36, 29.56, 29.8, 30.16, 30.52] },
    { texto: "Le digo una y otra vez que", tiempo: 31.04, palabras: [31.04, 31.36, 31.7, 31.96, 32.12, 32.44, 32.98] },
    { texto: "Se deje invitar si no es a rumbear", tiempo: 33.38, palabras: [33.38, 33.78, 34.1, 34.38, 34.66, 34.94, 35.22, 35.5] },
    { texto: "Al menos poderla ver", tiempo: 35.98, palabras: [35.98, 36.18, 36.46, 37.28] },
    { texto: "Quiero saber ye ye", tiempo: 37.6, palabras: [37.6, 38.12, 39.16, 39.7] },
    { texto: "Qué puedo hacer ye ye", tiempo: 39.96, palabras: [39.96, 40.22, 40.6, 41.42, 41.98] },
    { texto: "Pa' que me des un beso de esos que sabes que das tan bien", tiempo: 42.46, palabras: [42.46, 42.7, 42.94, 43.36, 43.78, 44.4, 45.02, 45.2, 45.38, 45.66, 45.99, 46.33, 46.66, 46.9] },
    { texto: "Quiero saber ye ye", tiempo: 47.18, palabras: [47.18, 47.66, 48.7, 49.08] },
    { texto: "Cómo tú haces ye ye", tiempo: 49.56, palabras: [49.56, 50.08, 50.42, 50.96, 51.68] },
    { texto: "Para esconder tan bien", tiempo: 52.12, palabras: [52.12, 52.5, 53.2, 53.88] },
    { texto: "Eso que sientes cuando me ves", tiempo: 54.66, palabras: [54.66, 55.1, 55.36, 55.68, 56, 56.56] },
    { texto: "Cuando me ves niña yo me derrito", tiempo: 56.94, palabras: [56.94, 57.4, 57.8, 58, 58.44, 58.6, 58.78] },
    { texto: "Ya te lo dije pero lo repito", tiempo: 59.42, palabras: [59.42, 59.74, 59.92, 60.18, 60.5, 60.94, 61.18] },
    { texto: "Me cansé de ese jueguito", tiempo: 61.86, palabras: [61.86, 62.22, 62.94, 63.44, 63.62] },
    { texto: "De querernos pero de lejitos", tiempo: 64.24, palabras: [64.24, 64.74, 65.38, 65.7, 66.08] },
    { texto: "Venga bebamos, bebamos, bebamos", tiempo: 66.66, palabras: [66.66, 67.08, 67.86, 68.4] },
    { texto: "Pa' que tú veas qué bien la pasamos", tiempo: 69.08, palabras: [69.08, 69.48, 69.54, 69.8, 70.2, 70.32, 70.54, 70.74] },
    { texto: "Va siendo tiempo de que lo digamos", tiempo: 71.44, palabras: [71.44, 71.71, 71.98, 72.48, 72.8, 72.94, 73.18] },
    { texto: "Nos queremos pero lo negamos", tiempo: 73.76, palabras: [73.76, 74.36, 74.78, 75.34, 75.6] },
    { texto: "Quiero saber ye ye", tiempo: 76.12, palabras: [76.12, 76.5, 77.26, 77.92] },
    { texto: "Qué puedo hacer ye ye", tiempo: 78.34, palabras: [78.34, 78.85, 79.35, 79.86, 80.4] },
    { texto: "Pa' que me des un beso de esos que sabes que das tan bien", tiempo: 80.92, palabras: [80.92, 81.22, 81.34, 81.78, 82.18, 82.78, 83.44, 83.62, 83.8, 84.06, 84.5, 84.78, 85.04, 85.3] },
    { texto: "Quiero saber ye ye", tiempo: 85.58, palabras: [85.58, 86.02, 87.28, 87.8] },
    { texto: "Cómo tú haces ye ye", tiempo: 88.1, palabras: [88.1, 88.46, 88.82, 89.5, 90.2] },
    { texto: "Para esconder tan bien", tiempo: 90.56, palabras: [90.56, 90.92, 91.56, 92.28] },
    { texto: "Eso que sientes cuando me ves", tiempo: 93.02, palabras: [93.02, 93.52, 93.76, 94.06, 94.4, 94.96] },
    { texto: "Ay, dime qué quieres", tiempo: 95.82, palabras: [95.82, 96.18, 97.1, 97.26] },
    { texto: "Tú sabes que me prefieres", tiempo: 98.34, palabras: [98.34, 98.54, 98.84, 99.16, 99.36] },
    { texto: "Ay, niña, dime si quieres", tiempo: 100.1, palabras: [100.1, 100.36, 100.92, 101.82, 102.1] },
    { texto: "Tú sabes que a mí me tienes", tiempo: 102.78, palabras: [102.78, 103.34, 103.7, 103.96, 104.06, 104.22, 104.54] },
    { texto: "Ay, mira, dime qué quieres", tiempo: 104.94, palabras: [104.94, 105.18, 105.66, 105.82, 106.86] },
    { texto: "Tú sabes que me prefieres", tiempo: 107.94, palabras: [107.94, 108.14, 108.5, 108.78, 108.98] },
    { texto: "Ay, dime si quieres", tiempo: 110.04, palabras: [110.04, 110.66, 110.94, 111.68] },
    { texto: "Tú sabes que a mí me tienes", tiempo: 112.36, palabras: [112.36, 112.92, 113.3, 113.38, 113.46, 113.54, 113.88] },
    { texto: "Quiero saber", tiempo: 114.42, palabras: [114.42, 114.9] },
    { texto: "Qué puedo hacer (qué puedo hacer)", tiempo: 116.6, palabras: [116.6, 116.6, 117.42, 117.77, 118.12, 118.47] },
    { texto: "Pa' que me des un beso de esos que sabes que das tan bien", tiempo: 119.02, palabras: [119.02, 119.46, 119.74, 120.12, 120.56, 121.2, 121.82, 122, 122.22, 122.48, 122.81, 123.13, 123.46, 123.72] },
    { texto: "Quiero saber (quiero saber)", tiempo: 124, palabras: [124, 124.48, 124.9, 125.32] },
    { texto: "Qué puedo hacer (qué puedo hacer)", tiempo: 126.2, palabras: [126.2, 126.67, 127.14, 127.47, 127.79, 128.12] },
    { texto: "Pa' que me des un beso de esos que sabes que das tan bien", tiempo: 128.64, palabras: [128.64, 129.08, 129.34, 129.76, 130.14, 130.72, 131.42, 131.56, 131.84, 132.08, 132.41, 132.73, 133.06, 133.46] },
    { texto: "Quiero saber ye ye", tiempo: 133.62, palabras: [133.62, 134.06, 135.34, 135.9] },
    { texto: "Qué puedo hacer ye ye", tiempo: 136.1, palabras: [136.1, 136.22, 136.6, 137.02, 137.44] },
    { texto: "Pa' que me des un beso de esos que sabes que das tan bien", tiempo: 138.36, palabras: [138.36, 138.66, 138.94, 139.38, 139.76, 140.38, 141, 141.2, 141.4, 141.66, 142.08, 142.37, 142.66, 143.04] },
    { texto: "Quiero saber ye ye", tiempo: 143.22, palabras: [143.22, 143.72, 144.14, 144.56] },
    { texto: "Cómo tú haces ye ye", tiempo: 145.5, palabras: [145.5, 145.9, 146.4, 146.82, 147.24] },
    { texto: "Para esconder tan bien", tiempo: 147.92, palabras: [147.92, 148.48, 149.15, 149.82] },
    { texto: "Eso que sientes cuando me ves", tiempo: 150.62, palabras: [150.62, 151.1, 151.36, 151.68, 151.98, 152.35] },
    { texto: "Ay, eso que sientes cuándo me ves", tiempo: 152.92, palabras: [152.92, 153.46, 155.9, 156.12, 156.48, 156.8, 157.22] },
    { texto: "Eso que sientes cuando me ves", tiempo: 157.98, palabras: [157.98, 159.38, 160.96, 161.26, 161.58, 162] },
  ];
  var DURACION_LINEA = 6;
  var DEDICATORIA_DESDE = 1.5;
  var DEDICATORIA_HASTA = 7.6;
  var DEDICATORIA_FINAL = 164.5;

  var usarReloj = false;
  var inicioReloj = 0;
  var desfase = parseFloat(parametros.get("t")) || 0;
  var lineaActual = -2;
  var palabrasVistas = [];

  function segundos() {
    if (usarReloj) return (desfase + (performance.now() - inicioReloj) / 1000) % (audio.duration || 168.3);
    return audio.currentTime;
  }

  function buscarLinea(t) {
    for (var i = lineas.length - 1; i >= 0; i--) {
      if (t >= lineas[i].tiempo) {
        var fin = lineas[i].tiempo + DURACION_LINEA;
        if (lineas[i + 1]) fin = Math.min(fin, lineas[i + 1].tiempo);
        return t < fin ? i : -1;
      }
    }
    return -1;
  }

  function pintar() {
    var t = segundos();
    var i = buscarLinea(t);
    if (i !== lineaActual) {
      lineaActual = i;
      if (i >= 0) {
        letra.innerHTML =
          '<span class="letra__original">' +
          lineas[i].texto
            .split(" ")
            .map(function (palabra, n) {
              return '<span style="--i:' + n + '">' + palabra + "</span>";
            })
            .join(" ") +
          "</span>";
        palabrasVistas = letra.querySelectorAll(".letra__original span");
      }
      letra.classList.toggle("visible", i >= 0);
    }
    if (i >= 0) {
      // Cada palabra se pinta cuando llega su momento en la canción
      var marcas = lineas[i].palabras;
      for (var n = 0; n < palabrasVistas.length; n++) {
        palabrasVistas[n].classList.toggle("cantada", t >= marcas[n]);
      }
    }
    var mostrar =
      (t >= DEDICATORIA_DESDE && t < DEDICATORIA_HASTA) || t >= DEDICATORIA_FINAL;
    dedicatoria.classList.toggle("visible", mostrar);
    requestAnimationFrame(pintar);
  }

  function activarReloj() {
    usarReloj = true;
    inicioReloj = performance.now();
  }

  function abrir(conSonido) {
    document.body.classList.add("abierto");
    botonPantalla.hidden = !pedirPantalla;
    jardin.classList.remove("quieto");
    if (conSonido) {
      botonSonido.hidden = false;
      audio.play().catch(activarReloj);
    } else {
      activarReloj();
    }
    requestAnimationFrame(pintar);
  }

  document.getElementById("abrir").addEventListener("click", function () {
    abrir(true);
  });

  botonSonido.addEventListener("click", function () {
    audio.muted = !audio.muted;
    botonSonido.textContent = audio.muted ? "Activar sonido" : "Silenciar";
  });

  function enPantallaCompleta() {
    return document.fullscreenElement || document.webkitFullscreenElement;
  }

  botonPantalla.addEventListener("click", function () {
    if (enPantallaCompleta()) salirPantalla.call(document);
    else pedirPantalla.call(raiz);
  });

  ["fullscreenchange", "webkitfullscreenchange"].forEach(function (evento) {
    document.addEventListener(evento, function () {
      botonPantalla.textContent = enPantallaCompleta() ? "Salir de pantalla completa" : "Pantalla completa";
    });
  });

  // Reparte elementos decorativos con posiciones y ritmos distintos
  window.sembrar = function (selector, cantidad, clase) {
    var destino = document.querySelector(selector);
    for (var i = 0; i < cantidad; i++) {
      var e = document.createElement("i");
      var a = Math.random;
      e.className = clase;
      e.style.cssText =
        "--x:" + (a() * 100).toFixed(2) +
        ";--y:" + (a() * 100).toFixed(2) +
        ";--s:" + (0.4 + a() * 0.9).toFixed(2) +
        ";--t:" + (6 + a() * 10).toFixed(2) + "s" +
        ";--r:" + a().toFixed(2) +
        ";animation-delay:-" + (a() * 16).toFixed(2) + "s";
      destino.appendChild(e);
    }
  };

  // ?demo abre sin sonido, ?demo&t=47 salta a ese segundo de la letra
  if (parametros.has("demo")) abrir(false);
})();
