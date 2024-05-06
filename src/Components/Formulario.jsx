import React, { useState } from "react";
import Global from "../Global/Global";
import axios from "axios";

//Calculo de T(N) de cada función

const Formulario = () => {
  const initialState = {
    from_name: "",
    date_of_birth: "",
    playlist_length: "",
    music_preference: "",
    mood: "",
  };

  const [details, setDetails] = useState(initialState);
  const [token, setToken] = useState("");
  const [recomendacionesEncontrados, setRecomendacionesEncontrados] = useState(
    []
  );

  const [playlistLength, setPlaylistLength] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedMood, setSelectedMood] = useState("");

  const getToken = async (e) => {
    e.preventDefault();
    let client_id = Global.client_id;
    let client_secret = Global.client_secret;

    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
          headers: {
            Authorization: `Basic ${btoa(client_id + ":" + client_secret)}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const token = response.data.access_token;
      setToken(token);

      let limit = 10;
      if (playlistLength === "media") {
        limit = 20;
      } else if (playlistLength === "larga") {
        limit = 30;
      }

      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/recommendations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
              seed_genres: selectedGenre, selectedMood,
              seed_tracks: "0c6xIDDpzE81m2q797ordA",
              limit: limit,
            },
          }
        );
        console.log("Recomendaciones:", response.data.tracks);
        setRecomendacionesEncontrados(response.data.tracks); // Guardar los artistas encontrados
      } catch (error) {
        console.error("Error al buscar recomendaciones:", error);
      }
    } catch (error) {
      console.error("Error al obtener el token:", error);
    }
  };

  const handleDetailsChange = (event) => {
    const { name, value } = event.target;

    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

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
      <div>
        {recomendacionesEncontrados.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold my-5">
              Aca puedes ver tu playlist personalizada:
            </h3>
            <ul>
              {recomendacionesEncontrados.map((song, index) => (
                <li key={index}> <strong className="text-green-700"> {song.name} </strong> - {song.artists[0].name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Formulario;
