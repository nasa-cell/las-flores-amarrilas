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
