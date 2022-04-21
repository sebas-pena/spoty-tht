import { useState, useEffect } from "react"

export const useParseData = (userData) => {
	const [data, setData] = useState(null)

	useEffect(() => {
		const dataParsed = { ...userData }
		let imagesLoaded = 0

		for (const type in userData) {
			for (const time in userData[type]) {
				userData[type][time].map((item, index) => {
					const image = new Image()
					image.src = item.image
					image.onload = () => {
						imagesLoaded++
						console.log(dataParsed)
						dataParsed[type][time][index].imgElement = image
						if (imagesLoaded === 60) {
							setData(dataParsed)
						}
					}
				})
			}
		}
	}, [userData])

	return data
}
