var React = require('react');
var ReactDOMClient = require('react-dom/client');

function Main(props){
		return (
			<div>
				Hello World
			</div>
		)
};

const root = ReactDOMClient.createRoot(document.getElementById('app'));

root.render(<Main></Main>);
