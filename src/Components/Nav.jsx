import React from "react";
import { Link } from "react-router-dom";

function getImageUrl(name) {
  return new URL(`../img/${name}.png`, import.meta.url).href;
}

export default function Nav(props) {


  return (
    <nav>
      <header className="bg-gray-900 text-white px-6 shadow">
        <div className="flex justify-between items-center h-16 max-w-6xl mx-auto">
          <div className="flex items-center mr-2">
            <Link to={`/`}>
              <img src={getImageUrl(props.name)} className="h-10 " alt="" />
            </Link>

            <div className="space-y-8 ml-8 items-center">
              <a className="title-font font-medium  justify-center text-white">

                <span className="ml-3 text-xl"> Playlist Generator </span>
              </a>
              <Link
                to={`/`}
                className="text-white px-3 py-2 hover:text-green-500 transition-colors"
              >
                Usamos tus datos y gustos musicales para generar una playlist justo a tu medida
              </Link>

            </div>
          </div>
        </div>

      </header>
    </nav>
  );
}
