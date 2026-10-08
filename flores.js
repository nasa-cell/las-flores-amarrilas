(function () {
  var serie = 0;

  function degradado(base, punta) {
    var id = "petalo-" + ++serie;
    return {
      relleno: "url(#" + id + ")",
      def:
        '<defs><linearGradient id="' + id + '" x1="0" y1="1" x2="0" y2="0">' +
        '<stop offset="0" stop-color="' + base + '"/><stop offset="1" stop-color="' + punta + '"/>' +
        "</linearGradient></defs>",
    };
  }

  function anillo(cantidad, giro, trazo, relleno, desde, extra) {
    var s = "";
    for (var i = 0; i < cantidad; i++) {
      s +=
        '<g transform="rotate(' + (giro + (360 / cantidad) * i).toFixed(2) + ')">' +
        '<path class="pt" style="--n:' + (desde + i) + '" d="' + trazo + '" fill="' + relleno + '" ' + (extra || "") + "/></g>";
    }
    return s;
  }

  // lado en vmin; si no se indica, manda el tamaño de la hoja de estilos
  function svg(clase, caja, lado, alto, contenido) {
    var medida = lado ? ' style="width:' + lado + "vmin;height:" + lado * alto + 'vmin"' : "";
    return '<svg class="cabeza cabeza--' + clase + '" viewBox="' + caja + '"' + medida + ">" + contenido + "</svg>";
  }

  function girasol(c, lado) {
    var g = degradado(c.base, c.punta);
    return svg("girasol", "-50 -50 100 100", lado, 1,
      g.def +
      anillo(16, 11.25, "M0,-12 C7,-22 6,-38 0,-48 C-6,-38 -7,-22 0,-12Z", c.fondo, 0) +
      anillo(16, 0, "M0,-12 C7,-22 6,-36 0,-44 C-6,-36 -7,-22 0,-12Z", g.relleno, 8) +
      '<g class="centro"><circle r="15" fill="#3d200a"/>' +
      '<circle r="12.5" fill="none" stroke="#9a6420" stroke-width="2" stroke-dasharray="1.2 1.9"/>' +
      '<circle r="9" fill="none" stroke="#7d4d16" stroke-width="2" stroke-dasharray="1.2 1.9"/>' +
      '<circle r="5.5" fill="none" stroke="#9a6420" stroke-width="2" stroke-dasharray="1.2 1.9"/>' +
      '<circle r="2" fill="#b98232"/></g>');
  }

  function margarita(c, lado) {
    var g = degradado(c.base, c.punta);
    return svg("margarita", "-50 -50 100 100", lado, 1,
      g.def +
      anillo(13, 0, "M0,-9 C10,-18 10,-40 0,-47 C-10,-40 -10,-18 0,-9Z", g.relleno, 0) +
      '<g class="centro"><circle r="11" fill="' + c.centro + '"/>' +
      '<circle r="7" fill="none" stroke="' + c.puntos + '" stroke-width="1.4" stroke-dasharray="0.6 2.2" stroke-linecap="round"/>' +
      '<circle r="3.4" fill="none" stroke="' + c.puntos + '" stroke-width="1.4" stroke-dasharray="0.6 2.2" stroke-linecap="round"/></g>');
  }

  function tulipan(c, lado) {
    var g = degradado(c.base, c.punta);
    return svg("tulipan", "-50 -80 100 90", lado, 0.9,
      g.def +
      '<path class="pt pt--centro" d="M0,0 C-16,-14 -14,-52 0,-74 C14,-52 16,-14 0,0Z" fill="' + c.fondo + '"/>' +
      '<path class="pt pt--izq" d="M0,0 C-26,-6 -31,-42 -19,-68 C-6,-50 2,-22 0,0Z" fill="' + g.relleno + '"/>' +
      '<path class="pt pt--der" d="M0,0 C26,-6 31,-42 19,-68 C6,-50 -2,-22 0,0Z" fill="' + g.relleno + '"/>' +
      '<path class="pt pt--frente" d="M0,0 C-15,-10 -13,-40 0,-56 C13,-40 15,-10 0,0Z" fill="' + c.frente + '"/>');
  }

  function rosa(c, lado) {
    var g = degradado(c.medio, c.claro);
    var petalo = "M0,-4 C26,-10 30,-42 0,-48 C-30,-42 -26,-10 0,-4Z";
    var borde = 'stroke="' + c.oscuro + '" stroke-width="1.2"';
    return svg("rosa", "-50 -50 100 100", lado, 1,
      g.def +
      anillo(5, 0, petalo, c.medio, 0, borde) +
      '<g transform="scale(0.74) rotate(36)">' + anillo(5, 0, petalo, g.relleno, 5, borde) + "</g>" +
      '<g transform="scale(0.5) rotate(10)">' + anillo(4, 0, petalo, c.claro, 10, borde) + "</g>" +
      '<g class="centro"><circle r="7" fill="' + c.medio + '"/>' +
      '<path d="M-5,1 a5,5 0 1,1 5,5 a3.2,3.2 0 1,1 -3.2,-3.2" fill="none" stroke="' + c.oscuro + '" stroke-width="1.6" stroke-linecap="round"/></g>');
  }

  // Rosa de muchos pétalos, tipo rosa de jardín
  function rosaLlena(c, lado) {
    var g = degradado(c.medio, c.claro);
    var petalo = "M0,-4 C18,-10 21,-40 0,-48 C-21,-40 -18,-10 0,-4Z";
    var borde = 'stroke="' + c.oscuro + '" stroke-width="1.1"';
    return svg("rosa", "-50 -50 100 100", lado, 1,
      g.def +
      anillo(8, 0, petalo, c.medio, 0, borde) +
      '<g transform="scale(0.8) rotate(22)">' + anillo(7, 0, petalo, g.relleno, 6, borde) + "</g>" +
      '<g transform="scale(0.6) rotate(8)">' + anillo(6, 0, petalo, c.claro, 12, borde) + "</g>" +
      '<g transform="scale(0.4) rotate(30)">' + anillo(5, 0, petalo, g.relleno, 17, borde) + "</g>" +
      '<g class="centro"><circle r="6" fill="' + c.medio + '" ' + borde + "/>" +
      '<path d="M-3,1 a3,3 0 1,1 3,3" fill="none" stroke="' + c.oscuro + '" stroke-width="1.4" stroke-linecap="round"/></g>');
  }

  // Rosa vista de frente, con los pétalos enrollados en espiral
  function rosaEspiral(c, lado) {
    var borde = 'stroke="' + c.oscuro + '" stroke-width="1.3"';
    var vueltas = "";
    for (var i = 0; i < 6; i++) {
      var radio = 36 - i * 5.8;
      var angulo = i * 2.4;
      vueltas +=
        '<circle class="pt" style="--n:' + (6 + i * 2) + '" cx="' + (Math.cos(angulo) * 3.4).toFixed(2) +
        '" cy="' + (Math.sin(angulo) * 3.4).toFixed(2) + '" r="' + radio.toFixed(1) +
        '" fill="' + (i % 2 ? c.claro : c.medio) + '" ' + borde + "/>";
    }
    return svg("rosa", "-50 -50 100 100", lado, 1,
      anillo(6, 0, "M0,-4 C26,-10 30,-42 0,-48 C-30,-42 -26,-10 0,-4Z", c.medio, 0, borde) +
      vueltas +
      '<g class="centro"><path d="M-4,1 a4,4 0 1,1 4,4 a2.4,2.4 0 1,1 -2.4,-2.4" fill="none" stroke="' + c.oscuro +
      '" stroke-width="1.5" stroke-linecap="round"/></g>');
  }

  // Capullo de rosa visto de lado, con sus hojitas verdes
  function rosaCapullo(c, lado) {
    return svg("tulipan", "-50 -80 100 90", lado, 0.9,
      '<path class="pt pt--centro" d="M0,0 C-30,-8 -30,-50 -8,-66 C0,-73 8,-72 10,-64 C30,-48 30,-8 0,0Z" fill="' + c.medio +
      '" stroke="' + c.oscuro + '" stroke-width="1.2"/>' +
      '<path class="pt pt--centro" d="M-8,-66 C10,-52 16,-28 5,-6" fill="none" stroke="' + c.oscuro + '" stroke-width="1.4" stroke-linecap="round"/>' +
      '<path class="pt pt--frente" d="M0,0 C-25,-10 -23,-44 -5,-58 C10,-40 14,-16 0,0Z" fill="' + c.claro +
      '" stroke="' + c.oscuro + '" stroke-width="1.1"/>' +
      '<path class="pt pt--izq" d="M0,0 C-14,-2 -22,-14 -24,-27 C-10,-22 -2,-10 0,0Z" fill="#3f9a3a"/>' +
      '<path class="pt pt--der" d="M0,0 C14,-2 22,-14 24,-27 C10,-22 2,-10 0,0Z" fill="#2f8431"/>');
  }

  var rosas = {
    roja: { oscuro: "#7d0718", medio: "#d4203a", claro: "#ff6a7c", brillo: "#ff3b55" },
    rosada: { oscuro: "#a02a62", medio: "#f277a8", claro: "#ffc6dc", brillo: "#ff7ab5" },
    blanca: { oscuro: "#b9a9b4", medio: "#f1e6ea", claro: "#ffffff", brillo: "#ffe9f2" },
    amarilla: { oscuro: "#b97a00", medio: "#ffc928", claro: "#fff2a0", brillo: "#ffe14d" },
    durazno: { oscuro: "#b5532c", medio: "#ff9f72", claro: "#ffd9bf", brillo: "#ffa87a" },
    vino: { oscuro: "#3d0418", medio: "#8a1038", claro: "#c2305e", brillo: "#b01c4a" },
    lila: { oscuro: "#5a3a9a", medio: "#a884e8", claro: "#e0d0ff", brillo: "#a884ff" },
    naranja: { oscuro: "#a33a00", medio: "#ff7a1a", claro: "#ffc27a", brillo: "#ff8a2a" },
    fucsia: { oscuro: "#7a0a55", medio: "#e0289a", claro: "#ff8fd0", brillo: "#ff4db8" },
    azul: { oscuro: "#1c3f9a", medio: "#4a7dea", claro: "#b5d0ff", brillo: "#5a8dff" },
  };
  var margaritas = {
    blanca: { base: "#cfdcf2", punta: "#ffffff", centro: "#f5a81c", puntos: "#fff0b0", brillo: "#dfeaff" },
    celeste: { base: "#2f8fe0", punta: "#bfe9ff", centro: "#ffd23a", puntos: "#fff6c4", brillo: "#4db4ff" },
    lila: { base: "#8a63d2", punta: "#e6d8ff", centro: "#ffd23a", puntos: "#fff6c4", brillo: "#a884ff" },
  };
  var tulipanes = {
    morado: { base: "#5b2a9d", punta: "#cfa8ff", fondo: "#4a1f85", frente: "#b48cf2", brillo: "#a05cff" },
    naranja: { base: "#e04e00", punta: "#ffc061", fondo: "#c23f00", frente: "#ff9a3c", brillo: "#ff8a2a" },
    rosado: { base: "#d6447f", punta: "#ffc0d8", fondo: "#b02f66", frente: "#ff8fb8", brillo: "#ff7ab5" },
    amarillo: { base: "#ffb300", punta: "#fff07a", fondo: "#f09a00", frente: "#ffe86a", brillo: "#ffe14d" },
  };

  var amarillo = { base: "#ffb300", punta: "#fff07a", fondo: "#f09a00", frente: "#ffe86a", centro: "#f08a1a", puntos: "#ffe08a" };

  function poner(tallo, flor, brillo) {
    var cabeza = tallo.querySelector(".flower__leafs");
    cabeza.insertAdjacentHTML("afterbegin", flor);
    if (brillo) cabeza.style.setProperty("--brillo", brillo);
  }

  document.body.classList.add("flor-nueva", "flor-ramo");
  var molde = document.querySelector(".flower--3").cloneNode(true);
  var ultimo = document.querySelector(".flower--3");
  molde.querySelectorAll(".flower__light").forEach(function (luz) {
    luz.remove();
  });

  var tipos = {
    abierta: { hacer: rosa, colores: rosas, lado: 20 },
    llena: { hacer: rosaLlena, colores: rosas, lado: 22 },
    espiral: { hacer: rosaEspiral, colores: rosas, lado: 19 },
    capullo: { hacer: rosaCapullo, colores: rosas, lado: 17 },
    margarita: { hacer: margarita, colores: margaritas, lado: 19 },
    tulipan: { hacer: tulipan, colores: tulipanes, lado: 18 },
    girasol: { hacer: girasol, colores: { amarillo: Object.assign({ brillo: "#f9fd25" }, amarillo) }, lado: 24 },
  };

  function plantar(e) {
    var t = tipos[e.tipo];
    var c = t.colores[e.color];
    var tallo = molde.cloneNode(true);
    tallo.className = "flower flower--extra" + (e.campo ? " flower--campo" : "");
    tallo.querySelector(".flower__leafs").className = "flower__leafs";
    tallo.style.cssText =
      "--giro:" + e.giro + "deg;--alto:" + e.alto + ";--base:" + e.base + "s;--e:" + e.escala +
      ";--x:" + (e.x || 0) + ";z-index:" + e.z;
    poner(tallo, t.hacer(c, t.lado * e.escala), c.brillo);
    ultimo.insertAdjacentElement("afterend", tallo);
    ultimo = tallo;
  }

  // El ramo del centro: los tres tallos originales más cuatro en abanico
  poner(document.querySelector(".flower--1"), girasol(amarillo, 24), "#f9fd25");
  poner(document.querySelector(".flower--2"), rosa(rosas.roja, 20), rosas.roja.brillo);
  poner(ultimo, tulipan(tulipanes.morado, 18), tulipanes.morado.brillo);

  [
    { giro: -36, alto: "46vmin", tipo: "llena", color: "durazno" },
    { giro: 36, alto: "46vmin", tipo: "espiral", color: "amarilla" },
    { giro: -8, alto: "40vmin", tipo: "abierta", color: "rosada" },
    { giro: 9, alto: "42vmin", tipo: "margarita", color: "celeste" },
  ].forEach(function (e, i) {
    e.base = 2.2 + i * 0.2;
    e.escala = 0.85;
    e.z = 10;
    plantar(e);
  });

  // El campo: posición (% del ancho desde el centro), altura (% del alto), flor y color
  var filas = [
    { escala: 0.6, z: 1, flores: [
      [-45, 74, "espiral", "vino"], [-37, 62, "margarita", "lila"], [-29, 80, "llena", "blanca"],
      [-20, 68, "tulipan", "rosado"], [19, 70, "abierta", "amarilla"], [28, 82, "espiral", "fucsia"],
      [37, 64, "girasol", "amarillo"], [45, 76, "llena", "lila"] ] },
    { escala: 0.82, z: 6, flores: [
      [-41, 48, "abierta", "durazno"], [-32, 56, "capullo", "roja"], [-23, 42, "espiral", "rosada"],
      [23, 44, "llena", "naranja"], [32, 56, "capullo", "rosada"], [41, 48, "abierta", "azul"] ] },
    { escala: 1.05, z: 30, flores: [
      [-46, 22, "llena", "roja"], [-35, 30, "margarita", "blanca"], [-25, 18, "espiral", "durazno"],
      [25, 20, "abierta", "fucsia"], [35, 30, "tulipan", "amarillo"], [46, 24, "espiral", "blanca"] ] },
  ];
  var orden = 0;
  filas.forEach(function (fila) {
    fila.flores.forEach(function (f) {
      plantar({
        campo: true,
        x: f[0],
        alto: "calc(var(--k) * " + f[1] + "vh)",
        giro: ((f[0] / 45) * 7 + ((orden % 3) - 1) * 3).toFixed(1),
        tipo: f[2],
        color: f[3],
        escala: fila.escala,
        z: fila.z,
        base: (3 + orden * 0.16).toFixed(2),
      });
      orden++;
    });
  });
})();
