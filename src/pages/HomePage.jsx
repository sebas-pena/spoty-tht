import React, { useState } from "react"
import { Display } from "../components/Display"
import { useGetUserTop } from "../hook/useGetUserTop"

export const HomePage = () => {
	const [display, setDisplay] = useState({
		display: false,
		items: [],
		type: "",
		Range: "",
	})
	const token = JSON.parse(sessionStorage.getItem("access_token"))
	const userData = useGetUserTop(token)

	return (
		<div className="home-page__ctn">
			<main className="home-page__main">
				<h1 className="home-page__header">SPOTY-THT</h1>
				<div className="home-page__content">
					<aside className="home-page__aside">
						<h2>Plantilla:</h2>
						<button>This or That</button>
						<h2>Basado en:</h2>
						<button>Artistas</button>
						<button>Canciones</button>
						<h2>Franja de tiempo:</h2>
						<button>Ultimas 4 semanas</button>
						<button>Ultimos 6 meses</button>
						<button>Todo el Tiempo</button>
					</aside>
					<Display />
				</div>
			</main>
		</div>
	)
}
