const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require("node-fetch");
const url =
  "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";

function requestCallback(url, callback) {
  const xhr = new XMLHttpRequest();
  const start = Date.now();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const end = Date.now();
      callback("Execution time: " + (end - start) + "ms");
    }
  };
  xhr.send();
}

function requestPromise(url) {
  const start = Date.now();
  return fetch(url)
    .then((res) => res.text())
    .then(() => {
      const end = Date.now();
      return "Execution time: " + (end - start) + "ms";
    });
}

async function requestAsyncAwait(url) {
  try {
    const start = Date.now();
    await fetch(url);
    const end = Date.now();
    console.log("Execution time: " + (end - start) + "ms");
  } catch (error) {
    console.error("Error:", error);
  }
}

requestCallback(url, console.log);
requestPromise(url).then(console.log).catch(console.error);
requestAsyncAwait(url);
