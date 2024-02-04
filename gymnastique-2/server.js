'use strict';

const express = require('express'), 
    path = require('path'), 
    fs = require('fs'),
    { make, img_convert } = require('./image_manager');

const app = express();

const public_path = path.join(__dirname, 'public');
const views_path = path.join(public_path, 'views');
app.use(express.static(public_path, { index: false }));

// Middleware pour savoir si le navigateur supporte les images webp
app.use((req, _, next) => {
    const accept = req.get('Accept');

    req.webp_supported = accept.includes('image/webp');
  
    next();
});

// generate static pages to be served
const generate = () => {

    const files = fs.readdirSync(views_path).map( file => {
        return [file.split('.')[0], fs.readFileSync(path.join(views_path, file), 'utf8')];
    });
    
    const layout = fs.readFileSync(path.join(public_path, 'index.html'), 'utf8');

    let combined = files.reduce( (acc, file) => {
        return acc.replace(`<%= ${file[0]} %>`, file[1]);
    }, layout);    

    let temp = combined; // au cas où img_convert a eu un problème
    let combined1 = img_convert(combined, false);
    if (combined1 === undefined || combined1 === null) {
        combined1 = temp;
    }

    let combined2 = img_convert(combined, true);
    if (combined2 === undefined || combined2 === null) {
        combined2 = temp;
    }

    return [combined1, combined2];
}

let [JPG_FRIENDLY, WEBP_FRIENDLY] = generate();

setInterval ( () => {
    make();
    [JPG_FRIENDLY, WEBP_FRIENDLY] = generate();
}, 5000); // 30 minutes

app.get('/', function(req, res) {
    res.send(req.webp_supported ? WEBP_FRIENDLY : JPG_FRIENDLY);
});

make();

module.exports = app;