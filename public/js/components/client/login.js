/*
*
*/
'use strict';

//	Variables
const 	loginElement 	= document.getElementById('login'), 
		client 			= document.getElementById('clientActions');

var button     = document.querySelector('#connect');
var userName   = document.querySelector('#username');
if (button !== null) {
    button.addEventListener('click', function (e) {
        //let socket = io('/rolling-chanel');

        socket.on('user-connected', function (data) {
            console.log(data);
        });
        socket.emit('user-connected', { myName: userName.value });
    });
}

//	Compoments
let LoginForm = React.createClass({
	render: function () {
		return (
			<div>
				<h2>¿Quiéres conectárte?</h2>

	            <input id="username" type="text" placeholder="Tú nombre" />
	            <button id="connect" className="pure-button pure-button-primary">Conectar</button>
			</div>
    	);
  	}
});

let ClientActions = React.createClass({
	render: function () {
		return (
			<div className="pure-g">
	            <div id="options-container" className="pure-u-1 pure-u-md-2-5"><p>Controls</p><div className="options-container-elements"></div></div>
	            <div id="queue-list" className="pure-u-1 pure-u-md-2-5"><p>Cola de peticiones</p><div className="list"></div></div>
	            <div id="clients" className="pure-u-1 pure-u-md-1-5"><p>Clientes conectados</p><p className="clients"></p></div>
	        </div>
		);
	}
});
ReactDOM.render(
	<LoginForm />,
  	loginElement
);
/*ReactDOM.render(
	<ClientActions />,
  	client
);*/
