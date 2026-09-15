Shopping List App

Una semplice applicazione web per creare e gestire una lista della spesa, sviluppata con HTML, CSS e JavaScript.

L’applicazione permette di aggiungere prodotti alla propria lista, conservarli anche dopo la chiusura o il refresh della pagina e cancellare l’intera lista quando necessario.

Il progetto è inoltre configurato per essere installato su dispositivi mobile come Web App, con icona personalizzata e visualizzazione standalone.

Funzionalità

* Aggiunta di nuovi prodotti alla lista, anche premendo Invio (submit tramite form)
* Animazione di comparsa per ogni nuovo prodotto aggiunto alla lista
* Salvataggio dei prodotti tramite localStorage
* Persistenza dei dati anche dopo il refresh o la chiusura della pagina
* Lista indipendente per ogni utente/browser
* Eliminazione di tutti i prodotti
* Interfaccia responsive adatta ai dispositivi mobile
* Possibilità di aggiungere l’app alla schermata Home
* Apertura dell’app in modalità standalone
* Icona personalizzata per dispositivi iOS e Android

Tecnologie utilizzate

* HTML5 — struttura della pagina
* CSS3 — stile e layout responsive
* JavaScript — logica dell’applicazione e manipolazione del DOM
* localStorage — salvataggio locale e persistenza della lista
* JSON — conversione dei dati per il salvataggio e il recupero dal localStorage
* Web App Manifest — configurazione dell’app per dispositivi mobile
* Git & GitHub — versionamento e pubblicazione del progetto

Gestione dei dati con localStorage

La versione attuale dell’applicazione utilizza il localStorage del browser per salvare gli elementi della lista.

Quando viene aggiunto un nuovo prodotto, questo viene inserito nell’array items:

items.push(inputEl.value)

L’array viene successivamente convertito in una stringa JSON e salvato nel localStorage:

localStorage.setItem("items", JSON.stringify(items))

All’apertura dell’applicazione, i dati vengono recuperati e riconvertiti in un array JavaScript:

let itemsFromLocalStorage = JSON.parse(
    localStorage.getItem("items")
)

In questo modo la lista rimane disponibile anche dopo aver chiuso o ricaricato la pagina.

Inoltre, poiché il localStorage appartiene al singolo browser, utenti diversi non condividono automaticamente la stessa lista.


Evoluzione del progetto: da Firebase a localStorage

La prima versione della Shopping List App utilizzava Firebase Realtime Database per salvare i prodotti.

La connessione al database utilizzava un unico riferimento:

const referenceInDB = ref(database, "items")

I prodotti venivano aggiunti tramite: push(referenceInDB, inputEl.value)
e recuperati in tempo reale utilizzando:
onValue(referenceInDB, function(snapshot) {
    // recupero dei dati
})

Questa soluzione permetteva di salvare i dati online e sincronizzarli in tempo reale.

Tuttavia, tutti gli utenti dell’applicazione utilizzavano lo stesso percorso items del database Firebase.

Di conseguenza:

Utente A → aggiunge "Latte"
                  ↓
           Firebase /items
                  ↓
Utente B → vede "Latte"

Questo significava che tutti gli utenti condividevano la stessa lista della spesa.

Per risolvere il problema, ho deciso di modificare il sistema di persistenza utilizzando localStorage.

La struttura attuale è quindi:

Utente A
└── localStorage
    └── ["Latte", "Pane"]
Utente B
└── localStorage
    └── ["Pasta", "Acqua"]

In questo modo ogni utente può utilizzare l’applicazione mantenendo una lista personale e indipendente dagli altri utenti.

Questa modifica mi ha permesso anche di comprendere meglio la differenza tra il salvataggio dei dati in un database remoto condiviso e il salvataggio locale all’interno del browser.

Versione Mobile

L’applicazione è stata configurata per offrire un’esperienza simile a quella di un’app mobile.

Il file site.webmanifest definisce:

* Nome dell’applicazione
* Nome breve dell’app
* Icone da 192x192 e 512x512
* Colore del tema
* Colore di sfondo
* Modalità di visualizzazione standalone

Sono inoltre presenti diverse icone per garantire la compatibilità con browser e dispositivi differenti:

* android-chrome-192x192.png
* android-chrome-512x512.png
* apple-touch-icon.png
* favicon-16x16.png
* favicon-32x32.png
* favicon.ico

In questo modo l’app può essere aggiunta alla schermata Home di uno smartphone e aperta con la propria icona, offrendo un’esperienza più vicina a quella di un’applicazione mobile.

Cosa ho imparato

Durante la realizzazione e il miglioramento di questo progetto ho approfondito:

* Manipolazione del DOM con JavaScript
* Rendering dinamico di una lista
* Utilizzo di array JavaScript
* Utilizzo di localStorage
* Persistenza dei dati nel browser
* Utilizzo di JSON.stringify()
* Utilizzo di JSON.parse()
* Gestione degli eventi con addEventListener()
* Gestione del submit di un form e differenza tra l'evento submit (sul form) e click (sul bottone)
* Creazione di transizioni CSS per l'inserimento dinamico di elementi nel DOM
* Differenza tra salvataggio locale e database remoto
* Utilizzo di Firebase Realtime Database nella prima versione
* Individuazione e risoluzione di un problema legato alla condivisione dei dati tra utenti
* Creazione di un’interfaccia responsive
* Configurazione di una Web App per dispositivi mobile
* Utilizzo del file site.webmanifest
* Gestione di favicon e icone per iOS e Android

Struttura del progetto

* index.html — struttura della pagina
* style.css — stile e layout
* index.js — logica dell’applicazione
* site.webmanifest — configurazione della Web App
* android-chrome-192x192.png, android-chrome-512x512.png, apple-touch-icon.png, favicon-16x16.png, favicon-32x32.png, favicon.ico — icone per browser e dispositivi
* .gitignore — file e cartelle esclusi dal versionamento (es. configurazioni locali di editor/tool)
* README.md — documentazione del progetto

Come utilizzare l’app

1. Inserisci il nome di un prodotto nel campo di testo.
2. Premi ADD ITEM oppure premi Invio.
3. Il prodotto viene aggiunto alla lista con una piccola animazione e salvato nel localStorage.
4. Continua ad aggiungere tutti i prodotti necessari.
5. Chiudendo o ricaricando la pagina, i prodotti rimangono salvati.
6. Premi DELETE ALL per eliminare tutti i prodotti e svuotare la lista.

Su un dispositivo mobile è inoltre possibile aggiungere la Web App alla schermata Home per utilizzarla in modo simile a un’applicazione installata.

Obiettivo del progetto

L’obiettivo del progetto è stato creare una semplice applicazione frontend per la gestione di una lista della spesa, approfondendo la manipolazione del DOM e la persistenza dei dati con JavaScript.

Il progetto inizialmente utilizzava Firebase Realtime Database, ma durante lo sviluppo ho individuato il problema della condivisione della stessa lista tra tutti gli utenti.

Ho quindi modificato l’architettura dell’applicazione utilizzando localStorage, permettendo a ogni utente di mantenere una propria lista indipendente.

Questo processo mi ha permesso non solo di implementare nuove funzionalità, ma anche di analizzare un problema reale dell’applicazione e scegliere una soluzione più adatta al suo funzionamento.


Progetto realizzato durante il mio percorso di formazione per diventare Frontend Developer.