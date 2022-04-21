import React, { useState, useEffect } from "react"
import { createImage } from "../helper/createImage"
import { useLoadImages } from "../hook/useLoadImages"
import { useUserData } from "../hook/useUserData"

export const HomePage = () => {
	const [canvasSrc, setCanvasSrc] = useState(null)
	const [templateConfig, setTemplateConfig] = useState({
		template: "tht",
		type: "artists",
		range: "long_term",
	})
	const token = JSON.parse(sessionStorage.getItem("access_token"))
	const userData = useUserData(token)
	const [templateBackground, setTemplateBackground] = useState(null)
	const preloadedImages = useLoadImages(userData)

	useEffect(() => {
		const background = new Image()
		background.src = "./templatepng.png"
		background.crossOrigin = "anonymous"
		background.onload = () => {
			setTemplateBackground(background)
			let imageSrc = createImage(background)
			setCanvasSrc(imageSrc)
		}
	}, [])

	useEffect(() => {
		if (userData && templateConfig && templateBackground) {
			const { type, range } = templateConfig
			const imageConfig = {
				type,
				range,
				items: userData[type][range],
			}
			let imageSrc = createImage(
				templateBackground,
				imageConfig,
				preloadedImages
			)
			setCanvasSrc(imageSrc)
		}
	}, [templateConfig, userData, templateBackground, preloadedImages])

	return (
		<div className="home-page__ctn">
			<main className="home-page__main">
				<h1 className="home-page__header">SPOTY-THT</h1>
				<div className="home-page__content">
					<aside className="home-page__aside">
						<h2>Plantilla:</h2>
						<ul>
							<li>
								<button
									value="tht"
									onClick={() => {
										setTemplateConfig({
											...templateConfig,
											template: "tht",
										})
									}}
								>
									This or That
								</button>
							</li>
						</ul>
						<h2>Basado en:</h2>
						<ul>
							<li>
								<button
									onClick={() => {
										setTemplateConfig({
											...templateConfig,
											type: "artists",
										})
									}}
								>
									Artistas
								</button>
							</li>
							<li>
								<button
									onClick={() => {
										setTemplateConfig({
											...templateConfig,
											type: "tracks",
										})
									}}
								>
									Canciones
								</button>
							</li>
						</ul>
						<h2>Franja de tiempo:</h2>
						<ul>
							<li>
								<button
									onClick={() => {
										setTemplateConfig({
											...templateConfig,
											range: "short_term",
										})
									}}
								>
									Últimas 4 semanas
								</button>
							</li>
							<li>
								<button
									onClick={() => {
										setTemplateConfig({
											...templateConfig,
											range: "medium_term",
										})
									}}
								>
									Últimos 6 meses
								</button>
							</li>
							<li>
								<button
									onClick={() => {
										setTemplateConfig({
											...templateConfig,
											range: "long_term",
										})
									}}
								>
									Todo el Tiempo
								</button>
							</li>
						</ul>
					</aside>
					<div className="display ">
						{canvasSrc ? (
							<img src={canvasSrc} alt="template" />
						) : (
							<div className="loading"></div>
						)}

						<a href={canvasSrc} download="SpotyTHT.png">
							DESCARGAR
						</a>
					</div>
				</div>
			</main>
		</div>
	)
}
