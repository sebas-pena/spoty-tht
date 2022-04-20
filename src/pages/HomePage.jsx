import React, { useState, useEffect } from "react"
import { prelaodImages } from "../helper/preloadImages"
import { useGetUserTop } from "../hook/useGetUserTop"

export const HomePage = () => {
  const [canvasSrc, setCanvasSrc] = useState(null)
  const [template, setTemplate] = useState("tht")
  const [type, setType] = useState("artists")
  const [range, setRange] = useState("long_term")

  const token = JSON.parse(sessionStorage.getItem("access_token"))
  const userData = useGetUserTop(token)

  useEffect(() => {
    if (userData) {
      const templateInfo = userData[type][range]
      prelaodImages(templateInfo, () => {
        console.log("se cargaron")
      })
      console.log(templateInfo)
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      canvas.width = 1080
      canvas.height = 1920
      const background = new Image()
      background.src = "./templateoriginal.jpg"
      background.onload = () => {
        ctx.drawImage(background, 0, 0)
        setCanvasSrc(
          canvas
            .toDataURL("ïmage/png")
            .replace("image/png", "image/octet-stream")
        )
      }
    }
  }, [range, type, template, userData])

  console.log(userData)
  return (
    <div className="home-page__ctn">
      <main className="home-page__main">
        <h1 className="home-page__header">SPOTY-THT</h1>
        <div className="home-page__content">
          <aside className="home-page__aside">
            <h2>Plantilla:</h2>
            <ul>
              <li>
                <button
                  value="tht"
                  onClick={() => {
                    setTemplate("tht")
                  }}
                >
                  This or That
                </button>
              </li>
            </ul>
            <h2>Basado en:</h2>
            <ul>
              <li>
                <button
                  value="artists"
                  onClick={() => {
                    setType("artist")
                  }}
                >
                  Artistas
                </button>
              </li>
              <li>
                <button
                  value="tracks"
                  onClick={() => {
                    setType("tracks")
                  }}
                >
                  Canciones
                </button>
              </li>
            </ul>
            <h2>Franja de tiempo:</h2>
            <ul>
              <li>
                <button
                  value="short_term"
                  onClick={() => {
                    setRange("short")
                  }}
                >
                  Ultimas 4 semanas
                </button>
              </li>
              <li>
                <button
                  value="medium_term"
                  onClick={() => {
                    setRange("medium")
                  }}
                >
                  Ultimos 6 meses
                </button>
              </li>
              <li>
                <button
                  value="long_term"
                  onClick={() => {
                    setRange("long")
                  }}
                >
                  Todo el Tiempo
                </button>
              </li>
            </ul>
          </aside>
          <div className="display ">
            <img src={canvasSrc} alt="template" />
            <a href={canvasSrc} download="SpotyTHT">
              DOWNLOAD
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
