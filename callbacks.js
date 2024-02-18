let promise = new Promise(function (resolve, reject) {
    // setTimeout(()=> resolve("After time Out"),1000);
    setTimeout(() => reject("After time Out"), 1000);
});

promise.then(value => console.log(value + "-fulfilled"))
    .catch(error => console.log(error + "-error"))
    .finally(() => console.log("all done"));
