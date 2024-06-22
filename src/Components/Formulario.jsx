import React, { useState } from "react";
import Global from "../Global/Global";
import axios from "axios";

//Calculo de T(N) de cada función


const Formulario = () => {

//Calculo de T(N) - Inicial State
  const initialState = { //1 asignacion
    from_name: "", //1 asignacion
    date_of_birth: "", //1 asignacion
    playlist_length: "", //1 asignacion
    music_preference: "", //1 asignacion
    mood: "", //1 asignacion
  };
  //Orden = O(5) = O(1)

  //Calculo de T(N) - Estados
  const [details, setDetails] = useState(initialState); //1 asignacion
  const [token, setToken] = useState(""); //1 asignacion
  const [recomendacionesEncontrados, setRecomendacionesEncontrados] = useState(
    []
  ); //1 asignacion
  const [playlistLength, setPlaylistLength] = useState(""); //1 asignacion
  const [selectedGenre, setSelectedGenre] = useState(""); //1 asignacion
  const [selectedMood, setSelectedMood] = useState(""); //1 asignacion

  //Calculo de T(N) - getToken
  const getToken = async (e) => {

    e.preventDefault();
    let client_id = Global.client_id; //1 asignacion
    let client_secret = Global.client_secret; //1 asignacion

    try {
      const response = await axios.post( //1 asignacion
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
          headers: {
            Authorization: `Basic ${btoa(client_id + ":" + client_secret)}`, //1 operacion
            "Content-Type": "application/x-www-form-urlencoded", //1 asignacion 
          },
        }
      );

      const token = response.data.access_token; //1 asignacion 
      setToken(token); //1 asignacion 

      let limit = 10; //1 asignacion 
      if (playlistLength === "media") { //1 comparacion 
        limit = 20; //1 comparacion 
      } else if (playlistLength === "larga") {
        limit = 30;
      }

      let songSeed = null;
      switch(selectedGenre){
        case "salsa":
          songSeed = "6xcpIxu4IDH2gzAYCr6dIR";
          break;
        case "pop":
          songSeed = "5jrdCoLpJSvHHorevXBATy";
          break;
        case "rock":
          songSeed = "0G21yYKMZoHa30cYVi1iA8";
          break;
        case "samba":
          songSeed = "2yAjjqcHMy6qUI6NNzNoVD";
          break;
        case "latin":
          songSeed = "7JIjUx3GsL0upxmNJacmtz";
          break;
        case "electro":
          songSeed = "0TDLuuLlV54CkRRUOahJb4";
          break;
        case "reggaeton":
          songSeed = "1dAQ93kw8Sy9n4JCz2G9Nf";
          break;          
      }

      // Ambas condiciones tienen el mismo T(N) de O(2) 
      try {
        const response = await axios.get(  //1 asignacion 
          "https://api.spotify.com/v1/recommendations",
          {
            headers: {
              Authorization: `Bearer ${token}`, //1 asignacion 
            },
            params: {
              seed_artists: songSeed, //1 asignacion 
              seed_genres: selectedGenre, selectedMood, //2 asignaciones 
              seed_tracks: null, //1 asignacion 
              limit: limit, //1 asignacion 
            },
          }
        );
        setRecomendacionesEncontrados(response.data.tracks); //1 asignacion 
      } catch (error) {
        console.error("Error al buscar recomendaciones:", error); //1 impresion 
      }
    } catch (error) {
      console.error("Error al obtener el token:", error); //1 impresion 
    }
  };
      //Orden = O(18) = O(1)

  //Calculo de T(N) - handleDetailsChange
  
  const handleDetailsChange = (event) => { //1 asignacion 
    const { name, value } = event.target; //1 asignacion 
    setDetails((prevDetails) => ({
      ...prevDetails, //1 asignacion 
      [name]: value, //1 asignacion 
    }));
  };

  //Orden = O(4) = O(1)

  return (
    <div className="w-9/12 py-8 px-6 flex flex-col mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Formulario de Contacto y Preferencias Musicales
      </h2>
      <p className="mb-6 text-slate-600">
        Por favor, proporcione sus detalles y preferencias musicales para que
        podamos generar una playlist personalizada para usted.
      </p>
      <form className="flex flex-col gap-4 w-full" onSubmit={getToken}>
        <input
          name="from_name"
          value={details.from_name}
          onChange={handleDetailsChange}
          type="text"
          placeholder="Nombre"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          name="date_of_birth"
          value={details.date_of_birth}
          onChange={handleDetailsChange}
          type="date"
          placeholder="Fecha de Nacimiento"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <select
          name="playlist_length"
          value={playlistLength}
          onChange={(e) => setPlaylistLength(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">Seleccionar Longitud de Playlist</option>
          <option value="corta">Corta</option>
          <option value="media">Mediana</option>
          <option value="larga">Larga</option>
        </select>

        <select
          name="music_genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">Seleccionar Género Musical</option>
          <option value="pop">Pop</option>
          <option value="jazz">Jazz</option>
          <option value="hard-rock">Hard Rock</option>
          <option value="reggaeton">Reggaeton</option>
          <option value="salsa">Salsa</option>
          <option value="electro">Electro</option>
          <option value="latin">Latin</option>
          <option value="hip-hop">Hip Hop</option>
          <option value="samba">Samba</option>
          <option value="punk">Punk</option>
        </select>

        <select
          name="mood"
          value= {selectedMood}
          onChange={(e) => setSelectedMood(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">Seleccionar Estado de Ánimo</option>
          <option value="happy">Feliz</option>
          <option value="raini-day">Triste</option>
          <option value="hard-rock">Enojado</option>
          <option value="romance">Nostálgico</option>
          <option value="work-out">Motivado</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
        <button
          type="submit"
          className="mb-5 bg-green-700 text-white px-6 py-2 rounded-lg transition-colors hover:bg-green-900 hover:font-bold focus:outline-none"
        >
          Generar Playlist
        </button>
      </form>
      {/* Renderizar los artistas encontrados */}
      <div className="mx-auto">
        {recomendacionesEncontrados.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold my-5">
              Aca puedes ver tu playlist personalizada:
            </h3>
            <ul>
            {recomendacionesEncontrados.map((song, index) => (
                <li key={index}>
                  <strong className="text-green-700">{song.name}</strong> - {song.artists[0].name}
                  <div>
                    <iframe
                      src={`https://open.spotify.com/embed/track/${song.id}`}
                      className="w-full h-24"
                      frameBorder="0"
                      allowtransparency="true"
                      allow="encrypted-media"
                    ></iframe>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Formulario;
