import React, { useEffect, useState } from "react";
import Global from "../Global/Global";

//Calculo de T(N) - Inicial State
function getImageUrl(name) {
  return new URL(`../img/${name}.png`, import.meta.url).href; //1 return
}

export default function Login() {
  //Calculo de T(N) - Estados
  const [token,setToker] = useState('') //1 asignacion 

   //Calculo de T(N) - useEffect para obtener el token de la URL
  useEffect( ()=>{
    const hash = window.location.hash //1 asignacion 
    let token = window.localStorage.getItem('token') //1 asignacion 

    if(!token && hash) {
        token = hash.substring(1).split('&').find(elem => elem.startsWith('code')).split("=")[1] //1 asignacion 
        console.log(token) //1 impresion 
    }
  })
  return (
    <section className="bg-gray-900 text-white">
      <div className="flex items-center justify-center h-screen">
        <div id="login" className="text-center">
            
          <img
            src={getImageUrl("logoCirculoNegro")}
            className="w-8 h-8 mx-auto mb-4"
            alt=""
          />
          <h3 className="text-xl font-semibold mb-4 pb-4">
            Accede con tus credenciales de Spotify para obtener tu playlist
            personalizada
          </h3>

          <a
            href={`https://accounts.spotify.com/authorize?client_id=${Global.client_id}&response_type=code&redirect_uri=${Global.redirect_uri}&response_type=${Global.response_type}`}
            id="btnLogin"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            INICIAR SESIÓN
          </a>
        </div>
      </div>
    </section>
  );
}
