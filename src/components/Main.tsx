import * as React from 'react';
var ReactDOMClient = require('react-dom/client');
require('../styl/main.styl');

interface props {
    children: React.ReactNode;
}

const Main: React.FC = ( { children }: props) => {
		return (
			<div>
				Hello World
			</div>
		)
};

const root = ReactDOMClient.createRoot(document.getElementById('app'));

root.render(<Main></Main>);
