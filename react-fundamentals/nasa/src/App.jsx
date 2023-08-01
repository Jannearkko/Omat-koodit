import { useState, useEffect } from 'react';
import './App.css';

function App() {

	const [explanation, setExplanation] = useState('');
	const [url, setUrl] = useState('');
	const [mediaType, setMediaType] = useState('');

	useEffect(() => {
		fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
		.then(response => response.json())
		.then(data => {
			setExplanation(data.explanation);
			setUrl(data.url);
			setMediaType(data.media_type);
		})
		.catch(err => console.log(err))
	}, [])

	if (!url) {
		return <>Loading...</>;
	}
	else if (mediaType === 'image') {
		return (
		  <>
			<p>Explanation: {explanation}</p>
			<img alt="Nasa APOD" src={url} />
		  </>
		);
	  }
	  else {
		return (
		  <>
			<p>Explanation: {explanation}</p>
			<iframe width="520" height="415" src={url} title="Nasa APOD"></iframe>
		  </>
		);
	  }
	}

export default App;
