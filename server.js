'use strict';

const express = require('express');
const pw = require('playwright');

const PORT = 8080;
const HOST = '0.0.0.0';
const PLAYWRIGHT = process.env.PLAYWRIGHT_URL;

if(!PLAYWRIGHT){
    console.log("environment variable PLAYWRIGHT_URL is undefined, exiting...");
    process.exit(1);
}

// App
const app = express();
app.use(express.raw({
    limit: "1024kb",
    type: "*/*"  //ignore posted content-type
}));

//ready probe
app.get('/ready', (req, res) => {
    res.send('ready');
});

app.post('/', async (req, res) => {
    try {
        const html = req.body.toString('base64');

        const browser = await pw.chromium.connect({
            wsEndpoint: PLAYWRIGHT,
        });

        const page = await browser.newPage();
        await page.goto('data:text/html;base64,' + html);

        const pdf = await page.pdf({
            scale: 1,
            displayHeaderFooter: false,
            preferCSSPageSize: true,
            printBackground: true
        });
        await browser.close();

        res.setHeader('Content-Type', "application/pdf");
        res.send(pdf);
    } catch (e) {
        res.status(400).json({ status: 400, message: e.message });
    }
})


app.listen(PORT, HOST);

console.log('Started. Using playwright at : ' + PLAYWRIGHT);