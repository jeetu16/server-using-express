const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3400;

app.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
})

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'new-page.html'));
})

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html');  // 302 by Default means temporary redirect
});

// Route Handler
app.get('/hello(.html)?', (req, res, next) => {
    console.log("Attended to load hello.html");
    next();
    }, (req, res) => {
        res.send("Hello world");
    }
)
// chaining route handlers
const first = (req,res,next) => {
    console.log("First");
    next();
}

const second = (req,res,next) => {
    console.log("Second");
    next();
}

const thrid = (req,res) => {
    console.log("Third");
    res.send("Finished");
}

app.get('/chain(.html)?', [first,second,thrid]);


app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'pages', '404.html'));
})

app.listen(PORT, () => console.log(`Successfully Running On ${PORT}`));