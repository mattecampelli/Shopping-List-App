# Shopping List App

Una semplice applicazione web per creare e gestire le proprie liste della spesa, sviluppata con HTML, CSS e JavaScript.

L’applicazione permette di creare più liste, ognuna con il proprio titolo, aggiungere prodotti, conservarli anche dopo la chiusura o il refresh della pagina, cancellare prodotti o liste intere e condividere una copia di una lista con altre persone tramite un link.

Il progetto è inoltre configurato per essere installato su dispositivi mobile come Web App, con icona personalizzata e visualizzazione standalone.

## Funzionalità

* Più liste: schermata iniziale con tutte le liste e creazione di una nuova lista con il proprio titolo (NUOVA LISTA)
* Eliminazione di una o più liste con il tasto ELIMINA LISTA (modalità selezione + richiesta di conferma)
* Tasto ← TUTTE LE LISTE per tornare all’elenco di tutte le liste
* Transizione morbida (dissolvenza) nel passaggio da una schermata all’altra
* Condivisione di una lista con il tasto CONDIVIDI: chi apre il link riceve una copia della lista come nuova lista sua
* Aggiunta di nuovi prodotti alla lista, anche premendo Invio (submit tramite form)
* I prodotti fatti solo di spazi non vengono aggiunti
* Animazione di comparsa per ogni nuovo prodotto aggiunto alla lista
* Salvataggio delle liste tramite localStorage
* Persistenza dei dati anche dopo il refresh o la chiusura della pagina
* Liste indipendenti per ogni utente/browser
* Eliminazione di tutti i prodotti di una lista, con richiesta di conferma
* Eliminazione di singoli prodotti con il tasto ELIMINA (modalità selezione)
* Uscita dalla modalità selezione cliccando sulla parte grigia o premendo Esc
* Funzionamento anche senza connessione grazie a un Service Worker
* Interfaccia responsive adatta a telefoni, tablet e computer
* Interfaccia interamente in italiano
* Nessuno zoom automatico su iPhone quando si scrive nei campi di testo
* Possibilità di aggiungere l’app alla schermata Home
* Apertura dell’app in modalità standalone
* Icona personalizzata per dispositivi iOS e Android

## Tecnologie utilizzate

* HTML5 — struttura della pagina
* CSS3 — stile e layout responsive
* JavaScript — logica dell’applicazione e manipolazione del DOM
* localStorage — salvataggio locale e persistenza della lista
* JSON — conversione dei dati per il salvataggio e il recupero dal localStorage e per la condivisione
* URLSearchParams — creazione e lettura del link di condivisione (query string `?share=...`)
* Web Share API (`navigator.share`) — menu "Condividi" del telefono
* Web App Manifest — configurazione dell’app per dispositivi mobile
* Service Worker e Cache API — salvataggio dei file per l’utilizzo offline
* Git & GitHub — versionamento e pubblicazione del progetto

## Gestione dei dati con localStorage

La versione attuale dell’applicazione utilizza il localStorage del browser per salvare tutte le liste.

Le liste sono un array di oggetti: ogni lista ha un `id` unico, un titolo e i suoi prodotti.

```js
lists = [
    { id: "1731150000000123", title: "Spesa", items: ["latte", "pane"] },
    { id: "1731150099999456", title: "Festa", items: ["birre"] }
]
```

La lista aperta viene cercata tramite il suo `id`, e quando viene aggiunto un nuovo prodotto questo viene inserito nel suo array `items`:

```js
currentList = lists.find(list => list.id === id)
currentList.items.push(newItem)
```

Dopo ogni modifica l’intero array viene convertito in una stringa JSON e salvato nel localStorage sotto un’unica chiave:

```js
localStorage.setItem("lists", JSON.stringify(lists))
```

All’apertura dell’applicazione, i dati vengono recuperati e riconvertiti in un array JavaScript (dentro un `try...catch`, così se i dati salvati sono rovinati l’app non si blocca):

```js
const savedLists = JSON.parse(localStorage.getItem("lists"))
```

In questo modo le liste rimangono disponibili anche dopo aver chiuso o ricaricato la pagina.

Chi usava la versione precedente (una sola lista salvata sotto la chiave `items`) non perde niente: al primo avvio i suoi prodotti vengono spostati automaticamente in una lista chiamata "La mia lista".

Inoltre, poiché il localStorage appartiene al singolo browser, utenti diversi non condividono automaticamente la stessa lista.


## Evoluzione del progetto: da Firebase a localStorage

La prima versione della Shopping List App utilizzava Firebase Realtime Database per salvare i prodotti.

La connessione al database utilizzava un unico riferimento:

```js
const referenceInDB = ref(database, "items")
```

I prodotti venivano aggiunti tramite:

```js
push(referenceInDB, inputEl.value)
```

e recuperati in tempo reale utilizzando:

```js
onValue(referenceInDB, function(snapshot) {
    // recupero dei dati
})
```

Questa soluzione permetteva di salvare i dati online e sincronizzarli in tempo reale.

Tuttavia, tutti gli utenti dell’applicazione utilizzavano lo stesso percorso items del database Firebase.

Di conseguenza:

```
Utente A → aggiunge "Latte"
                  ↓
           Firebase /items
                  ↓
Utente B → vede "Latte"
```

Questo significava che tutti gli utenti condividevano la stessa lista della spesa.

Per risolvere il problema, ho deciso di modificare il sistema di persistenza utilizzando localStorage.

La struttura attuale è quindi:

```
Utente A
└── localStorage
    └── lists
        ├── Spesa → ["Latte", "Pane"]
        └── Festa → ["Birre"]
Utente B
└── localStorage
    └── lists
        └── Casa → ["Pasta", "Acqua"]
```

In questo modo ogni utente può utilizzare l’applicazione mantenendo liste personali e indipendenti dagli altri utenti, e decidere lui quando condividerne una (vedi "Condivisione di una lista").

Questa modifica mi ha permesso anche di comprendere meglio la differenza tra il salvataggio dei dati in un database remoto condiviso e il salvataggio locale all’interno del browser.

## Versione Mobile

L’applicazione è stata configurata per offrire un’esperienza simile a quella di un’app mobile.

Il file site.webmanifest definisce:

* Nome dell’applicazione (Lista della Spesa)
* Nome breve dell’app (Lista Spesa)
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

## Le due schermate e la transizione

L’app è sempre un’unica pagina (`index.html`) con due sezioni:

* `#home-view` — l’elenco di tutte le liste, con NUOVA LISTA e ELIMINA LISTA
* `#list-view` — la lista aperta, con ← TUTTE LE LISTE, CONDIVIDI e tutti i tasti dei prodotti

Si vede una sezione alla volta (l’altra ha l’attributo `hidden`). Per evitare lo scatto, il cambio avviene in tre passaggi con `setTimeout()`:

1. alla sezione attuale viene aggiunta la classe `faded` (`opacity: 0` + `translateY(10px)`) e grazie a `transition` sfuma via;
2. dopo 250ms viene nascosta e viene mostrata l’altra, ancora trasparente;
3. subito dopo alla nuova sezione viene tolta la classe `faded` e compare piano piano.

Alla fine il focus viene spostato sul titolo della nuova schermata, così anche chi usa la tastiera o uno screen reader sa dove si trova.

## Eliminazione dei singoli prodotti (ELIMINA) e delle liste (ELIMINA LISTA)

Oltre a SVUOTA LISTA, è possibile cancellare solo alcuni prodotti:

1. Premendo ELIMINA, al `<body>` viene aggiunta la classe `selection-mode`.
2. Grazie a questa classe il CSS mostra uno strato grigio semitrasparente su tutta la pagina, mentre le caselle della lista restano in primo piano (con `z-index`).
3. Cliccando su una casella, la classe `selected` viene aggiunta o tolta con `classList.toggle()` e il bordo diventa più spesso e arancione.
4. Il tasto ELIMINA SELEZIONATI, che compare sotto la lista, legge il `data-index` delle caselle selezionate e con `.filter()` tiene nell’array `items` solo i prodotti non selezionati, poi aggiorna il localStorage e ridisegna la lista.
5. Cliccando sulla parte grigia o premendo Esc si esce dalla modalità senza cancellare niente.

Le liste si cancellano nello stesso modo dalla schermata iniziale con ELIMINA LISTA: si selezionano una o più liste, si preme ELIMINA SELEZIONATE e, dopo il messaggio di conferma, vengono tenute solo le liste il cui `data-id` non è tra quelli selezionati.

## Condivisione di una lista (CONDIVIDI)

La condivisione manda una **copia** della lista: chi la riceve se la ritrova come lista sua in più e da quel momento ognuno modifica la propria, senza toccare quella dell’altro né le altre liste. Non serve nessun server.

1. Premendo CONDIVIDI, titolo e prodotti vengono trasformati in JSON e messi nel link come query string con `URLSearchParams` (che si occupa anche di rendere il testo sicuro dentro un URL):

```js
const params = new URLSearchParams({
    share: JSON.stringify({ title: currentList.title, items: currentList.items })
})
```

2. Sul telefono si apre il menu "Condividi" (`navigator.share`) per mandare il link su WhatsApp, Messaggi ecc.; sui browser che non lo supportano compare una finestra con il link da copiare.
3. Chi apre il link avvia l’app normalmente: all’avvio l’app legge `?share=...` dall’indirizzo, controlla che i dati siano validi, aggiunge la lista come nuova lista con un nuovo `id` e la apre.
4. La query string viene poi tolta dall’indirizzo (`history.replaceState`), così ricaricando la pagina la lista non viene importata una seconda volta.

I prodotti vengono sempre inseriti con `textContent`, quindi un link modificato non può inserire HTML nella pagina.

Limiti da conoscere:

* aprendo due volte lo stesso link si ottengono due copie della lista;
* su iPhone, se l’app è stata aggiunta alla schermata Home, il link si apre in Safari, che ha un localStorage separato da quello dell’app installata.

## Grafica e responsive

* Tutti i bottoni condividono la classe `.btn`, così ogni bottone nuovo ha automaticamente lo stesso stile.
* All’hover il bordo passa da 1px a 4px e il padding diminuisce di 3px, così il bottone resta grande uguale e non sposta quelli vicini. L’effetto hover è attivo solo sui dispositivi con il mouse (`@media (hover: hover)`), così sul telefono il colore non resta "incollato" dopo il tocco.
* Gli `input` hanno `font-size: 1rem` (16px): sotto i 16px Safari su iPhone fa uno zoom automatico quando si tocca il campo.
* I blob decorativi stanno dentro un contenitore `position: fixed` grande quanto lo schermo con `overflow: hidden`: le parti che escono vengono tagliate senza allungare la pagina e senza creare scroll in più.
* Sotto i 400px di larghezza i bottoni si allargano per riempire la riga, i blob diventano più piccoli e i titoli o i prodotti molto lunghi vanno a capo.

## Utilizzo offline (Service Worker)

Il localStorage salva già i prodotti sul dispositivo, ma senza connessione il browser non riuscirebbe a scaricare i file dell’app (HTML, CSS, JS e icone).

Per questo il progetto usa un Service Worker (file `sw.js`), un file JavaScript che il browser esegue in background:

* **install** — la prima volta che si apre l’app salva tutti i file nella cache
* **activate** — cancella le cache delle versioni precedenti
* **fetch** — quando la pagina chiede un file, lo prende dalla cache; se non c’è, lo scarica da internet

```js
return fileInCache || fetch(e.request)
```

Il Service Worker viene registrato in fondo a `index.js`:

```js
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
}
```

Ogni volta che l’app viene modificata bisogna cambiare il nome della cache in `sw.js` (per esempio da `shopping-list-v5` a `shopping-list-v6`), altrimenti il browser continua a usare i file vecchi.

Per funzionare, l’app deve essere aperta tramite un server (per esempio GitHub Pages o l’estensione Live Server di VS Code) e non con il doppio clic sul file.

## Cosa ho imparato

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
* Gestione di più liste con un array di oggetti e un `id` unico per ognuna
* Migrazione dei dati salvati da una versione precedente dell’app
* Navigazione tra due schermate nella stessa pagina, con una transizione morbida
* Condivisione dei dati tramite query string, `URLSearchParams` e `navigator.share`
* Prevenzione dello zoom automatico di Safari su iPhone e gestione dei blob decorativi su mobile

## Struttura del progetto

* index.html — struttura della pagina
* style.css — stile e layout
* index.js — logica dell’applicazione
* site.webmanifest — configurazione della Web App
* sw.js — Service Worker per l’utilizzo offline
* android-chrome-192x192.png, android-chrome-512x512.png, apple-touch-icon.png, favicon-16x16.png, favicon-32x32.png, favicon.ico — icone per browser e dispositivi
* .gitignore — file e cartelle esclusi dal versionamento (es. configurazioni locali di editor/tool)
* README.md — documentazione del progetto

## Come utilizzare l’app

1. Nella schermata iniziale scrivi il titolo di una nuova lista e premi NUOVA LISTA (o Invio): la lista viene creata e aperta.
2. Inserisci il nome di un prodotto nel campo di testo.
3. Premi AGGIUNGI oppure premi Invio.
4. Il prodotto viene aggiunto alla lista con una piccola animazione e salvato nel localStorage.
5. Continua ad aggiungere tutti i prodotti necessari.
6. Chiudendo o ricaricando la pagina, liste e prodotti rimangono salvati.
7. Premi SVUOTA LISTA e conferma per eliminare tutti i prodotti e svuotare la lista.
8. Per eliminare solo alcuni prodotti premi ELIMINA, seleziona le caselle da cancellare e premi ELIMINA SELEZIONATI.
9. Premi CONDIVIDI per mandare una copia della lista a un’altra persona.
10. Premi ← TUTTE LE LISTE per tornare all’elenco di tutte le liste e aprirne un’altra.
11. Per eliminare una o più liste premi ELIMINA LISTA, seleziona le liste, premi ELIMINA SELEZIONATE e conferma.

Su un dispositivo mobile è inoltre possibile aggiungere la Web App alla schermata Home per utilizzarla in modo simile a un’applicazione installata.

## Obiettivo del progetto

L’obiettivo del progetto è stato creare una semplice applicazione frontend per la gestione di una lista della spesa, approfondendo la manipolazione del DOM e la persistenza dei dati con JavaScript.

Il progetto inizialmente utilizzava Firebase Realtime Database, ma durante lo sviluppo ho individuato il problema della condivisione della stessa lista tra tutti gli utenti.

Ho quindi modificato l’architettura dell’applicazione utilizzando localStorage, permettendo a ogni utente di mantenere una propria lista indipendente.

Questo processo mi ha permesso non solo di implementare nuove funzionalità, ma anche di analizzare un problema reale dell’applicazione e scegliere una soluzione più adatta al suo funzionamento.

## Crediti

L’applicazione di base l’ho implementata io: struttura HTML, stile CSS, logica JavaScript, salvataggio con localStorage, prima versione con Firebase e configurazione come Web App.

Per l’utilizzo offline (Service Worker) e per le funzioni multi-lista, condivisione, transizioni tra le schermate e i miglioramenti per mobile ho avuto l’aiuto di Claude, un assistente AI, e ho revisionato io tutto il codice.


Progetto realizzato durante il mio percorso di formazione per diventare Frontend Developer.