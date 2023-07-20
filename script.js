console.log("skrypt");

function zapisz() {
  const imie = document.getElementById('name');
  const email = document.getElementById('email');

  let daneNewsletter = `Imię: ${imie.value}\r\nEmail: ${email.value}`;
  const textToBlob = new Blob([daneNewsletter], {type: 'text/plain'});
  const nazwaPliku = 'daneZapisanych.txt';

  let newLink = document.createElement("a");
  newLink.download = nazwaPliku;

  if (window.webkitURL != null) {
    newLink.href = window.webkitURL.createObjectURL(textToBlob);
  } else {
    newLink.href = window.URL.createObjectURL(textToBlob);
    newLink.display = "none";
    document.body.appendChild(newLink);
  }

  newLink.click();
}

if (document.body.classList.contains('pageabout')) {
  console.log("to jest about");
  const popUpElement = document.getElementById('popup');
  popUpElement.innerHTML += `
    <div class="popup">
      <h2>Newsletter</h2>
      <form id="signup-form">
        <label for="name">Imię:</label>
        <input type="text" id="name" name="name" required>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <button type="submit" onclick="zapisz()">Zapisz się</button>
        <button type="button" id="close-btn">Zamknij</button>
      </form>
    </div>
  `
  document.addEventListener("DOMContentLoaded", function() {
    const popupContainer = document.getElementById("popup");
    const closeButton = document.getElementById("close-btn");

    function showPopup() {
      popupContainer.style.display = "flex";
    }

    function hidePopup() {
      popupContainer.style.display = "none";
    }

    closeButton.addEventListener("click", hidePopup);

    // logika obsługi formularza
    const signupForm = document.getElementById("signup-form");
    signupForm.addEventListener("submit", function(event) {
      event.preventDefault();
      zapisz(); // Wywołujemy funkcję zapisz() tutaj, po przetworzeniu danych formularza

      // hidepopup do ukrycia popupu
      hidePopup();
    });

    // pokazanie popupa po załadowaniu
    showPopup();
  });
} else {
  console.log("to nie jest about");
}
