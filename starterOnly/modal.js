function editNav() {
  var x = document.getElementById("myTopnav"); 
  if (x.className === "topnav") { 
    x.className += " responsive"; 
  } else {
    x.className = "topnav"; 
  }
}

// DOM Elements
const modalBg = document.querySelector(".bground"); 
const modalBtn = document.querySelectorAll(".modal-btn"); 
const formData = document.querySelectorAll(".formData"); 

const modalForm = document.querySelector("form"); 
const modalSubmitted = document.querySelector(".submitted") 
const closeBtn = document.querySelector(".close"); 
const submittedBtn = document.querySelector("#btn-close"); 
const messageErreur = document.querySelectorAll('.messageErreur'); 

// Définir l'âge maximum et minimum autorisé
var ageMax = 120;
var ageMin = 18;


// Définition des messages d'erreur pour chaque champ du formulaire
const messageError = {
  first: 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.', 
  last:'Veuillez entrer 2 caractères ou plus pour le champ du nom.', 
  email:'E-mail invalide.', 
  birthdateNull:'Veuillez saisir votre date de naissance.', 
  birthdateFutur:'La date de naissance ne peut pas être dans le futur.', 
  birthdateInt:"L'âge doit être compris entre " + ageMin + " et " + ageMax + " ans.", 
  concours:'Veuillez renseigner un nombre de concour', 
  location:'Vous devez choisir une ville.', 
  condition:'Vous devez vérifier que vous acceptez les termes et conditions.', 
};

// Fonction pour afficher un message d'erreur pour un FormData spécifié
function setError(element,messageError){
  element.parentElement.setAttribute('data-error-visible', 'true'); 
  element.parentElement.setAttribute('data-error', messageError); 
}

// Fonction pour enlever un message d'erreur pour un FormData spécifié
function hideError(element){
  element.parentElement.removeAttribute('data-error-visible');
  element.parentElement.removeAttribute('data-error'); 
}

// Fonction pour crée un "span" qui contient messageErreur s'il n'existe pas déjà
function errorCheckbox(id,text){
  let conteneur = document.getElementById(id); // Récupère l'élément HTML avec l'ID spécifié
  let existingSpan = conteneur.querySelector('span.messageErreur'); 

  if (!existingSpan) { 
    let span = document.createElement('span'); 
    span.className = 'messageErreur';
    span.textContent = text;
    conteneur.appendChild(span); // Ajoute ce nouvel élément au formData spécifié
  }
  
}

// Fonction pour cacher le "span" qui contient le message d'erreur s'il existe
function validCheckbox(id) {
  let conteneur = document.getElementById(id); // Récupère l'élément HTML avec l'ID spécifié
  let existingSpan = conteneur.querySelector('span.messageErreur');
  let span = conteneur.querySelector('span.messageErreur'); 

  if (existingSpan) { 
    conteneur.removeChild(span);
  }
}

// Fonction pour valider le champ du prénom
function validerPrenom(prenom) {
  if (prenom.length >= 2) { 
    hideError(first);
    return true; 
  }
  setError(first,messageError["first"]); 

}

// Fonction pour valider le champ du nom
function validerNom(nom) {
  if (nom.length >= 2) { 
    hideError(last); 
    return true; 
  }
  setError(last,messageError["last"]); 

}

// Fonction pour valider le champ de l'e-mail
function validerEmail(email) {
  let emailRegExp = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$");
  if (emailRegExp.test(email)) { 
    hideError(mail); 
    return true; 
  } 
  setError(mail,messageError["email"]);

}

// Fonction pour valider le champ de la date de naissance
function validerNaissance() {
  var dateNaissance = document.getElementById('birthdate').value; 
  if (dateNaissance === "") { // Si la date de naissance est vide
    setError(birthdate,messageError["birthdateNull"]); 
    return false; 
  }

  var dateActuelle = new Date(); // Obtenir la date actuelle
  var dateNaissanceObj = new Date(dateNaissance); // Convertir la valeur du champ en objet Date
  var age = dateActuelle.getFullYear() - dateNaissanceObj.getFullYear(); // Calculer l'âge en années

  if (dateNaissanceObj > dateActuelle) { // Si la date de naissance est dans le futur
    setError(birthdate,messageError["birthdateFutur"]);
    return false;
  }


  if (age < ageMin || age > ageMax) { // Vérifier si l'âge est dans les limites autorisées
    setError(birthdate,messageError["birthdateInt"]);
    return false;
  }
  hideError(birthdate);
  return true;
}

// Fonction pour valider le nombre de tournois
function validerConcour(concour) {
  if (concour == "") { // Si le champ est vide
    setError(concours,messageError["concours"]);
    return false;
  } 
  hideError(concours);
  return true;
}

// Fonction pour valider la ville
function validerLocation() {
  var radios = document.getElementsByName('location'); // Récupére les éléments radio avec le nom "location"
  for (var i = 0, length = radios.length; i < length; i++) { 
    if (radios[i].checked == true) { // Si un radio est sélectionné
      validCheckbox("locationConteneur");
      return true;
    }
  }
  errorCheckbox("locationConteneur",messageError["location"]);

}

// Fonction pour valider les conditions
function validerCondition() {
  if (document.getElementById("checkbox1").checked == true) { // Si la case à cocher est cochée
    validCheckbox("conditionConteneur");
    return true;
  }
  errorCheckbox("conditionConteneur",messageError["condition"]);

}

let form = document.querySelector("form"); 
form.addEventListener("submit", (event) => { 
  event.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire

  let prenom = document.getElementById("first").value;
  let nom = document.getElementById("last").value;
  let mail = document.getElementById("mail").value;
  let concour = document.getElementById("concours").value;

  // Si la validation est réussie, ferme le formulaire
  if(validerPrenom(prenom) && validerNom(nom) && validerEmail(mail) && validerNaissance() && validerConcour(concour) && validerLocation() && validerCondition()){
    subForm(); 

  }else{
      validerPrenom(prenom);
      validerNom(nom);
      validerEmail(mail);
      validerNaissance();
      validerConcour(concour);
      validerLocation();
      validerCondition();
    }
  }
);

// Bouton "Je m'inscris"
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Fonction pour ouvrir le modal
function launchModal() {
  modalBg.style.display = "block"; // Affiche le fond du modal en le rendant visible
  modalSubmitted.style.display = "none"; 
  document.querySelector('body').classList.add('formOpen'); 
  window.scrollTo({top: 0, behavior: 'smooth'});
}


closeBtn.addEventListener("click", closeModal);
submittedBtn.addEventListener("click", closeModal);

// Fonction pour fermer le modal
function closeModal() {
  modalForm.style.display = "block";
  modalBg.style.display = "none";
  document.querySelector('body').classList.remove('formOpen');
}

// Fonction pour soumission du formulaire
function subForm() {
  modalForm.style.display = "none";
  modalSubmitted.style.display = "block"; 
}