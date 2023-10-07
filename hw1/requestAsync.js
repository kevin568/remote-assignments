const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require("node-fetch");
const url =
  "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";

console.time("Total Execution Time");

function requestCallback(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const start = Date.now();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const end = Date.now();
        resolve("Callback execution time: " + (end - start) + "ms");
      }
    };
    xhr.onerror = function () {
      reject("An error occurred during the transaction");
    };
    xhr.send();
  });
}

function requestPromise(url) {
  const start = Date.now();
  return fetch(url)
    .then((res) => res.text())
    .then(() => {
      const end = Date.now();
      return "Promise execution time: " + (end - start) + "ms";
    });
}

async function requestAsyncAwait(url) {
  const start = Date.now();
  await fetch(url);
  const end = Date.now();
  return "Async/Await execution time: " + (end - start) + "ms";
}

Promise.all([requestCallback(url), requestPromise(url), requestAsyncAwait(url)])
  .then((results) => {
    results.forEach((result) => console.log(result));
    console.timeEnd("Total Execution Time");
  })
  .catch((error) => console.error(error));

