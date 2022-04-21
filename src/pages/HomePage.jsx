import React, { useState, useEffect } from "react"
import { preloadImages } from "../helper/preloadImages"
import { useGetUserTop } from "../hook/useGetUserTop"

export const HomePage = () => {
  const [canvasSrc, setCanvasSrc] = useState(null)
  const [template, setTemplate] = useState("tht")
  const [type, setType] = useState("artists")
  const [range, setRange] = useState("long_term")

  const token = JSON.parse(sessionStorage.getItem("access_token"))
  const userData = useGetUserTop(token)
  const [templateBackground, setTemplateBackground] = useState(null)

  useEffect(() => {
    if (userData) {
      const templateInfo = userData[type][range]
      console.log(templateInfo)
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      canvas.width = 1080
      canvas.height = 1920

      if (!canvasSrc) {
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#fff"
        const background = new Image()
        background.src = "./templatepng.png"
        background.crossOrigin = "anonymous"
        background.onload = () => {
          ctx.drawImage(background, 0, 0)
          setTemplateBackground(background)
          setCanvasSrc(
            canvas
              .toDataURL("image/png")
              .replace("image/png", "image/octet-stream")
          )
        }
      }

      preloadImages(templateInfo, (dataParsed) => {
        dataParsed.forEach((data, index) => {
          let x
          let y = 222
          let dy = 335
          index % 2 === 0 ? (x = 54) : (x = 738)
          y = y + dy * Math.floor(index / 2)

          ctx.drawImage(data.image, x, y)
          templateBackground && ctx.drawImage(templateBackground, 0, 0)
          setCanvasSrc(
            canvas
              .toDataURL("image/png")
              .replace("image/png", "image/octet-stream")
          )
        })
      })
    }
  }, [range, type, template, userData])

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
                  onClick={() => {
                    setType("artists")
                  }}
                >
                  Artistas
                </button>
              </li>
              <li>
                <button
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
                  onClick={() => {
                    setRange("short_term")
                  }}
                >
                  Últimas 4 semanas
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRange("medium_term")
                  }}
                >
                  Últimos 6 meses
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRange("long_term")
                  }}
                >
                  Todo el Tiempo
                </button>
              </li>
            </ul>
          </aside>
          <div className="display ">
            {canvasSrc ? (
              <img src={canvasSrc} alt="template" />
            ) : (
              <div className="loading"></div>
            )}

            <a href={canvasSrc} download="SpotyTHT">
              DESCARGAR
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
