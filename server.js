const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 3000;
//const _ = require('lodash');

const server = http.createServer((req, res) => {
    
    // lodash
    // const randomNumber = _.random(0, 9)
    // console.log(randomNumber);
    
    // const greet = _.once(() => {
    //     console.log('hello');
    // });
    // greet()

    // setting header content-type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/'
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }
    
    // sending an html file
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err)
            res.end()
        } else {
            //res.write(data)
            res.end(data)
        }
    })
})


server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`)
})