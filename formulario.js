document.addEventListener("DOMContentLoaded", function () {
  const id = new URLSearchParams(window.location.search).get("id");

  // Obtener filas de forma más segura
  const rowNuevo = document.querySelector('[id*="row--70770"]');
  const rowUsado = document.querySelector('[id*="row--48807"]:not([id*="112"])');
  const rowNoEncontrado = document.querySelector('[id*="row--48807-112"]');

  // Ocultar todas
  if (rowNuevo) rowNuevo.style.display = "none";
  if (rowUsado) rowUsado.style.display = "none";
  if (rowNoEncontrado) rowNoEncontrado.style.display = "none";

  function mostrar(row) {
    if (row) row.style.display = "block";
  }

  if (!id) {
    mostrar(rowNoEncontrado);
    return;
  }

  fetch("https://simplemarcas.cl/data/formulario.json?id=" + id)
    .then(res => res.json())
    .then(data => {
      console.log("✅ API respondió:", data);
      if (data.estado === "nuevo") {
        mostrar(rowNuevo);
      } else if (data.estado === "usado") {
        mostrar(rowUsado);
      } else {
        mostrar(rowNoEncontrado);
      }
    })
    .catch(err => {
      console.error("❌ Error en fetch:", err);
      mostrar(rowNoEncontrado);
    });
});
