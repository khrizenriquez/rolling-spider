/********************************
@khrizenriquez: Christofer Enríquez <christoferen7@gmail.com>
********************************/

'use strict';

//  Rolling spider library
var RollingSpider   = require('rolling-spider');
var rollingSpider   = new RollingSpider();

var maxClients = 5, 
    maxActions = 5;

var os      = require('os'), 
    ifaces  = os.networkInterfaces(), 
    localIp = '';
//  http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }
        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            localIp = iface.address;
        } else {
            // this interface has only one ipv4 adress
            localIp = iface.address;
        }
        ++alias;
    });
});

//  Server with express
var express = require('express');
var path    = require('path');
var app     = express();

//  Session values
var session = require("express-session")({
    secret: "rolling-spider",
    resave: true,
    saveUninitialized: true
});
var sharedsession   = require("express-socket.io-session");

//  Socket.io
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

var requestSession;
const STEPS = 3;
var ACTIVE  = false;

//  Body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/********************************
Block the header from containing information about the server
********************************/
app.disable('x-powered-by');

//  Logger
//var logger = require('morgan');
//app.use(logger('dev'));

//  Cookie parser
//var cookieParser = require('cookie-parser');
//app.use(cookieParser());


/********************************
Template engine
********************************/
//app.engine('html', require('ejs').renderFile);

// view engine setup
var exphbs = require('express-handlebars');

/********************************
Middleware
********************************/
app.use(session);

//var stylus  = require('stylus');
//var nib     = require('nib');

app.engine('handlebars', exphbs({
    extname:        '.handlebars', 
    defaultLayout:  'main', 
    layoutsDir:     __dirname + '/views/layouts', 
    partialsDir:    __dirname + '/views/partials'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view cache', false);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

io.use(sharedsession(session, {
    autoSave:true
}));

/********************************
Creating socket
********************************/
var users       = [],
    userActions = [],
    doActions   = false;

io.on('connection', function (socket) {
    console.log('someone connected');
    socket.emit('user-connected', users);

    socket.on('user-connected', function(data) {
        if (users.length >= maxClients) return false;

        if (socket.handshake.session.appName === undefined) {
            socket.handshake.session.appName     = 'Rolling-spider';
            socket.handshake.session.date        = new Date();
            socket.handshake.session.deviceInfo  = '';
            socket.handshake.session.myName      = purifyUserName(data.myName);
        }
        let response = {
            myName: socket.handshake.session.myName || '-'
        }

        users.push(response);

        io.sockets.emit('user-connected', users);
    });

    socket.emit('user-actions', users);

    socket.on('user-actions', function(data) {
        let limit           = 10, 
            lastElements    = [];
        data.userActions.userName   = socket.handshake.session.myName || '';
        data.userActions.done       = false;

        if (userActions.length >= maxActions) return false;
        userActions.unshift(data.userActions);

        if (userActions.length > 0) {
            doActions = true;
            userActions.some(function (element, index, arr) {
                console.log(element);
                if (index >= limit) return false;

                if (lastElements.length >= maxActions) return false;

                lastElements.push(element);
            });
        } else {
            doActions = false;
        }

        if (lastElements.length >= maxActions) return false;

        io.sockets.emit('user-actions', lastElements);
    });

});

var purifyUserName = function (name) {
    let n           = name || 'afroc-drone',
        comodinName = 'afroc-drone',
        finalName   = '';

    //  El nombre que entre lo limpio, si vienen palabras que no deben ir en el nombre
    //  las reemplazo
    let badWords = [
        'put',
        'cagu',
        'mierd',
        'culer',
        'verg',

        //
        'ass',
        'asshole',
        'dick',
        'jerkass',
        'fuck'
    ];

    let flag = false;
    badWords.some(function (element, index, arr) {
        if (name.toLowerCase().match(element)) {
            console.log(n);
            console.log(element);
            flag = true;

            return false;
        }
        return false;
    });
    return (flag) ? comodinName + '_' + Math.ceil(Math.random(0, 100) * 1000) :
                    n;
};

function cooldown () {
    ACTIVE = false;
    setTimeout(function () {
        ACTIVE = true;
    }, STEPS * 12);
}

var droneFlight = function (action) {
    let a = action.toLowerCase() || '';

    if (a === 'arriba') {
        rollingSpider.up({
            steps: STEPS * 3
        });
        cooldown();
    } else
    if (a === 'abajo') {
        rollingSpider.down({
            steps: STEPS * 3
        });
        cooldown();
    } else
    if (a === 'izquierda') {
        rollingSpider.left({ steps: STEPS * 3 });
        cooldown();
    } else
    if (a === 'derecha') {
        rollingSpider.right({ steps: STEPS * 3 });
        cooldown();
    } else
    if (a === 'girar izquierda') {
        rollingSpider.turnLeft({ steps: STEPS * 3 });
        cooldown();
    } else
    if (a === 'girar derecha') {
        rollingSpider.turnRight({ steps: STEPS * 3 });
        cooldown();
    } else
    if (a === 'adelante') {
        //rollingSpider.forward({ steps: STEPS });
        rollingSpider.forward({ steps: STEPS * 3 }, function () {
            console.log('Adelante');
        });
        cooldown();
    } else
    if (a === 'atrás') {
        rollingSpider.backward({ steps: STEPS * 3 }, function () {
            console.log('atrás');
        });
        //rollingSpider.backward({ steps: STEPS });
        cooldown();
    } else {
        console.log('Condición no definida');
    }

    return;
};

var doQueueDroneActions = function () {
    let interval = setInterval(function () {
        if (!doActions) return false;

        if (userActions.length <= 0) {
            doActions = false;
            return false;
        }

        //  Elimino el ultimo valor
        let p = userActions.pop();

        //  Ejecuto la acción del drone
        droneFlight(p.action);
        //console.log(userActions);
        //console.log(userActions.length);
        if (userActions.length >= maxActions) return false;
        io.sockets.emit('user-actions', userActions);

        return false;
    }, 3000);
}();

function createSessionForUser (request, params) {
    //  Validate if session exist
    if (request.appName === undefined) {
        request.appName     = 'Rolling-spider';
        request.date        = new Date();
        request.deviceInfo  = '';
        request.myName      = purifyUserName(params.myName);
    }
}

var connectUser = function (request, params) {
    let r           = request || undefined;
    let response    = {};

    if (!userIsConnected()) {
        createSessionForUser(r, params);

        response.status     = 'OK';
        response.message    = 'Creo la sesión para el usuario';

        return response;
    }

    response.status     = 'OK';
    response.message    = 'El usuario ya existe';
    return response;
}

var userIsConnected = function (request) {
    let session = request || {};
    return (session.appName === undefined) ? false : true;
}

//  Routes
var login = require('./routes/login');
var home  = require('./routes/home');
var admin = require('./routes/admin');
app.use('/', login);
app.use('/', home);
app.use('/', admin);

//  Drone actions
app.post('/droneaction/:action', function (req, res) {
    if (req.params.action === 'wakeupdrone') {
        ACTIVE = false;
        console.log('Iniciar drone');
        rollingSpider.connect(function (e) {
            console.log('Drone conectado');
            rollingSpider.setup(function () {
                rollingSpider.flatTrim();
                rollingSpider.startPing();
                rollingSpider.flatTrim();
                //console.log('Dentro del setup');

                ACTIVE = true;
            });
        });

        var inter = setInterval(function () {

            if (ACTIVE) {
                console.log('Drone listo para volar');
                rollingSpider.takeOff(function () {});

                clearInterval(inter);
            }
        }, 2000);
    } else
    if (req.params.action === 'putsleep') {
        console.log('Poner a domir');
        rollingSpider.land(function () {
            console.log('Aterrizando');
            //  Mato todos los procesos actuales que ejecuta el drone
            userActions = [];
            doActions   = false;

            process.exit(0);
        });
    } else {
        console.log('Ninguna acción definida');
    }

    return res.json();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/********************************
Creating the server
********************************/
http.listen(3000, function () {
    let host = localIp;
    let port = this.address().port;

    console.log('Servidor en ruta http://%s:%s', host, port);
});
