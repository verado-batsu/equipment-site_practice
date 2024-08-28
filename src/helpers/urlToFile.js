export async function urlToFile(url, fileName, mimeType) {
	const response = await fetch(url);
	
	const blob = await response.blob();
	
	const file = new File([blob], fileName, { type: mimeType });
	
	return file;
}