const http = require('http');
const fs = require('fs');
const { getTemplate } = require('./template.js');
const { getStationHtml } = require('./src/station.js');
const { getRoutsHtml } = require('./src/routs.js');
const { getIndexHtml } = require('./src/index.js');
const {
  getStore,
  saveStore,
} = require('./storeActions.js');
const {
  addStation,
  deleteStation,
  editStation,
  getStation
} = require('./actions/station.actions.js');
const {
  addRout,
  deleteRout,
  editRout,
  getRout
} = require('./actions/rout.actions.js');



const port = 3200;

const apiMethod = [
  'POST',
  'PUT',
  'DELETE',
];

const requestHandler = (request, response) => {

  const ursArr = request.url.split("/");
  let html = "Not found";
  let status = 404;

  if (request.method == 'GET' && ursArr[1] != 'api') {

    const isCss = request.url.match(/.css$/);
    const isJs = request.url.match(/.js$/);
    const isPng = request.url.match(/.png$/);
    const isJpg = request.url.match(/.jpg$/);

    // Опрацьовуємо статичні файли
    if (isCss || isJs || isPng || isJpg) {
      fs.readFile("." + request.url, "utf-8", function(err, data) {
        if (err) {
          console.log({url: request.url, err});
          response.statusCode = 404;
          response.end();
          return;
        }

        if (isCss) {
          response.setHeader('Content-Type', 'text/css');
        }
        if (isJs) {
          response.setHeader('Content-Type', 'text/javascript');
        }
        if (isPng) {
          response.setHeader('Content-Type', 'image/png');
        }
        if (isJpg) {
          response.setHeader('Content-Type', 'image/jpeg');
        }

        response.statusCode = 200;
        response.end(data);
      });
      // Сторінки
    } else {
      getStore(function (err, store) {

        if (err) {
          console.log({err});
          status = 500;
          html = "Помилка підключення до бази даних!";
        }

        switch (ursArr[1]) {
          case 'stations': {
            html = getStationHtml(ursArr, store);
            status = 200;
            break;
          }
          case 'rout': {
            html = getRoutsHtml(ursArr, store);
            status = 200;
            break;
          }
          case "" : {
            html = getIndexHtml(ursArr, store);
            status = 200;
            break;
          }
        }

        response.statusCode = status;
        response.end(getTemplate(html));
      });
    }
  } else if (apiMethod.includes(request.method)) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    response.setHeader('Content-Type', 'application/json');
    if (ursArr[1] === 'api') {
      const action = ursArr[2];
      let body = '';
      request.on('data', function (data) {

        body += data;
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6) {
          // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
          request.connection.destroy();
        }
      });
      console.log({body});
      request.on('end', function () {
        console.log(request.method);
        let runAction = null;
        let sendData = (request.method == 'DELETE')? { id: ursArr[3]}:JSON.parse(body);


        // use POST
        switch (action) {
          case 'station': {
            runAction = request.method == 'POST'
              ? addStation
              : request.method == 'PUT'
                ? editStation
                : request.method == 'DELETE'
                  ? deleteStation
                  : null;
            break;
          }
          case 'rout': {
            runAction = request.method == 'POST'
              ? addRout
              : request.method == 'PUT'
                ? editRout
                : request.method == 'DELETE'
                  ? deleteRout
                  : null;
            break;
          }
        }

        if (runAction) {
          runAction(sendData, function (err, result) {

            if (err) {
              response.statusCode = 400;
              response.end(JSON.stringify(result));
            }

            response.statusCode = 200;
            response.end(JSON.stringify(result));
          });
        } else {
          response.statusCode = 404;
          response.end();
        }

      });
      response.statusCode = status;
      response.end("Test");
    } else {
      response.statusCode = status;
      response.end();
    }
  } else {
    console.log('get');
    response.statusCode = status;
    let dataFromServer = "";
    const action = ursArr[2];
    let runAction = null;
    switch (action) {
      case 'station': {
        dataFromServer = "station";
        runAction = getStation;
        break;
      }
      case 'rout': {
        dataFromServer = "rout";
        runAction = getRout;
        break;
      }
    }

    if (runAction) {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      response.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
      response.setHeader('Content-Type', 'application/json');
      runAction(ursArr, function (err, result) {

        if (err) {
          response.statusCode = 400;
          response.end(JSON.stringify(result));
        }

        response.statusCode = 200;
        response.end(JSON.stringify(result));
      });
    } else {
      response.statusCode = 404;
      response.end();
    }
  }
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});


