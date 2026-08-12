import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js"
import { getDatabase,
         ref,
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js"
const firebaseConfig = {
    databaseURL: "https://shopping-list-app-fb3db-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "items")

const addBtn = document.getElementById("add-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const inputEl = document.getElementById("input-el")

function render(items) {
    let listItems = ""
    for (let i = 0; i < items.length; i++) {
        listItems += `<li>    
                            ${items[i]}
                     </li>`
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const items = Object.values(snapshotValues)
        render(items)
    }
})

addBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})

deleteBtn.addEventListener("click", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})
