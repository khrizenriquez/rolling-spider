/*
*
*/
'use strict';

//	Variables

var loginElement = document.getElementById('login'),
    client = document.getElementById('clientActions');

var button = document.querySelector('#connect');
var userName = document.querySelector('#username');
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
var LoginForm = React.createClass({
	displayName: 'LoginForm',

	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'h2',
				null,
				'¿Quiéres conectárte?'
			),
			React.createElement('input', { id: 'username', type: 'text', placeholder: 'Tú nombre' }),
			React.createElement(
				'button',
				{ id: 'connect', className: 'pure-button pure-button-primary' },
				'Conectar'
			)
		);
	}
});

var ClientActions = React.createClass({
	displayName: 'ClientActions',

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'pure-g' },
			React.createElement(
				'div',
				{ id: 'options-container', className: 'pure-u-1 pure-u-md-2-5' },
				React.createElement(
					'p',
					null,
					'Controls'
				),
				React.createElement('div', { className: 'options-container-elements' })
			),
			React.createElement(
				'div',
				{ id: 'queue-list', className: 'pure-u-1 pure-u-md-2-5' },
				React.createElement(
					'p',
					null,
					'Cola de peticiones'
				),
				React.createElement('div', { className: 'list' })
			),
			React.createElement(
				'div',
				{ id: 'clients', className: 'pure-u-1 pure-u-md-1-5' },
				React.createElement(
					'p',
					null,
					'Clientes conectados'
				),
				React.createElement('p', { className: 'clients' })
			)
		);
	}
});
ReactDOM.render(React.createElement(LoginForm, null), loginElement);
/*ReactDOM.render(
	<ClientActions />,
  	client
);*/
//# sourceMappingURL=login.js.map
