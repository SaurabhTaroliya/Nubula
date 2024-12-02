const myToken = import.meta.env.VITE_Token2;

async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
		{
			headers: {
				Authorization: `Bearer ${myToken}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	let url;
	url = URL.createObjectURL(result)
	return url;
}
// query({"inputs": "Astronaut riding a horse"}).then((response) => {
// 	// Use image
	
// 	const image = document.getElementById("#imgUrl")
// 	image.src = response;
// });

export default query;