const http = require("http");
const fs = require("fs");

const port = 3000;
const ip   = "127.0.0.1"

const sendResponse = (filename, statusCode, response) => {
    fs.readFile(`./html/${filename}`, (error, data) => {
        if (error){
            response.statusCode = 500;
            response.setHeader("Content-Type", "text/plain");
            response.end("Sorry, Internal Error!");
        } else {
            response.statusCode = statusCode;
            response.setHeader("Content-Type", "text/html");
            response.end(data);
        }
    }); 
};

const server = http.createServer((request, response) => {
    console.log(request.method, request.url);
    const method = request.method;
    let url    = request.url;
    
    if (method === "GET"){
        const requestUrl = new URL (url, `http://${ip}:${port}`);
        url = requestUrl.pathname;

        const lang = requestUrl.searchParams.get("lang");
        let selector;   

        if (lang === null || lang === "en"){
            selector = "";
        } 
        else if (lang === "zh"){
            selector = "-zh";
        }
        else {
            selector = "";
        }


        if (url === "/"){
            //when the page equals to main page
            sendResponse(`index${selector}.html`, 200, response);  
        } else if (url === "/about.html") {
            sendResponse(`about${selector}.html`, 200, response);
        } else {
            sendResponse(`404${selector}.html`, 404, response);
        }
    }else{
        
    };
});

//callback function is used by ();

server.listen(port, ip, () => {
    console.log(`Server's running at http://${ip}:${port}`);
});