const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');


// Import for modules
const replaceTemplate = require("./modules/replaceTemplate")

///////////////////////////////////////
// CALL BACK:
// // Blocking, synchronous way
// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textInput);
// const textOut = `This is what we know about the avocado: ${textInput}. \n Created on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log("File written");

// // Non-Blocking, synchronous way:

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) =>{
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2)=>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) =>{
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2} \n ${data3}`, 'utf-8', err=>{
//                 console.log("Your file has been written 😀");
//             })
//         })
//     })
// })

///////////////////////////////////////
// SERVER:
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const dataObj = JSON.parse(data);   

const slug = dataObj.map(el=>slugify(el.productName, {lower: true}));
console.log(slug);



const server = http.createServer((req, res) =>{
    // Routing    
    const {query, pathname} = url.parse(req.url,true);
    
    
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace(/{%PRODUCT_CARD%}/g, cardsHtml);
        res.end(output);

    }else if(pathname === '/product'){
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }else if(pathname === '/api'){
            res.writeHead(200, {
                'Content-type':'application/json'
            });
            res.end(data);   
    }else{
        res.writeHead(404, {
            'Content-type':'text/html',
            'my-own-header': 'hello-world'
        })
        res.end("<h1>404 Not Found</h1>");
    }
    
})

server.listen(8000, 'localhost', () =>{
    console.log("Listening to requests on port 8000");
})