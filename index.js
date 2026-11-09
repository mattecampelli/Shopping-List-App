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

// ---- Elementi della HOME (tutte le liste) ----
const homeView = document.getElementById("home-view")
const newListForm = document.getElementById("new-list-form")
const listTitleInput = document.getElementById("list-title-input")
const selectListsBtn = document.getElementById("select-lists-btn")
const listsEl = document.getElementById("lists-el")
const emptyMsg = document.getElementById("empty-msg")
const deleteSelectedListsBtn = document.getElementById("delete-selected-lists-btn")

// ---- Elementi della LISTA APERTA ----
const listView = document.getElementById("list-view")
const backBtn = document.getElementById("back-btn")
const shareBtn = document.getElementById("share-btn")
const listTitleEl = document.getElementById("list-title")
const form = document.getElementById("form")
const inputEl = document.getElementById("input-el")
const selectBtn = document.getElementById("select-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const deleteSelectedBtn = document.getElementById("delete-selected-btn")

const overlay = document.getElementById("overlay")

// Tutte le liste: [{ id: "...", title: "Spesa", items: ["latte", "pane"] }, ...]
let lists = loadLists()
// La lista aperta in questo momento (null = siamo nella home)
let currentList = null

renderLists()
importSharedList()

// =====================================================
// DATI: caricare e salvare nel localStorage
// =====================================================

function loadLists() {
    try {
        const savedLists = JSON.parse(localStorage.getItem("lists"))
        if (savedLists) {
            return savedLists
        }

        // Migrazione: chi usava la versione vecchia aveva una sola lista salvata sotto "items".
        // La trasformo nella prima lista, così non perde niente.
        const oldItems = JSON.parse(localStorage.getItem("items"))
        if (oldItems && oldItems.length > 0) {
            const migratedLists = [{ id: createId(), title: "La mia lista", items: oldItems }]
            localStorage.setItem("lists", JSON.stringify(migratedLists))
            localStorage.removeItem("items")
            return migratedLists
        }
    } catch (error) {
        // se i dati salvati sono rotti l'app non si blocca: riparte con zero liste
        console.error("Dati salvati non validi:", error)
    }
    return []
}

function saveLists() {
    localStorage.setItem("lists", JSON.stringify(lists))
}

// id unico per ogni lista: i millisecondi di adesso + un numero a caso
function createId() {
    return Date.now().toString() + Math.floor(Math.random() * 1000)
}

// =====================================================
// CAMBIO SCHERMATA con transizione
// =====================================================

function switchView(fromView, toView) {
    exitSelectionMode()
    // 1. la schermata attuale sfuma via
    fromView.classList.add("faded")

    setTimeout(function() {
        // 2. quando è sparita la tolgo e metto l'altra (ancora trasparente)
        fromView.hidden = true
        toView.hidden = false

        setTimeout(function() {
            // 3. la nuova schermata compare piano piano
            toView.classList.remove("faded")
            // sposto il focus sul titolo, così chi usa la tastiera/screen reader sa dov'è
            toView.querySelector("h1").focus()
        }, 20)
    }, 250)
}

// =====================================================
// HOME: tutte le liste
// =====================================================

function renderLists() {
    listsEl.innerHTML = ""
    for (const list of lists) {
        const li = document.createElement("li")
        const card = document.createElement("button")
        card.type = "button"
        card.className = "list-card"
        card.dataset.id = list.id
        card.textContent = list.title
        li.append(card)
        listsEl.append(li)
    }
    // il messaggio "nessuna lista" si vede solo se non ci sono liste
    emptyMsg.hidden = lists.length > 0
}

// NUOVA LISTA: creo la lista con il titolo scritto e la apro subito
newListForm.addEventListener("submit", function(e) {
    e.preventDefault()
    const title = listTitleInput.value.trim()
    if (!title) {
        listTitleInput.focus()
        return
    }
    const newList = { id: createId(), title: title, items: [] }
    lists.push(newList)
    saveLists()
    listTitleInput.value = ""
    renderLists()
    openList(newList.id)
})

// Click su una lista: la apro, oppure (in modalità selezione) la seleziono
listsEl.addEventListener("click", function(e) {
    const id = e.target.dataset.id
    if (!id) {
        return
    }
    if (document.body.classList.contains("selection-mode")) {
        e.target.classList.toggle("selected")
    } else {
        openList(id)
    }
})

// ELIMINA LISTA: entro nella modalità selezione
selectListsBtn.addEventListener("click", function() {
    if (lists.length > 0) {
        document.body.classList.add("selection-mode")
    }
})

// ELIMINA SELEZIONATE (home): chiedo conferma e tengo solo le liste NON selezionate
deleteSelectedListsBtn.addEventListener("click", function() {
    const selectedCards = listsEl.querySelectorAll(".selected")
    if (selectedCards.length > 0) {
        const message = selectedCards.length === 1
            ? "Vuoi davvero cancellare questa lista?"
            : `Vuoi davvero cancellare ${selectedCards.length} liste?`
        if (!confirm(message)) {
            return
        }
        const idsToDelete = []
        for (const card of selectedCards) {
            idsToDelete.push(card.dataset.id)
        }
        lists = lists.filter(list => !idsToDelete.includes(list.id))
        saveLists()
    }
    exitSelectionMode()
})

// =====================================================
// LISTA APERTA: funziona come prima, ma su currentList.items
// =====================================================

function openList(id) {
    currentList = lists.find(list => list.id === id)
    if (!currentList) {
        return
    }
    listTitleEl.textContent = currentList.title
    renderItems()
    switchView(homeView, listView)
}

// ← TUTTE LE LISTE: torno alla home
backBtn.addEventListener("click", function() {
    currentList = null
    renderLists()
    switchView(listView, homeView)
})

// Crea la casella di un prodotto. data-index = la sua posizione nell'array
function createItemEl(item, index) {
    const li = document.createElement("li")
    li.textContent = item
    li.dataset.index = index
    return li
}

function renderItems() {
    ulEl.innerHTML = ""
    for (let i = 0; i < currentList.items.length; i++) {
        ulEl.append(createItemEl(currentList.items[i], i))
    }
}

function addItemToDOM(item, index) {
    const li = createItemEl(item, index)
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
    // .trim() toglie gli spazi: "   " non diventa una casella vuota
    const newItem = inputEl.value.trim()
    if (newItem) {
        currentList.items.push(newItem)
        addItemToDOM(newItem, currentList.items.length - 1)
        saveLists()
    }
    inputEl.value = ""
})

deleteBtn.addEventListener("click", function() {
    // remove(referenceInDB)
    if (!confirm("Vuoi davvero cancellare tutta la lista?")) {
        return
    }
    currentList.items = []
    saveLists()
    renderItems()
})

// 1. Premo ELIMINA: entro nella modalità selezione
selectBtn.addEventListener("click", function() {
    if (currentList.items.length > 0) {
        document.body.classList.add("selection-mode")
    }
})

// 2. Clicco su una casella della lista: la seleziono o la deseleziono
ulEl.addEventListener("click", function(e) {
    if (document.body.classList.contains("selection-mode") && e.target.tagName === "LI") {
        e.target.classList.toggle("selected")
    }
})

// 3. Premo ELIMINA SELEZIONATI: tengo solo gli item NON selezionati
//    (uso il data-index di ogni casella, non la posizione nel DOM)
deleteSelectedBtn.addEventListener("click", function() {
    const indexesToDelete = []
    for (const li of ulEl.querySelectorAll(".selected")) {
        indexesToDelete.push(Number(li.dataset.index))
    }
    currentList.items = currentList.items.filter((item, index) => !indexesToDelete.includes(index))
    saveLists()
    exitSelectionMode()
})

// =====================================================
// MODALITÀ SELEZIONE (vale per prodotti e liste)
// =====================================================

// 4. Clicco sulla parte grigia (o premo Esc): esco senza cancellare niente
overlay.addEventListener("click", function() {
    exitSelectionMode()
})

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && document.body.classList.contains("selection-mode")) {
        exitSelectionMode()
    }
})

// Esco dalla modalità e ridisegno tutto (così spariscono le caselle selezionate)
function exitSelectionMode() {
    document.body.classList.remove("selection-mode")
    renderLists()
    if (currentList) {
        renderItems()
    }
}

// =====================================================
// CONDIVISIONE: mando una COPIA della lista dentro il link
// =====================================================

// CONDIVIDI: metto titolo e prodotti nel link come query string ?share=...
shareBtn.addEventListener("click", function() {
    const params = new URLSearchParams({
        share: JSON.stringify({ title: currentList.title, items: currentList.items })
    })
    // indirizzo dell'app senza query string + la nuova query string
    const link = location.href.split("?")[0] + "?" + params.toString()

    if (navigator.share) {
        // telefono (e alcuni browser desktop): si apre il menu "Condividi" (WhatsApp, Messaggi...)
        navigator.share({ title: currentList.title, text: `Lista "${currentList.title}"`, url: link })
            .catch(function(error) {
                // AbortError = l'utente ha chiuso il menu: non è un errore vero
                if (error.name !== "AbortError") {
                    prompt("Copia questo link e mandalo:", link)
                }
            })
    } else {
        // browser senza menu "Condividi": mostro il link da copiare
        prompt("Copia questo link e mandalo:", link)
    }
})

// All'avvio: se l'indirizzo contiene ?share=... aggiungo quella lista come lista NUOVA
function importSharedList() {
    const params = new URLSearchParams(location.search)
    const sharedData = params.get("share")
    if (!sharedData) {
        return
    }
    // tolgo ?share=... dall'indirizzo, così ricaricando la pagina non la importo di nuovo
    history.replaceState(null, "", location.pathname)

    try {
        const shared = JSON.parse(sharedData)
        if (typeof shared.title !== "string" || !Array.isArray(shared.items)) {
            throw new Error("Lista condivisa non valida")
        }
        const newList = {
            id: createId(),
            title: shared.title.trim() || "Lista condivisa",
            // tengo solo i prodotti che sono testo
            items: shared.items.filter(item => typeof item === "string")
        }
        lists.push(newList)
        saveLists()
        renderLists()
        openList(newList.id)
    } catch (error) {
        console.error(error)
        alert("Il link della lista non è valido")
    }
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
}
