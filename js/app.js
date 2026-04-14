// gestione form suggerisci evento -> POST al backend

const API_URL = "http://localhost:8080/api/eventi";

const form = document.getElementById("form-evento");
const feedback = document.getElementById("feedback");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // blocca refresh pagina

  // validazione html5
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  // raccolgo dati form
  const formData = new FormData(form);
  const dati = Object.fromEntries(formData.entries());

  // disabilito bottone per evitare doppio click
  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  submitBtn.textContent = "Invio in corso...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dati),
    });

    if (!response.ok) {
      throw new Error(`Errore server: ${response.status}`);
    }

    // ok
    mostraFeedback(
      "success",
      "Proposta inviata con successo! Verrà esaminata da un operatore."
    );
    form.reset();
    form.classList.remove("was-validated");

  } catch (errore) {
    console.error(errore);
    mostraFeedback(
      "danger",
      "Errore durante l'invio. Verifica che il backend sia attivo e riprova."
    );
  } finally {
    // sempre: riabilito bottone
    submitBtn.disabled = false;
    submitBtn.textContent = "Invia proposta";
  }
});

// mostra messaggio verde/rosso
function mostraFeedback(tipo, messaggio) {
  feedback.className = `alert alert-${tipo} mt-4`;
  feedback.textContent = messaggio;
  feedback.scrollIntoView({ behavior: "smooth", block: "center" });
}
