"use client"
import Image from "next/image";
import SideBar from "./sideBar";
import {onSubmit} from "./actions";
import About from "./about";
import { useState } from "react";


/*goated video para tailwind btw*/

export default function Home() {
  const [resultado, setResultado] = useState<null | { match: boolean; score: number }>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setResultado(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await onSubmit(formData);
      if (res) {
        setResultado(res);
      } else {
        setError("No se pudo obtener un resultado válido.");
      }
    } catch (err) {
      setError("Ocurrió un error al comparar.");
    }
  }
  return (
    <div>
      <div className="flex">
        <SideBar />
      </div>
      
      <div className="relative text-center mx-auto max-w-3xl pt-32"> {/* padding top 32*/}
        <h1 className="text-4xl font-medium tracking-tight text-balance text-zinc-900 sm:text-8xl">Deepfake Detector. We know.</h1>
        <p className="mx-auto max-w-lg mt-5 text-lg/6 lg:text-xl/6 font-medium text-balance text-zinc-500">Amazing results. Based on FaceForensics++ and ArcFace for face comparison.</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col items-center gap-6 max-w-md mx-auto"> {/*necesario el onsbumit para usestate*/}
        <p className="mb-1 text-sm font-medium text-gray-700">🤳 Recent Selfie</p>
        <label className="relative w-full ml-45"> {/*el ml45 es lo + importante porqque hace que quede simetrico NO TOCAR*/}
          <input
            type="file"
            name="file1"
            className="block w-full text-base text-gray-900 
                      file:mr-4 file:py-3 file:px-4 
                      file:rounded-full file:border-0
                      file:text-base file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
          />
        </label>
        {/* Segundo archivo INE! */}
        <p className="mb-1 text-sm font-medium text-gray-700"> 📄 ID Document</p>
        <label className="relative w-full ml-45"> {/* el ml45 es lo + importante porque hace que quede simétrico NO TOCAR */}
          <input
            type="file"
            name="file2"
            className="block w-full text-base text-gray-900 
                      file:mr-4 file:py-3 file:px-4 
                      file:rounded-full file:border-0
                      file:text-base file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
          />
        </label>

        <input
          type="submit"
          value="Upload"
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-3 px-8 rounded-lg transition duration-200"
        />

        {/* Resultado */}
        {resultado && (
          <div
            className={`w-full mt-4 text-center p-4 rounded-lg font-semibold text-white ${
              resultado.match ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {resultado.match
              ? `✅ Coinciden (score: ${resultado.score.toFixed(2)})`
              : `❌ No coinciden (score: ${resultado.score.toFixed(2)})`}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="w-full mt-4 text-center p-4 rounded-lg font-semibold text-white bg-red-700">
            {error}
          </div>
        )}
        
      </form>


      <div className="flex">
        <About />
      </div>

    </div>
  );
}
