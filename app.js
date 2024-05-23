const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs'); // ejs engine to use and define.
app.set('views', __dirname + '/views'); // view is inside this folder.

app.use(express.static(__dirname + '/public')) // set public folder for default. if it can't find the resource, go to the next line (if there's similar line for app.use)

const data = require("./data/travels.json")


// check the link, and show info accodingly using json
data.forEach((i) => {
    app.get(`/${i.id}`, (req, res) => {
        let navli = ""
        // for nav elements
        data.forEach((a) => {
            navli += `<li><a href=/${a.id}>${a.lugar}</a></li>`
        })
        // if the price is number, add EUR symbol.
        let precio = i.precio
        if(typeof i.precio !== "string"){
            precio =  "€" + i.precio
        }
        // sending it to index.
        res.render('index', {
            nav: navli,
            nombre: i.nombre,
            descripcion: i.descripcion,
            precio: precio,
            img: `${i.img}`
        });
    })
})


app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});