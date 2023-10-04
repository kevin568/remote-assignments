const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url =
  "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";

function requestSync(url) {
  const xhr = new XMLHttpRequest();
  const start = Date.now();
  xhr.open("GET", url, false); // false makes the request synchronous
  xhr.send();

  if (xhr.status === 200) {
    const end = Date.now();
    console.log("Execution time: " + (end - start) + "ms");
  } else {
    console.log("Error:", xhr.statusText);
  }
}

const start = Date.now();

requestSync(url);
requestSync(url);
requestSync(url);
const end = Date.now();
console.log("Total Execution time: " + (end - start) + "ms");
