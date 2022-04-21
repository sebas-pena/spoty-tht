import { useEffect, useState } from "react"

export const useLoadImages = (userData) => {
  const [images, setImages] = useState(null)
  const imagesLoaded = {}
  const links = []
  let counter = 0
  useEffect(() => {
    if (userData) {
      for (let key in userData) {
        for (let type in userData[key]) {
          userData[key][type].forEach((item) => {
            links.push(item.imageUrl)
          })
        }
      }

      let linksUniq = [...new Set(links)]

      linksUniq.forEach((link) => {
        let id = link.slice(link.lastIndexOf("/") + 1)
        let img = new Image()
        img.src = link
        img.crossOrigin = "anonymous"
        img.onload = () => {
          imagesLoaded[id] = img
          counter++
          if (counter === linksUniq.length) {
            setImages(imagesLoaded)
          }
        }
      })
    }
  }, [userData])
  return images
}
