let promise = new Promise(function (resolve, reject) {
    // setTimeout(()=> resolve("After time Out"),1000);
    setTimeout(() => reject("After time Out"), 1000);
});

promise.then(value => console.log(value + "-fulfilled"))
    .catch(error => console.log(error + "-error"))
    .finally(() => console.log("all done"));


Promise.all(
    [new Promise(resolve => resolve("first")),
    new Promise(resolve => resolve("second")),
    new Promise(resolve => resolve("third")),
]
).then(function(value){
    console.log(value);
})