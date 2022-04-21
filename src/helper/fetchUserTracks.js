export const fetchUserTracks = async (token, range) => {
	const url = `https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=${range}`
	const headers = {
		"Content-Type": "application/json",
		Authorization: "Bearer " + token,
	}
	const res = await fetch(url, {
		method: "GET",
		headers,
	})
	const { items } = await res.json()

	return items.map((tack) => {
		return {
			name: tack.name,
			imageUrl: tack.album.images[1].url,
			artist: tack.artists[0].name,
		}
	})
}
