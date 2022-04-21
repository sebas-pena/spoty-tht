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

  return items.map(({ album, name, artists = [] }) => {
    let imageUrl = album.images[1].url
    let imageId = imageUrl.slice(imageUrl.lastIndexOf("/") + 1)
    return {
      name: name,
      imageUrl,
      artist: artists[0].name,
      imageId,
    }
  })
}
