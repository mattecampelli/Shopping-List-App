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
let items = []
let itemsFromLocalStorage = JSON.parse(localStorage.getItem("items"))

if (itemsFromLocalStorage) {
    items = itemsFromLocalStorage
    render(items)
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
}

function render(items) {
    let listItems = ""
    for (let i = 0; i < items.length; i++) {
        const itemText = escapeHtml(items[i])
        listItems += `<li>
                            <span class="item-text">${itemText}</span>
                            <button class="delete-item-btn" data-index="${i}" aria-label="Delete ${itemText}">&times;</button>
                     </li>`
    }
    ulEl.innerHTML = listItems
}

// onValue(referenceInDB, function(snapshot) {
//     const snapshotDoesExist = snapshot.exists()
//     if (snapshotDoesExist) {
//         const snapshotValues = snapshot.val()
//         const items = Object.values(snapshotValues)
//         render(items)
//     }
// })

addBtn.addEventListener("click", function() {
    // push(referenceInDB, inputEl.value)
    items.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("items", JSON.stringify(items))
    render(items)
})

deleteBtn.addEventListener("click", function() {
    // remove(referenceInDB)
    ulEl.innerHTML = ""
    localStorage.clear()
    items = []
    render(items)
})
