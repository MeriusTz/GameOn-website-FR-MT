function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalForm = document.querySelector("form");
const modalSubmitted = document.querySelector(".submitted")
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const submittedBtn = document.querySelector(".btn-submit");
const messageErreur = document.querySelectorAll('.messageErreur');

    // Définir l'âge maximum et minimum autorisé
var ageMax = 120;
var ageMin = 18;

const messageError = {
first: 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
last:'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
email:'E-mail invalide.',
birthdateNull:'Veuillez saisir votre date de naissance.',
birthdateFutur:'La date de naissance ne peut pas être dans le futur.',
birthdateInt:"L'âge doit être compris entre " + ageMin + " et " + ageMax + " ans.",
concours:'Veuillez renseigner un nombre entre 0 et 99',
location:'Vous devez choisir une ville.',
condition:'Vous devez vérifier que vous acceptez les termes et conditions.',

};

function setError(element,messageError){
  element.parentElement.setAttribute('data-error-visible', 'true');
  element.parentElement.setAttribute('data-error', messageError);
}

function hideError(element){
  element.parentElement.removeAttribute('data-error-visible');
  element.parentElement.removeAttribute('data-error');
}

function errorCheckbox(id,text){
  let conteneur = document.getElementById(id);
  let existingSpan = conteneur.querySelector('span.messageErreur');
  
  if (!existingSpan) { // Ajout seulement s'il n'y a pas déjà un message d'erreur
    let span = document.createElement('span');
    span.className = 'messageErreur';
    span.textContent = text;
    conteneur.appendChild(span);
  }
  
}
function validCheckbox(id) {
  let conteneur = document.getElementById(id);
  let existingSpan = conteneur.querySelector('span.messageErreur');
  let span = conteneur.querySelector('span.messageErreur');
  if (existingSpan) {
    conteneur.removeChild(span);
  }
}

  function validerPrenom(prenom) {
    if (prenom.length >= 2) {
      hideError(first)
      return true;
    }
    setError(first,messageError["first"])
    return false;
}

  function validerNom(nom) {
    
      if (nom.length >= 2) {
          hideError(last)
          return true;
      }
      setError(last,messageError["last"])
      return false;
  }


  function validerEmail(email) {
    let emailRegExp = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$");
    if (emailRegExp.test(email)) {
          hideError(mail)
          return true;
        } 
        setError(mail,messageError["email"])
      return false;
  
  }
  
  function validerNaissance() {
    // Récupérer la valeur du champ date de naissance
    var dateNaissance = document.getElementById('birthdate').value;
    // Vérifier si le champ est vide
    if (dateNaissance === "") {
      setError(birthdate,messageError["birthdateNull"]);
        return false;
    }

    // Obtenir la date actuelle
    var dateActuelle = new Date();
    // Convertir la valeur du champ en objet Date
    var dateNaissanceObj = new Date(dateNaissance);

    // Vérifier si la date de naissance est dans le futur
    if (dateNaissanceObj > dateActuelle) {
      setError(birthdate,messageError["birthdateFutur"]);
        return false;
    }
    // Calculer l'âge en années
    var age = dateActuelle.getFullYear() - dateNaissanceObj.getFullYear();
    // Vérifier si l'âge est dans les limites autorisées
    if (age < ageMin || age > ageMax) {
      setError(birthdate,messageError["birthdateInt"]);
        return false;
    }
    hideError(birthdate);
    return true;
}



  function validerConcour(concour) {
      
      if (concour == "") {
          setError(concours,messageError["concours"]);
          return false;
        } 
        hideError(concours);
        return true;
  
  }


  
  function validerLocation() {
    var radios = document.getElementsByName('location');
    // Loop dans radio 
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked == true) {
        validCheckbox("locationConteneur");
        return true;
      }
    }
    errorCheckbox("locationConteneur",messageError["location"]);
    return false;
  }



  function validerCondition() {
    if (document.getElementById("checkbox1").checked == true) {
      validCheckbox("conditionConteneur");
      return true;
    }

        errorCheckbox("conditionConteneur",messageError["condition"]);
        return false;

    
  }

  let form = document.querySelector("form")
  form.addEventListener("submit", (event) => {
    event.preventDefault()
 
    let prenom = document.getElementById("first").value
    let nom = document.getElementById("last").value
    let mail = document.getElementById("mail").value
    let concour = document.getElementById("concours").value

        if(validerPrenom(prenom) && validerNom(nom) && validerEmail(mail) && validerNaissance() && validerConcour(concour) && validerLocation() && validerCondition()){
            closeForm()
        }
        else{
          validerPrenom(prenom)
          validerNom(nom)
          validerEmail(mail)
          validerNaissance()
          validerConcour(concour)
          validerLocation()
          validerCondition()

        }

  })

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.addEventListener("click", closeModal);

submittedBtn.addEventListener("click", closeModal);


// launch modal form
function launchModal() {
  modalBg.style.display = "block";
  modalSubmitted.style.display = "none"
  document.querySelector('body').classList.add('formOpen');
  window.scrollTo({top: 0, behavior: 'smooth'});
}

// close modal form
function closeModal() {
  modalForm.style.display = "block";
  modalBg.style.display = "none";
  document.querySelector('body').classList.remove('formOpen');
}

function closeForm() {
  modalForm.style.display = "none";
  modalSubmitted.style.display = "block"
}
