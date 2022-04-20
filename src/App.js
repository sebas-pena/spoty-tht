import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
function App() {
	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	)
}

export default App
/* import { useRouter } from "next/router"

export default function CallBack() {
	const { asPath } = useRouter()

	const urlParams = new URLSearchParams(
		asPath.substring(asPath.indexOf("#") + 1)
	)
	const accessToken = urlParams.get("access_token")
	fetch("https://api.spotify.com/v1/me/top/tracks", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + accessToken,
		},
	})
		.then((res) => res.json())
		.then((res) => {
			console.log(res)
		})

	return <p>Redirecting....</p>
}
 */
