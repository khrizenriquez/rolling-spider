/*
    @khrizenriquez: Christofer Enríquez
    christoferen7@gmail.com
*/
'use strict';

let ipData = (window.location.href.match('localhost') !== null) ? 'localhost' : '192.168.0.18';

let droneActions, 
    socket = io.connect(`http://${ipData}:3000`, { 'forceNew': true });

socket.on('user-connected', function (data) {
    if (document.querySelector('#clients') !== null) {
        let tmpResponse = '';
        data.some(function (element, index, arr) {
            tmpResponse += `<div class="connected-clients">
                                <i class="fa fa-user"></i> ${element.myName}
                            </div>`;
        });
        document.querySelector('#clients .clients').innerHTML = tmpResponse;
    }

});
socket.on('user-actions', function (data) {
    console.log('Acciones del usuario');
    console.log(data);
    getDroneActions();
});

let userAction = function (elementId) {
    let actionId = parseInt(elementId);
    let actionObject;
    droneActions.some(function (element, index, arr) {
        if (element.id === actionId) {
            actionObject = element;
            return true;
        }
    });

    socket.on('user-actions', function (data) {
        let queueList = document.querySelector('#queue-list .list');
        let tmpData = '';

        data.some(function (element, index, arr) {
            if (element === null) return;
            tmpData += `<div class="actions-client" id="${element.id}">${element.action}</div>`;
        });
        queueList.innerHTML = tmpData;
        //console.log(data);
    });
    socket.emit('user-actions', { userActions: actionObject });
    /*document.querySelector('#options-container .options-container-elements').addEventListener('click', function (evt) {
        
    });*/
};
/*
*   Obtenemos las acciones que el drone podrá ejecutar
*/
let getDroneActions = function () {
    let xhr = new XMLHttpRequest();
    let element = document.querySelector('#options-container .options-container-elements');
    if (element === null) return;
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            let response    = JSON.parse(xhr.responseText);
            let actionPart  = document.createElement("div");
            let txtResponse = '';
            response.some(function (elem, index, arr) {
                txtResponse += `<div onclick="return userAction(this.id);" class="drone-actions-list relative button-3d" id="${elem.id}">${elem.action} <span class="userAction drone-actions-list-icon midnight-blue"><i class="fa fa-plus"></i></span></div>`;
            });
            droneActions        = response;
            element.innerHTML   = txtResponse;
        }
    };
    xhr.open('GET', 'data.json', true);
    xhr.send(null);
};

document.addEventListener('DOMContentLoaded', function (e) {
    let button     = document.querySelector('#connect');
    let userName   = document.querySelector('#username');
    if (button !== null) {
        button.addEventListener('click', function (e) {
            //let socket = io('/rolling-chanel');
            e.preventDefault();

            if (/^\s*$/.test(document.querySelector('#username').value)) {
                return false;
            }

            socket.on('user-connected', function (data) {
                console.log(data[0].myName);
                if (data[0].myName === undefined) {
                    return false;
                }

                let login = document.querySelector('.login-container');
                login.style.right = '100%';
                let clientDiv = document.querySelector('#clientActions');
                setTimeout(function () {
                    clientDiv.classList.remove('display-none');
                    getDroneActions();
                }, 1000);

                return false;
            });
            socket.emit('user-connected', { myName: userName.value });
        });
    }
});
