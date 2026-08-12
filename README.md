Shopping List App

Una semplice applicazione web per creare e gestire una lista della spesa, sviluppata con HTML, CSS, JavaScript e Firebase Realtime Database.

L’applicazione permette di aggiungere prodotti alla lista, salvarli all’interno di un database Firebase e cancellare l’intera lista quando necessario.

Il progetto è inoltre configurato per essere installato su dispositivi mobile come Web App, con icona personalizzata e visualizzazione standalone.

Funzionalità

* Aggiunta di nuovi prodotti alla lista
* Salvataggio dei prodotti tramite Firebase Realtime Database
* Aggiornamento automatico della lista quando i dati nel database cambiano
* Eliminazione di tutti i prodotti
* Persistenza dei dati grazie a Firebase
* Interfaccia responsive adatta anche a dispositivi mobile
* Possibilità di aggiungere l’app alla schermata Home
* Apertura dell’app in modalità standalone
* Icona personalizzata per dispositivi iOS e Android

Tecnologie utilizzate

* HTML5 — struttura della pagina
* CSS3 — stile e layout responsive
* JavaScript — logica dell’applicazione e manipolazione del DOM
* Firebase Realtime Database — salvataggio e sincronizzazione dei dati
* Web App Manifest — configurazione dell’app per dispositivi mobile
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
* Creazione di un’interfaccia responsive
* Configurazione di una Web App per dispositivi mobile
* Utilizzo del file site.webmanifest
* Gestione di favicon e icone per iOS e Android


Funzionamento

1. Inserisci il nome di un prodotto nel campo di testo.
2. Premi ADD ITEM.
3. Il prodotto viene salvato nel database Firebase.
4. Firebase aggiorna automaticamente la lista visualizzata.
5. Continua ad aggiungere tutti i prodotti necessari.
6. Premi DELETE ALL per eliminare tutti i prodotti dal database e svuotare la lista.

Su un dispositivo mobile è inoltre possibile aggiungere la Web App alla schermata Home per utilizzarla in modo simile a un’applicazione installata.

Obiettivo del progetto

L’obiettivo principale di questo progetto è stato approfondire l’integrazione tra JavaScript e Firebase Realtime Database, comprendendo come un’applicazione frontend possa salvare, recuperare, sincronizzare ed eliminare dati.

Successivamente il progetto è stato adattato per l’utilizzo su dispositivi mobile, aggiungendo un Web App Manifest, icone dedicate e una modalità di visualizzazione standalone.


Progetto realizzato durante il mio percorso di formazione per diventare Frontend Developer.