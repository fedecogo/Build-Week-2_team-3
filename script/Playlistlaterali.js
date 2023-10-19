const creaCardsHome = function (query) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nella response");
      }
    })
    .then((data) => {
      window.location.href = `artist.html?query=${query}`;
    })

    .catch((error) => {
      console.error("Si è verificato un errore:", error);
    });
};

// Playlist laterali 21 righe
const PrimaRiga = document.getElementById("1riga");
PrimaRiga.addEventListener("click", function () {
  creaCardsHome("Kamelot");
});
const SecondaRiga = document.getElementById("2riga");
SecondaRiga.addEventListener("click", function () {
  creaCardsHome("Shower Songs");
});
const TerzaRiga = document.getElementById("3riga");
TerzaRiga.addEventListener("click", function () {
  creaCardsHome("Summer");
});
const QuartaRiga = document.getElementById("4riga");
QuartaRiga.addEventListener("click", function () {
  creaCardsHome("Street Musica");
});
const QuintaRiga = document.getElementById("5riga");
QuintaRiga.addEventListener("click", function () {
  creaCardsHome("Party Hits");
});
const SestaRiga = document.getElementById("6riga");
SestaRiga.addEventListener("click", function () {
  creaCardsHome("Daily Music");
});
const SettimaRiga = document.getElementById("7riga");
SettimaRiga.addEventListener("click", function () {
  creaCardsHome("Frequency");
});
const OttavaRiga = document.getElementById("8riga");
OttavaRiga.addEventListener("click", function () {
  creaCardsHome("AfroHits");
});
const NonaRiga = document.getElementById("9riga");
NonaRiga.addEventListener("click", function () {
  creaCardsHome("Latino Musica");
});
const DecimaRiga = document.getElementById("10riga");
DecimaRiga.addEventListener("click", function () {
  creaCardsHome("Jazz Vibes");
});
const UndicesimaRiga = document.getElementById("11riga");
UndicesimaRiga.addEventListener("click", function () {
  creaCardsHome("Estate");
});
const DodicesimaRiga = document.getElementById("12riga");
DodicesimaRiga.addEventListener("click", function () {
  creaCardsHome("Focus ");
});
const TredicesimaRiga = document.getElementById("13riga");
TredicesimaRiga.addEventListener("click", function () {
  creaCardsHome("Soul Lounge");
});
const QuattordicesimaRiga = document.getElementById("14riga");
QuattordicesimaRiga.addEventListener("click", function () {
  creaCardsHome("SangueGiovane");
});
const QuindicesimaRiga = document.getElementById("15riga");
QuindicesimaRiga.addEventListener("click", function () {
  creaCardsHome("Imagine Dragons");
});
const SedicesimaRiga = document.getElementById("16riga");
SedicesimaRiga.addEventListener("click", function () {
  creaCardsHome("Sunset");
});
const DiciassettesimaRiga = document.getElementById("17riga");
DiciassettesimaRiga.addEventListener("click", function () {
  creaCardsHome("Workout");
});
const DiciottesimaRiga = document.getElementById("18riga");
DiciottesimaRiga.addEventListener("click", function () {
  creaCardsHome("Indigo");
});
const DiciannovesimaRiga = document.getElementById("19riga");
DiciannovesimaRiga.addEventListener("click", function () {
  creaCardsHome("Lo-fi");
});
const VentesimaRiga = document.getElementById("20riga");
VentesimaRiga.addEventListener("click", function () {
  creaCardsHome("Wroooom");
});
const VentunesimaRiga = document.getElementById("21riga");
VentunesimaRiga.addEventListener("click", function () {
  creaCardsHome("Playlist 10");
});

const momo = document.getElementById("momo");
momo.addEventListener("click", function () {
  creaCardsHome("The Cranberries");
});
const federico = document.getElementById("federico");
federico.addEventListener("click", function () {
  creaCardsHome("L.A Womans");
});
const giulia = document.getElementById("giulia");
giulia.addEventListener("click", function () {
  creaCardsHome("Saliva");
});
const angi = document.getElementById("angi");
angi.addEventListener("click", function () {
  creaCardsHome("Pinguini Tattici");
});
const salvatore = document.getElementById("salvatore");
salvatore.addEventListener("click", function () {
  creaCardsHome("Eros Ramazzotti");
});
const guido = document.getElementById("guido");
guido.addEventListener("click", function () {
  creaCardsHome("Smash Mouth");
});

//Search cards

const Cerca1 = document.getElementById("search1");
Cerca1.addEventListener("click", function () {
  creaCardsHome("Dissect");
});
const Cerca2 = document.getElementById("search2");
Cerca2.addEventListener("click", function () {
  creaCardsHome("Workout playlist");
});
const Cerca3 = document.getElementById("search3");
Cerca3.addEventListener("click", function () {
  creaCardsHome("Playlist Blues");
});
const Cerca4 = document.getElementById("search4");
Cerca4.addEventListener("click", function () {
  creaCardsHome("Rock");
});
const Cerca5 = document.getElementById("search5");
Cerca5.addEventListener("click", function () {
  creaCardsHome("Pollen");
});
const Cerca6 = document.getElementById("search6");
Cerca6.addEventListener("click", function () {
  creaCardsHome("Soul Lounge");
});
const Cerca7 = document.getElementById("search7");
Cerca7.addEventListener("click", function () {
  creaCardsHome("Nu-Funk");
});
const Cerca8 = document.getElementById("search8");
Cerca8.addEventListener("click", function () {
  creaCardsHome("Friday Music");
});
