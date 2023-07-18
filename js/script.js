'use strict'

/* ESERCIZIO: Js Social Posts
Descrizione
Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
Milestone 1
- Creiamo il nostro array di oggetti che rappresentano ciascun post. Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
  - id del post, (numero progressivo da 1 a n)
  - nome autore,
  - foto autore,
  - data in formato americano (mm-gg-yyyy),
  - testo del post,
  - immagine (non tutti i post devono avere una immagine),
  - numero di likes.
*Non è necessario creare date casuali*
*Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)*
Milestone 2
  - Prendendo come riferimento il layout di esempio presente nell’html, stampiamo i post del nostro feed.
Milestone 3
  - Se clicchiamo sul tasto “Mi Piace” cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
BONUS
1. Formattare le date in formato italiano (gg/mm/aaaa)
2. Gestire l’assenza dell’immagine profilo con un elemento di fallback che contiene le iniziali dell’utente (es. Luca Formicola > LF).
3. Al click su un pulsante “Mi Piace” di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.
*/


// Array contenente le informazioni dei post
const postsArray = [
  {
    "id": 1,
    "author": {
      "name": "Phil Mangione",
      "image": "https://unsplash.it/300/300?image=15"
    },
    "date": "2021-06-25",
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/300?image=171",
    "likes": 80
  },
  {
    "id": 2,
    "author": {
      "name": "Sofia Perlari",
      "image": "https://unsplash.it/300/300?image=10"
    },
    "date": "2021-09-03",
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/400?image=112",
    "likes": 120
  },
  {
    "id": 3,
    "author": {
      "name": "Chiara Passaro",
      "image": "https://unsplash.it/300/300?image=20"
    },
    "date": "2021-05-15",
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/400?image=234",
    "likes": 78
  },
  {
    "id": 4,
    "author": {
      "name": "Luca Formicola",
      "image": null
    },
    "date": "2021-04-03",
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/400?image=24",
    "likes": 56
  },
  {
    "id": 5,
    "author": {
      "name": "Alessandro Sainato",
      "image": "https://unsplash.it/300/300?image=29"
    },
    "date": "2021-03-05",
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/400?image=534",
    "likes": 95
  }
];

// Prendo il container dei post dall'HTML
const containerPosts = document.getElementById("container");

// Invoco le funzioni
generatePosts();
getTransformDate();


// FUNCTION (MILESTONE 1 E 2): Genero i post dell'HTML
function generatePosts() {
  // CICLO FOR
  for (let i = 0; i < postsArray.length; i++) {
    // VARIABILI: Creovariabili che prendono i dati presenti nell'array dei post
    let nameUser = postsArray[i].author.name;
    let imageUser = postsArray[i].author.image;
    let datePost = postsArray[i].date;
    let contentPost = postsArray[i].content;
    let mediaPost = postsArray[i].media;
    let likesPost = postsArray[i].likes;

    // Aggiungo all'interno dell'elemento preso dall'HTML il post
    containerPosts.innerHTML += `<div class="post">
                                    <div class="post__header">
                                      <div class="post-meta">
                                        <div class="post-meta__icon">
                                          <img class="profile-pic" src="${imageUser}" alt="${nameUser}">
                                        </div>
                                        <div class="post-meta__data">
                                          <div class="post-meta__author">${nameUser}</div>
                                          <div class="post-meta__time">${datePost}</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="post__text">${contentPost}</div>
                                    <div class="post__image">
                                      <img src="${mediaPost}" alt="media-image">
                                    </div>
                                    <div class="post__footer">
                                      <div class="likes js-likes">
                                        <div class="likes__cta">
                                          <a class="like-button  js-like-button" href="#a" data-postid="1">
                                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                                            <span class="like-button__label">Mi Piace</span>
                                          </a>
                                        </div>
                                        <div class="likes__counter">
                                          <span>Piace a <b id="like-counter-1" class="js-likes-counter">${likesPost}</b> persone</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>`
  }
}


// Dichiaro il valore false alla variabile che rappresenta il click sul button like
let clickedLike = false;

// FOR-EACH (MILESTONE 3 E BONUS 3): Creo la funzione per 
postsArray.forEach((el, i) => {
  // Variabile: Creo variabile che prende tutti i button dei post
  let likeBtn = document.querySelectorAll(".js-like-button");
  // Richiamo il valore del numero di like per post
  let likesPost = postsArray[i].likes;
  // Variabile: Creo variabile che prendere tutti i contatori dei like dei post
  let likeCount = document.querySelectorAll(".js-likes-counter");

  // SCATENO EVENTO AL CLICK: Click sul button "Mi Piace"
  likeBtn[i].addEventListener("click", function() {
    // Condizione: Se clicco sul button like cambia il colore e incrementa il numero di like altrimenti il colore ritorna come prima e decrementa il numero di like
    if (clickedLike === false) {
      clickedLike = true;
      likeBtn[i].classList.add("like-button--liked");
      likesPost++;
      likeCount[i].innerHTML = likesPost;
    } else {
      clickedLike = false;
      likeBtn[i].classList.remove("like-button--liked");
      likesPost--;
      likeCount[i].innerHTML = likesPost;
    }
  });
});

// FUNCTION (BONUS 1): Inverto l'ordine di giorno mese ed anno della data per portarla al formato italiano
function getTransformDate () {
  // Variabile: Creo una variabile vuota per la data al rovescio
  let reverseDate;
  // CICLO FOR
  for (let i = 0; i < postsArray.length; i++) {
    // Richiamo la data all'interno del ciclo
    let datePost = postsArray[i].date;
    // Inserisco gli elementi della data (anno, mese e giorno) all'interno di un array
    let arrayDate =datePost.split("-");
    // Rovescio l'ordine degli indici dell'array
    let reverseArrayDate = arrayDate.reverse();
    // Rimuovo gli elementi dell'array dall'array stesso
    reverseDate = reverseArrayDate.join("-");
    console.log(reverseDate);
    // Richiamo l'elemento contenente la data dall'HTML
    let date = document.querySelectorAll(".post-meta__time")
    // Cambio la data all'interno di HTML
    date[i].innerHTML = reverseDate;
  }
};

// FUNCTION (BONUS 2): ...


