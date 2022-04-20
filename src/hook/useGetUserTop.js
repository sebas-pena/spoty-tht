import { useEffect, useState } from "react"
import { fetchUserArtist } from "../helper/fetchUserArtist"
import { fetchUserTracks } from "../helper/fetchUserTracks"

export const useGetUserTop = (token) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    Promise.all([
      fetchUserTracks(token, "short_term"),
      fetchUserTracks(token, "medium_term"),
      fetchUserTracks(token, "long_term"),
      fetchUserArtist(token, "short_term"),
      fetchUserArtist(token, "medium_term"),
      fetchUserArtist(token, "long_term"),
    ])
      .then((res) => {
        setData({
          tracks: {
            short_term: res[0],
            medium_term: res[1],
            long_term: res[2],
          },
          artists: {
            short_term: res[3],
            medium_term: res[4],
            long_term: res[5],
          },
        })
      })
      .catch(() => {
        sessionStorage.removeItem("access_token")
      })
  }, [token])

  return data
}
