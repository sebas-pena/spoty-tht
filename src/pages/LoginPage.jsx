import React from "react"

export const LoginPage = () => {
  const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URI}&scope=${process.env.REACT_APP_SPOTIFY_SCOPE}`

  return (
    <div className="login-page__ctn">
      <div className="login__ctn">
        <div className="login__header">
          <img src="logo-black.png" alt="logo" />
          <h1>SpotyTHT</h1>
        </div>
        <p>Genera plantillas según tus canciones y artistas más escuchados.</p>
        <a className="login__btn" href={spotifyUrl}>
          Ingresar con Spotify
        </a>
      </div>
    </div>
  )
}
