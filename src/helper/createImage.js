export const createImage = (
	background,
	imageConfig = {},
	preloadedImages = null
) => {
	const { items, type, range } = imageConfig
	const canvas = document.createElement("canvas")
	canvas.width = 1080
	canvas.height = 1920
	const ctx = canvas.getContext("2d")

	if (items && preloadedImages) {
		items.forEach((image, index) => {
			let x
			let y = 219
			let dy = 334
			index % 2 === 0 ? (x = 54) : (x = 737)
			y = y + dy * Math.floor(index / 2)

			let preloadImage = preloadedImages.find((preloadedImages) => {
				return preloadedImages.url === image.imageUrl
			})

			ctx.drawImage(
				preloadImage.image,
				0,
				0,
				preloadImage.image.width,
				preloadImage.image.height,
				x,
				y,
				291,
				291
			)
		})
		ctx.drawImage(background, 0, 0)

		items.forEach((image, index) => {
			let x
			let y = 219
			let dy = 334
			index % 2 === 0 ? (x = 54) : (x = 737)
			y = y + dy * Math.floor(index / 2)

			ctx.textAlign = "center"
			ctx.fillStyle = "#000"
			ctx.font = "bold 18px Arial"
			let title = image.name
			if (title.length > 18) {
				title = title.substring(0, 18) + "..."
			}
			if (image.artist) {
				ctx.fillText(title, x + 291 / 2, y + 265)
				ctx.font = "bold 16px Arial"
				let artist = image.artist
				if (artist.length > 18) {
					artist = artist.substring(0, 18) + "..."
				}
				ctx.fillText(artist, x + 291 / 2, y + 285)
			} else {
				ctx.fillText(title, x + 291 / 2, y + 277)
			}
		})
	} else {
		ctx.drawImage(background, 0, 0)
	}

	return canvas
		.toDataURL("image/png")
		.replace("image/png", "image/octet-stream")
}
