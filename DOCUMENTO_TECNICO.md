# Documento Tecnico
## Mini-portale eventi culturali "Trezzano Events"

**Corsista**: Simone Albini
**Data**: 14/04/2026
**Percorso**: Fullstack Developer 
**Link prototipo Figma**: https://www.figma.com/design/rcjLFDwtnQilzUQwybHrhk/trezzano-events?node-id=5-174&m=dev&t=ZxrXxBZDQqqbbnD4-1

---

## 1. Contesto e obiettivo
Qualche settimana fa sono stato contattato dal Sindaco del Comune di Trezzano sul Naviglio (MI), che mi ha spiegato una necessità di cui aveva preso nota da tempo in città: i cittadini faticavano a restare aggiornati sugli eventi culturali locali — concerti lungo il Naviglio, mostre fotografiche, laboratori artigianali, performance — sparsi tra volantini cartacei, pagine Facebook e passaparola.
Il Comune voleva un unico punto di riferimento digitale, semplice da consultare anche da telefono, dove chiunque potesse scoprire cosa succede in città e, perché no, proporre anche il proprio evento.

Da questa richiesta è nato **Trezzano Events**, un mini-portale che ho progettato con tre obiettivi chiari:
- **visualizzare** gli eventi culturali già pubblicati, in modo ordinato e accessibile da tutti i cittadini
- **raccogliere** le proposte dei cittadini tramite un modulo online
- **inoltrare** le segnalazioni al back-end del Comune, dove un operatore potrà validarle prima della pubblicazione

L'idea è che il portale sia il più possibile leggero, responsive e usabile anche da utenti non esperti e magari che hanno una certa età, quindi ho optato per un sito semplice ma efficace e intuitivo per ogni tipo di abitante della mia città.

## 2. Tecnologie utilizzate

### Front-end (pnpm create vite@latest) -->
- **HTML5** — struttura semantica della pagina
- **CSS3** — personalizzazione stili, variabili
- **Bootstrap 5.3.3** layout responsive, componenti (navbar, card, form)
- **JavaScript** — gestione invio form, validazione proposta
- **Vite** — dev server e build tool

## 3. Architettura prevista client/server
Il progetto è pensato per avere una chiara separazione tra **front-end** e **back-end**. Nel tempo a disposizione sono riuscito a completare la parte front-end in tutti i suoi aspetti, mentre il back-end era previsto in scaletta ma non ho avuto il tempo materiale per implementarlo; 


Il front-end è una **Single Page statica** servita da Vite in sviluppo. È già predisposto per comunicare con il back-end REST tramite `fetch` (metodo POST su `/api/eventi`) inviando JSON: la chiamata è scritta, testata e pronta a funzionare non appena il server Spring Boot sarà attivo. Avendo dato priorità alla cura del front-end e non essendo riuscito a completare anche la parte server nelle tempistiche della prova, al momento la POST non trova un endpoint in ascolto e il front-end mostra correttamente il messaggio di errore previsto dalla logica di gestione della risposta.

## 4. Flusso di navigazione
1. L'utente arriva sulla landing page
2. Dalla navbar può cliccare **Eventi** / **Suggerisci** / **Contatti** per scorrere alla sezione
3. Visualizza gli eventi già pubblicati nella sezione "Eventi in programma"
4. Per proporre un evento, scorre al form "Suggerisci un evento"
5. Compila i campi (validazione client-side) e preme **Invia proposta**
6. Il front-end prepara i dati e tenta l'invio al back-end via POST `/api/eventi` (endpoint previsto)
7. A seconda della risposta viene mostrato un **alert** verde (successo) o rosso (errore o server non disponibile)

## 5. Componenti dell'interfaccia
- **Navbar responsive** (collassa in menu hamburger sotto 992px)
- **Hero** con titolo grande e slogan
- **Card evento** con immagine, badge categoria colorato, testo e metadati autore/email
- **Form** con campi input/select/textarea, label associate, messaggi d'errore dedicati
- **Alert di feedback** mostrato dopo l'invio del form
- **Footer** a 3 colonne con informazioni istituzionali

## 6. Scelte grafiche
- **Palette**: blu come il naviglio (`#0077b6`) per richiamare l'identità territoriale; grigio chiaro di sfondo per le sezioni alternate; nero per il footer
- **Font**: font di sistema per massima leggibilità e zero tempo di caricamento
- **Gerarchia visiva**: H1 solo nella hero, H2 per sezioni principali, H3 per titoli delle card
- **Iconografia**: logo del Comune nella navbar, badge colorati per categorie

## 7. Responsive design
La pagina si adatta a:
- **Mobile** 
- **Tablet** 
- **Desktop** 


## 8. Descrizione delle attività svolte
1. **Progettazione Figma** del prototipo con struttura a sezioni
2. **Pulizia del progetto base** e setup di un progetto statico servito da Vite
3. **Sviluppo HTML**: struttura semantica con header, main, section, footer
4. **Integrazione Bootstrap 5** per layout responsive e componenti
5. **CSS personalizzato** in `css/style.css` per override colori, hover card e focus accessibile
6. **Sviluppo JavaScript** in `js/app.js` per intercettare l'invio del form, validare i campi e predisporre la chiamata `fetch` verso il back-end, con gestione della risposta (successo / errore)
7. **Test responsive** su diverse larghezze via DevTools

> **Nota**: la prova prevedeva anche lo sviluppo di un back-end Spring Boot con persistenza JPA e Swagger. Avevo pianificato di realizzarlo dopo aver completato il front-end, ma il tempo a disposizione non mi ha permesso di arrivare a sviluppare anche quella parte. La logica di comunicazione lato client è comunque già scritta e pronta a dialogare con l'endpoint `/api/eventi` previsto.

## 9. Istruzioni per avviare l'applicazione

### Front-end
Requisiti: **Node.js 18+** e **pnpm** (o npm).

```bash
cd sec-prova
pnpm install
pnpm dev
```

Per la build di produzione:
```bash
pnpm build
pnpm preview
```

## Risposte alle domande aperte

### 1. UI/UX e progettazione
L'interfaccia è strutturata come **landing page a scorrimento unico** suddivisa in sezioni tematiche (Eventi, Suggerisci, Contatti), raggiungibili da una navbar fissa con ancore. 
Ho lavorato per rendere l'interfaccia **pienamente responsive** su tutti i dispositivi, sfruttando la griglia a 12 colonne di Bootstrap e i relativi breakpoint: le card evento si dispongono a 1, 2 o 3 per riga a seconda della larghezza dello schermo, la navbar si adatta passando alla modalità hamburger quando serve e i campi del form si riorganizzano in colonna o affiancati. 
L'obiettivo era avere un'esperienza ugualmente fluida sia da desktop, sia da tablet, sia da smartphone. La **gerarchia visiva** è resa con un unico H1 nella hero, H2 per le sezioni principali e H3 per i titoli delle card; i badge colorati segnalano a colpo d'occhio la categoria dell'evento. Per l'**accessibilità** ho usato `alt` descrittivi sulle immagini, label associate tramite `for`/`id`, attributi `aria-*` sul bottone hamburger, `lang="it"` e un outline di focus ben visibile per chi naviga da tastiera. I colori rispettano un buon contrasto (bianco su blu `#0077b6`, testo scuro su sfondi chiari)e testi ben legginbili.

### 2. Comunicazione front-end / back-end
Il back-end era previsto nella scaletta della prova ma non sono riuscito a completarlo nel tempo a disposizione; ho quindi progettato e scritto comunque tutta la logica di comunicazione lato client, pronta a dialogare con il server non appena sarà sviluppato. 
I dati del form vengono inviati con una **chiamata HTTP POST** all'endpoint `/api/eventi`. Nel front-end uso l'API `fetch` del browser: raccolgo i dati del form con `FormData`, li converto in oggetto JavaScript e li serializzo in **JSON** nel body della richiesta, impostando l'header `Content-Type: application/json`. La risposta del server viene gestita con `response.ok`: se il codice HTTP è 2xx mostro un **alert verde** con messaggio di successo e resetto il form; se c'è un errore (sia lato server che di rete, intercettato con `try/catch`) mostro un **alert rosso** con messaggio esplicativo. 
Durante l'invio il bottone viene disabilitato per evitare un eventuale doppio click da parte dell'utente e il feedback arriva immediato, con scroll automatico sul messaggio. 

