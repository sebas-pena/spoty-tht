export const preloadImages = (data, cb) => {
	let dataLoaded = []
	data.forEach((item) => {
		let img = new Image()
		img.src = item.imageUrl
		img.crossOrigin = "anonymous"
		img.onload = () => {
			dataLoaded.push({
				name: item.name,
				image: img,
				artist: item.artist,
			})
			if (dataLoaded.length === data.length) {
				cb(dataLoaded)
			}
		}
	})
}
