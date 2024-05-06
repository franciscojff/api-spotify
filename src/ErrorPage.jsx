import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Pagina en mantenieminto
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          Estamos trabajando en mejoras y actualizaciones para el sitio web
        </p>
        <p className="text-lg text-gray-700 mb-2">
          Si necesitas comunicarte con nosotros escribenos a{" "}
        </p>
        <p className="italic text-gray-600">
          {error.statusText || error.message}
        </p>
      </div>
    </div>
  );
}