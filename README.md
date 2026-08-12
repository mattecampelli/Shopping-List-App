Shopping List App

Una semplice applicazione web per creare e gestire una lista della spesa, sviluppata con HTML, CSS, JavaScript e Firebase Realtime Database.

L’applicazione permette di aggiungere prodotti alla lista, salvarli all’interno di un database Firebase e cancellare l’intera lista quando necessario.

Funzionalità

* Aggiunta di nuovi prodotti alla lista
* Salvataggio dei prodotti tramite Firebase Realtime Database
* Aggiornamento automatico della lista quando i dati nel database cambiano
* Eliminazione di tutti i prodotti
* Interfaccia semplice e responsive
* Persistenza dei dati grazie a Firebase

Tecnologie utilizzate

* HTML5 — struttura della pagina
* CSS3 — stile e layout responsive
* JavaScript — logica dell’applicazione e manipolazione del DOM
* Firebase Realtime Database — salvataggio e sincronizzazione dei dati
* Git & GitHub — versionamento e pubblicazione del progetto

Integrazione con Firebase

Il progetto utilizza Firebase Realtime Database per salvare gli elementi della lista della spesa.

Tra i principali metodi Firebase utilizzati:

* initializeApp() — inizializza Firebase
* getDatabase() — permette di accedere al database
* ref() — crea un riferimento alla sezione items del database
* push() — aggiunge un nuovo prodotto
* onValue() — ascolta i cambiamenti del database e aggiorna la lista
* remove() — elimina tutti i prodotti salvati

I dati ricevuti da Firebase vengono trasformati in un array tramite:

Object.values(snapshotValues) e successivamente mostrati dinamicamente nella pagina.


Cosa ho imparato

Durante la realizzazione di questo progetto ho approfondito:

* Collegamento di un’applicazione JavaScript a Firebase
* Utilizzo di Firebase Realtime Database
* Salvataggio, lettura ed eliminazione dei dati
* Utilizzo dei riferimenti al database
* Manipolazione del DOM con JavaScript
* Rendering dinamico della lista
* Utilizzo di array e oggetti JavaScript
* Utilizzo di Object.values()
* Gestione degli eventi con addEventListener()
* Utilizzo dei moduli JavaScript
* Creazione di un’interfaccia responsive con CSS

Struttura del progetto

shopping-list-app/
│
├── index.html
├── style.css
├── index.js
└── README.md

Funzionamento

1. Inserisci il nome di un prodotto nel campo di testo.
2. Premi ADD ITEM.
3. Il prodotto viene salvato nel database Firebase e visualizzato nella lista.
4. Continua ad aggiungere tutti i prodotti necessari.
5. Premi DELETE ALL per eliminare tutti i prodotti dal database e svuotare la lista.

Obiettivo del progetto

L’obiettivo principale di questo progetto è stato imparare a collegare un’applicazione frontend a un database esterno utilizzando Firebase Realtime Database e comprendere come salvare, recuperare, sincronizzare ed eliminare dati attraverso JavaScript.


Progetto realizzato durante il mio percorso di formazione per diventare Frontend Developer.