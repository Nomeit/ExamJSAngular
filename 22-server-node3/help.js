/* https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback */

// fs.readFile("url", "code", f);
// fs.readFileSync("url", "code");

// fs.writeFile("url", data, f);
// fs.writeFileSync("url", data);

// fs.appendFile("url", data, f);

// fs.unlink("hello.txt", f);

// res.statusCode = 200;
// res.setHeader('Content-Type', 'text/html');
// res.setHeader('Content-Type', 'text/css');
// res.setHeader('Content-Type', 'text/javascript');


// url.match(/.js$/);


function (request, response) {
  if (request.method == 'POST') {
    var body = '';
    request.on('data', function (data) {
        body += data;
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6) {
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            request.connection.destroy();
        }
    });
    request.on('end', function () {
        var POST = qs.parse(body);
        // use POST
    });
  }
}
