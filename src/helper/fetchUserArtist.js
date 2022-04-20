export const fetchUserArtist = async (token, range) => {
	const url = `https://api.spotify.com/v1/me/top/artists?limit=10&time_range=${range}`
	const headers = {
		"Content-Type": "application/json",
		Authorization: "Bearer " + token,
	}
	const res = await fetch(url, {
		method: "GET",
		headers,
	})
	const { items } = await res.json()

	return items.map((artist) => {
		return {
			name: artist.name,
			image: artist.images[1].url,
		}
	})
}
