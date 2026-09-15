// import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js"
// import { getDatabase,
//          ref,
//          push,
//          onValue,
//          remove } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js"
// const firebaseConfig = {
//     databaseURL: "https://shopping-list-app-fb3db-default-rtdb.europe-west1.firebasedatabase.app/"
// }

// const app = initializeApp(firebaseConfig)
// const database = getDatabase(app)
// const referenceInDB = ref(database, "items")

const addBtn = document.getElementById("add-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const inputEl = document.getElementById("input-el")
const form = document.getElementById("form")
let items = []
let itemsFromLocalStorage = JSON.parse(localStorage.getItem("items"))

if (itemsFromLocalStorage) {
    items = itemsFromLocalStorage
    render(items)
}

function render(items) {
    ulEl.innerHTML = ""
    for (let i = 0; i < items.length; i++) {
        const li = document.createElement("li")
        li.textContent = items[i]
        ulEl.append(li)
    }
}

function addItemToDOM(item) {
    const li = document.createElement("li")
    li.textContent = item
    li.style.opacity = "0"
    li.style.transform = "translateY(10px)"
    ulEl.append(li)

    setTimeout(function() {
        li.style.opacity = "1"
        li.style.transform = "translateY(0)"
    }, 10)
}

// onValue(referenceInDB, function(snapshot) {
//     const snapshotDoesExist = snapshot.exists()
//     if (snapshotDoesExist) {
//         const snapshotValues = snapshot.val()
//         const items = Object.values(snapshotValues)
//         render(items)
//     }
// })

form.addEventListener("submit", function(e) {
    e.preventDefault()
    // push(referenceInDB, inputEl.value)
    if (inputEl.value) {
        items.push(inputEl.value)
        addItemToDOM(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("items", JSON.stringify(items))
    }
})

deleteBtn.addEventListener("click", function() {
    // remove(referenceInDB)
    ulEl.innerHTML = ""
    localStorage.clear()
    items = []
    render(items)
})
