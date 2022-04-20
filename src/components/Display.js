import React, { useRef, useEffect } from "react"

export const Display = ({ items, range }) => {
	const canvasRef = useRef(null)

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext("2d")
		const width = canvas.width
		const height = canvas.height
		const canvasBg = new Image()
		canvasBg.src = "./template2.jpg"
		canvasBg.onload = () => {
			ctx.drawImage(canvasBg, 0, 0, width, height)
		}
		console.log(canvasBg)
	}, [useRef])
	return (
		<div className="displa__ctn">
			<canvas ref={canvasRef} width="540" height="960"></canvas>
		</div>
	)
}
