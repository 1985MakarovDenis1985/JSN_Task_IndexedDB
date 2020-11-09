
////  V 1.0
export var db;

function indexedDBOk() {
    return "indexedDB" in window;
}

//// CREATED DB
export function createDataBase(callback) {
    return new Promise((resolve, reject) => {
        document.addEventListener("DOMContentLoaded", function () {

            //No support? Go in the corner and pout.
            if (!indexedDBOk) return;
            var openRequest = indexedDB.open("imagesDB", 1);

            openRequest.onupgradeneeded = function (e) {
                var thisDB = e.target.result;
                if (!thisDB.objectStoreNames.contains("images")) {
                    let objectStore = thisDB.createObjectStore("images", {autoIncrement: true})
                    objectStore.createIndex("name", "name", {unique: false});
                    objectStore.createIndex("email", "email", {unique: true});
                }
            },
                openRequest.onsuccess = function (e) {
                    console.log("running onsuccess");
                    db = e.target.result;
                    callback
                    resolve(db)
                },
                openRequest.onerror = function (e) {
                    console.log("Do something for the error")
                }
        }, false);
    })
}




