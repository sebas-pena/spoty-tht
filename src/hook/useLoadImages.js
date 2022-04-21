import { useEffect, useState } from "react"

export const useLoadImages = (userData) => {
	const [images, setImages] = useState(null)
	const imagesLoaded = []
	const links = []
	useEffect(() => {
		if (userData) {
			for (let key in userData) {
				for (let type in userData[key]) {
					userData[key][type].map((item) => {
						links.push(item.imageUrl)
					})
				}
			}

			let linksUniq = [...new Set(links)]

			linksUniq.forEach((link) => {
				let img = new Image()
				img.src = link
				img.crossOrigin = "anonymous"
				img.onload = () => {
					imagesLoaded.push({
						url: link,
						image: img,
					})
					if (imagesLoaded.length === linksUniq.length) {
						setImages(imagesLoaded)
					}
				}
			})
		}
	}, [userData])
	return images
}
