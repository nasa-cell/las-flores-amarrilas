// Muchas estrellas en un solo elemento, para no cargar el equipo
function estrellar(selector, cantidad, colores, enBanda) {
  var sombras = [];
  for (var i = 0; i < cantidad; i++) {
    var x = Math.random() * 100;
    var y = enBanda ? 62 - x * 0.5 + (Math.random() - 0.5) * 22 : Math.random() * 80;
    sombras.push(x.toFixed(2) + "vw " + y.toFixed(2) + "vh 0 0 " + colores[i % colores.length]);
  }
  document.querySelector(selector).style.boxShadow = sombras.join(",");
}
estrellar(".estrellas--1", 170, ["#ffffff", "#cfd8ff", "#ffffff", "#ffe9c9"]);
estrellar(".estrellas--2", 70, ["#ffffff", "#bcd0ff", "#fff1d6"]);
estrellar(".estrellas--3", 22, ["#ffffff", "#a9c4ff", "#ffd9a8"]);
estrellar(".estrellas--via", 160, ["#e6dcff", "#ffffff", "#cfe0ff"], true);
sembrar(".cielo", 14, "destello");
sembrar("#particulas", 34, "luciernaga");

// Al tocar la pantalla salen luciérnagas desde ese punto
addEventListener("pointerdown", function (e) {
  if (!document.body.classList.contains("abierto") || e.target.closest("button")) return;
  for (var i = 0; i < 6; i++) {
    var chispa = document.createElement("i");
    var angulo = Math.random() * Math.PI * 2;
    var lejos = 8 + Math.random() * 14;
    chispa.className = "chispa";
    chispa.style.cssText =
      "left:" + e.clientX + "px;top:" + e.clientY + "px;--dx:" +
      (Math.cos(angulo) * lejos).toFixed(1) + "vmin;--dy:" + (Math.sin(angulo) * lejos - 6).toFixed(1) + "vmin";
    chispa.addEventListener("animationend", function () { this.remove(); });
    document.body.appendChild(chispa);
  }
});

// Mariposas amarillas que cruzan la pantalla y van soltando polvo dorado
(function () {
  var capa = document.getElementById("mariposas");
  var calmado = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var cantidad = calmado ? 2 : innerWidth < 600 ? 4 : 6;
  var colores = ["#ffd93b", "#ffb300", "#fff2a0"];
  var ala =
    '<path d="M0,-2 C-6,-16 -20,-14 -17,-3 C-16,2 -6,2 0,0Z" fill="#ffd93b" stroke="#d98200" stroke-width="0.9"/>' +
    '<path d="M0,0 C-8,2 -15,6 -11,12 C-7,15 -2,8 0,2Z" fill="#ffc21a" stroke="#d98200" stroke-width="0.9"/>' +
    '<circle cx="-11.5" cy="-7.5" r="2.2" fill="#fff6c4"/><circle cx="-8" cy="7.5" r="1.4" fill="#fff6c4"/>';
  var dibujo =
    '<svg viewBox="-20 -16 40 32"><g class="ala">' + ala + '</g><g class="ala"><g transform="scale(-1,1)">' + ala + "</g></g>" +
    '<path d="M-0.6,-8 Q-3,-13 -5,-14 M0.6,-8 Q3,-13 5,-14" fill="none" stroke="#5a3a00" stroke-width="0.7" stroke-linecap="round"/>' +
    '<ellipse cx="0" cy="0" rx="1.5" ry="8" fill="#5a3a00"/></svg>';
  var lista = [];

  for (var i = 0; i < cantidad; i++) {
    var el = document.createElement("div");
    var a = Math.random;
    el.className = "mariposa";
    el.innerHTML = dibujo;
    el.style.cssText = "--s:" + (0.7 + a() * 0.6).toFixed(2) + ";--aleteo:" + (0.14 + a() * 0.1).toFixed(2) + "s";
    capa.appendChild(el);
    lista.push({
      el: el,
      cy: 0.2 + a() * 0.4, ax: 0.4 + a() * 0.14, ay: 0.1 + a() * 0.12,
      vx: 0.13 + a() * 0.1, vy: 0.21 + a() * 0.16,
      fx: a() * 6.28, fy: a() * 6.28, giro: 0, ultimo: 0, x: null, y: null,
    });
  }

  function soltar(x, y) {
    var punto = document.createElement("i");
    var a = Math.random;
    punto.className = "polvo";
    punto.style.cssText =
      "left:" + x.toFixed(0) + "px;top:" + y.toFixed(0) + "px;--s:" + (0.6 + a() * 0.9).toFixed(2) +
      ";--dx:" + ((a() - 0.5) * 6).toFixed(1) + "vmin;--c:" + colores[Math.floor(a() * colores.length)];
    punto.addEventListener("animationend", function () { this.remove(); });
    capa.appendChild(punto);
  }

  function mover(ahora) {
    requestAnimationFrame(mover);
    if (!document.body.classList.contains("abierto")) return;
    var t = ahora / 1000;
    for (var i = 0; i < lista.length; i++) {
      var m = lista[i];
      var x = innerWidth * (0.5 + m.ax * Math.sin(m.vx * t + m.fx));
      var y = innerHeight * (m.cy + m.ay * Math.sin(m.vy * t + m.fy)) + 10 * Math.sin(5 * t + m.fx);
      if (m.x !== null) {
        var rumbo = (Math.atan2(y - m.y, x - m.x) * 180) / Math.PI + 90;
        var diferencia = ((rumbo - m.giro + 540) % 360) - 180;
        m.giro += diferencia * 0.06;
      }
      m.x = x;
      m.y = y;
      m.el.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px) rotate(" + m.giro.toFixed(1) + "deg)";
      if (!calmado && ahora - m.ultimo > 140) {
        m.ultimo = ahora;
        soltar(x, y);
      }
    }
  }
  requestAnimationFrame(mover);
})();
