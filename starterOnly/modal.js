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


  function validerPrenom(prenom) {
      if (prenom.length >= 2) {
          //console.log("Prenom valide")
          messageErreur[0].textContent = "";
          return true
      }
      messageErreur[0].textContent = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
      //console.log("Prenom Invalide")
      return false
  }

  function validerNom(nom) {
      if (nom.length >= 2) {
          //console.log("Nom valide")
          messageErreur[1].textContent = "";
          return true
      }
      messageErreur[1].textContent = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
      //console.log("Nom Invalide")
      return false
  }


  function validerEmail(email) {
      let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
      if (emailRegExp.test(email)) {
          //console.log("Email valide")
          messageErreur[2].textContent = "";
          return true
        } 
        messageErreur[2].textContent = "E-mail invalide.";
      //console.log("Email Invalide")
      return false
  
  }
  
  function validerNaissance() {
    // Récupérer la valeur du champ date de naissance
    var dateNaissance = document.getElementById('birthdate').value;

    // Vérifier si le champ est vide
    if (dateNaissance === "") {
        messageErreur[3].textContent = "Veuillez saisir votre date de naissance.";
        return false;
    }

    // Obtenir la date actuelle
    var dateActuelle = new Date();

    // Convertir la valeur du champ en objet Date
    var dateNaissanceObj = new Date(dateNaissance);

    // Vérifier si la date de naissance est dans le futur
    if (dateNaissanceObj > dateActuelle) {
        messageErreur[3].textContent = "La date de naissance ne peut pas être dans le futur.";
        return false;
    }

    // Définir l'âge maximum et minimum autorisé
    var ageMax = 120;
    var ageMin = 18;

    // Calculer l'âge en années
    var age = dateActuelle.getFullYear() - dateNaissanceObj.getFullYear();

    // Vérifier si l'âge est dans les limites autorisées
    if (age < ageMin || age > ageMax) {
      messageErreur[3].textContent = "L'âge doit être compris entre " + ageMin + " et " + ageMax + " ans.";
        return false;
    }
    messageErreur[3].textContent = "";
   
    return true;
}



  function validerConcour(concour) {
      
      if (concour == "") {
          console.log("Concour INvalide")
          messageErreur[4].textContent = "Completer ce champ.";
          return false
        } 
        messageErreur[4].textContent = "";
        console.log("Concour valide")
        return true
  
  }

  function validerLocation() {
    var radios = document.getElementsByName('location');
    // Loop dans radio 
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked == true) {
        console.log('radio valide');
        messageErreur[5].textContent = "";
        return true;
      }
    }
    messageErreur[5].textContent = "Vous devez choisir une option.";
    console.log('radio invalid');
    return false
  }

  function validerCondition() {
    if (document.getElementById("checkbox1").checked == true) {
      console.log("condition valide")
      messageErreur[6].textContent = "";
      return true
    }
    messageErreur[6].textContent = "Vous devez vérifier que vous acceptez les termes et conditions.";
      console.log("Vous devez vérifier que vous acceptez les termes et conditions.")
      return false

    
  }

  let form = document.querySelector("form")
  form.addEventListener("submit", (event) => {
    event.preventDefault()
 
    let prenom = document.getElementById("first").value
    let nom = document.getElementById("last").value
    let email = document.getElementById("email").value
    let concour = document.getElementById("concour").value

        if(validerPrenom(prenom) && validerNom(nom) && validerEmail(email) && validerNaissance() && validerConcour(concour) && validerLocation() && validerCondition()){
             console.log("Formulaire Correct")
            closeForm()
        }
        else{
          validerPrenom(prenom)
          validerNom(nom)
          validerEmail(email)
          validerNaissance()
          validerConcour(concour)
          validerLocation()
          validerCondition()
            console.log("Formulaire InCorrect")
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
}

// close modal form
function closeModal() {
  modalForm.style.display = "block";
  closeBtn.style.display = "block";
  modalBg.style.display = "none";
}

function closeForm() {
  modalForm.style.display = "none";
  closeBtn.style.display = "none";
  modalSubmitted.style.display = "block"
}
