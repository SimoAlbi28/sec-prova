# Documento Tecnico
## Mini-portale eventi culturali "Trezzano Cultura"

**Corsista**: [Nome Cognome]
**Data**: [data della prova]
**Percorso**: Fullstack Developer - Tech Talent Factory
**Link prototipo Figma**: [incolla qui il link]

---

## 1. Contesto e obiettivo
Il Comune di Trezzano sul Naviglio (MI) vuole digitalizzare la comunicazione degli eventi culturali locali (concerti, mostre, laboratori, performance). Il portale realizzato permette di:
- visualizzare gli eventi pubblicati
- consentire ai cittadini di suggerire nuovi eventi tramite un modulo online
- inviare i dati al back-end per la validazione da parte di un operatore

## 2. Tecnologie utilizzate

### Front-end
- **HTML5** — struttura semantica della pagina
- **CSS3** — personalizzazione stili, variabili, media query per il responsive
- **Bootstrap 5.3.3** (via CDN) — layout responsive, griglia a 12 colonne, componenti (navbar, card, form)
- **JavaScript** — gestione invio form, validazione, chiamata fetch al back-end
- **Vite** — dev server e build tool

### Back-end (previsto)
- **Spring Boot** — framework Java
- **Spring Data JPA** + **H2** / **MySQL** — persistenza dati
- **Swagger / OpenAPI** — documentazione e test degli endpoint REST

## 3. Architettura client/server
Architettura **client-server** con separazione netta front-end / back-end:

```
[Browser utente]  <-- HTTP (JSON) -->  [Server Spring Boot]  <-- JPA -->  [Database]
   front-end                             /api/eventi                     H2 / MySQL
 HTML/CSS/JS + Bootstrap
```

Il front-end è una **Single Page statica** servita da Vite in sviluppo. Comunica con il back-end REST tramite `fetch` (metodo POST su `/api/eventi`) inviando JSON.

## 4. Struttura delle pagine
La pagina è una **landing page** a scorrimento unico, suddivisa in sezioni:

| Sezione | Id ancora | Contenuto |
|---------|-----------|-----------|
| Header  | —        | Navbar (logo + titolo + link di navigazione) + hero con slogan |
| Eventi  | `#eventi`| Griglia responsive di 3 card evento (titolo, categoria, descrizione, autore, email) |
| Suggerisci | `#suggerisci` | Form di proposta evento (titolo, categoria, descrizione, autore, email) |
| Footer  | `#contatti` | Contatti del Comune e riferimenti istituzionali |

## 5. Flusso di navigazione
1. L'utente arriva sulla landing page
2. Dalla navbar può cliccare **Eventi** / **Suggerisci** / **Contatti** per scorrere alla sezione
3. Visualizza gli eventi già pubblicati nella sezione "Eventi in programma"
4. Per proporre un evento, scorre al form "Suggerisci un evento"
5. Compila i campi (validazione client-side) e preme **Invia proposta**
6. Il front-end invia i dati al back-end via POST `/api/eventi`
7. A seconda della risposta viene mostrato un **alert** verde (successo) o rosso (errore)

## 6. Componenti dell'interfaccia
- **Navbar responsive** (collassa in menu hamburger sotto 992px)
- **Hero** con titolo grande e slogan
- **Card evento** con immagine, badge categoria colorato, testo e metadati autore/email
- **Form** con campi input/select/textarea, label associate, messaggi d'errore dedicati
- **Alert di feedback** mostrato dopo l'invio del form
- **Footer** a 3 colonne con informazioni istituzionali

## 7. Scelte grafiche
- **Palette**: blu navigli (`#0077b6`) come colore primario per richiamare l'identità territoriale; grigio chiaro di sfondo per le sezioni alternate; nero per il footer
- **Font**: font di sistema per massima leggibilità e zero tempo di caricamento
- **Gerarchia visiva**: H1 solo nella hero, H2 per sezioni principali, H3 per titoli delle card
- **Iconografia**: logo del Comune nella navbar, badge colorati per categorie

## 8. Responsive design
La pagina si adatta a 3 fasce di dispositivo usando la griglia a 12 colonne di Bootstrap:
- **Mobile** (<768px): 1 card per riga, campi form impilati, navbar a hamburger
- **Tablet** (768–991px): 2 card per riga, form con autore/email affiancati
- **Desktop** (≥992px): 3 card per riga, navbar estesa con link inline

Classi utilizzate: `col-12`, `col-md-6`, `col-lg-4`, `navbar-expand-lg`.

## 9. Accessibilità
- Attributi `alt` descrittivi su tutte le immagini
- Label associate ad ogni input via `for`/`id`
- Attributi `aria-label`, `aria-controls`, `aria-expanded` sul bottone hamburger
- `lang="it"` sul documento HTML per gli screen reader
- Outline di focus visibile su link, bottoni e campi (navigazione da tastiera)
- Contrasto colori sufficiente (bianco su blu `#0077b6`, testo scuro su sfondi chiari)

## 10. Descrizione delle attività svolte
1. **Progettazione Figma** del prototipo con struttura a sezioni
2. **Pulizia del progetto base** e setup di un progetto statico servito da Vite
3. **Sviluppo HTML**: struttura semantica con header, main, section, footer
4. **Integrazione Bootstrap 5** per layout responsive e componenti
5. **CSS personalizzato** in `css/style.css` per override colori, hover card e focus accessibile
6. **Sviluppo JavaScript** in `js/app.js` per intercettare l'invio del form, validare i campi e inviare i dati al back-end via `fetch` con gestione della risposta
7. **Test responsive** su diverse larghezze via DevTools

## 11. Istruzioni per avviare l'applicazione

### Front-end
Requisiti: **Node.js 18+** e **pnpm** (o npm).

```bash
cd sec-prova
pnpm install
pnpm dev
```
Il sito si apre automaticamente su **http://localhost:5173**.

Per la build di produzione:
```bash
pnpm build
pnpm preview
```

### Back-end (se presente)
Il progetto Spring Boot gira su **http://localhost:8080** e usa un database H2 in memoria (nessuna configurazione richiesta):
```bash
cd Eventi_Backend
./mvnw spring-boot:run
```
Swagger UI: **http://localhost:8080/swagger-ui.html**

## 12. Indicazioni per testare i servizi
- **Front-end**: aprire http://localhost:5173, scorrere le sezioni, compilare il form con dati validi/non validi per verificare la validazione
- **Chiamata API**: con DevTools > Network osservare la POST verso `/api/eventi` all'invio del form
- **Swagger** (back-end): testare l'endpoint `POST /api/eventi` direttamente da http://localhost:8080/swagger-ui.html
- **Responsive**: F12 > Toggle device toolbar per simulare smartphone/tablet

## 13. Struttura dei file

```
sec-prova/
├── index.html              # pagina principale
├── css/
│   └── style.css           # stili personalizzati
├── js/
│   └── app.js              # logica form + fetch
├── public/
│   ├── logo.png
│   └── img/
│       ├── evento1.png
│       ├── evento2.png
│       └── evento3.png
├── package.json
└── vite.config.ts
```

---

## Risposte alle domande aperte

### 1. UI/UX e progettazione
L'interfaccia è strutturata come **landing page a scorrimento unico** suddivisa in sezioni tematiche (Eventi, Suggerisci, Contatti), raggiungibili da una navbar fissa con ancore. Ho seguito un approccio **mobile-first** basandomi sulla griglia a 12 colonne di Bootstrap: su mobile ogni card evento occupa l'intera larghezza, su tablet due per riga, su desktop tre per riga. La **gerarchia visiva** è resa con un unico H1 nella hero, H2 per le sezioni principali e H3 per i titoli delle card; i badge colorati segnalano a colpo d'occhio la categoria dell'evento. Per l'**accessibilità** ho usato `alt` descrittivi sulle immagini, label associate tramite `for`/`id`, attributi `aria-*` sul bottone hamburger, `lang="it"` e un outline di focus ben visibile per chi naviga da tastiera. I colori rispettano un buon contrasto (bianco su blu `#0077b6`, testo scuro su sfondi chiari) e le azioni principali sono riconoscibili grazie a bottoni pieni di colore primario.

### 2. Comunicazione front-end / back-end
I dati del form vengono inviati al back-end con una **chiamata HTTP POST** all'endpoint `/api/eventi`. Nel front-end uso l'API `fetch` del browser: raccolgo i dati del form con `FormData`, li converto in oggetto JavaScript e li serializzo in **JSON** nel body della richiesta, impostando l'header `Content-Type: application/json`. La risposta del server viene gestita con `response.ok`: se il codice HTTP è 2xx mostro un **alert verde** con messaggio di successo e resetto il form; se c'è un errore (sia lato server che di rete, intercettato con `try/catch`) mostro un **alert rosso** con messaggio esplicativo. Durante l'invio il bottone viene disabilitato per evitare il doppio click. Il feedback all'utente è quindi immediato e informativo, e lo scroll automatico porta la pagina sul messaggio.
