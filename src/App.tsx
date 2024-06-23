import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import Title from './components/layout/Title';
import FlowContainer from './containers/FlowContainer';
import { ImageMapEditor, Pricing, Community, Welcome } from './editors';

const App = () => {
	const [activeEditor, setActiveEditor] = useState('home');

	const handleChangeEditor = ({ key }) => {
		setActiveEditor(key);
	};

	const renderEditor = activeEditor => {
		switch (activeEditor) {
			case 'imagemap':
				return <ImageMapEditor />;
			case 'pricing':
				return <Pricing />;
			case 'community':
				return <Community />;
			case 'home':
				return <Welcome />;
			default:
				return null;
		}
	};

	return (
		<div className="rde-main">
			<Helmet>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta
					name="description"
					content="React Design Editor has started to developed direct manipulation of editable design tools like Powerpoint, We've developed it with react.js, ant.design, fabric.js "
				/>
				<link rel="manifest" href="./manifest.json" />
				<link rel="shortcut icon" href="./favicon.ico" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css" />
				<title>React Design Editor</title>
				<script async src="https://www.googletagmanager.com/gtag/js?id=G-EH7WWSK514" />
				<script>
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EH7WWSK514');
          `}
				</script>
				<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
			</Helmet>
			{/* Header */}
			<div className="rde-title">
				<Title onChangeEditor={handleChangeEditor} currentEditor={activeEditor} />
			</div>
			{/* Body */}
			<FlowContainer>
				<div className="rde-content">{renderEditor(activeEditor)}</div>
			</FlowContainer>
		</div>
	);
};

export default App;
