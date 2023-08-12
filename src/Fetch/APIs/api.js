async function fetchDataFromAPI(url, opcionesPeticion) {
  try {
    const respuesta = await fetch(url, opcionesPeticion);
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    return null;
  }
}
export {fetchDataFromAPI}