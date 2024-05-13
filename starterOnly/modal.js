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
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");


  function validerPrenom(prenom) {
      if (prenom.length >= 2) {
          console.log("Prenom valide")
          return true
      }
      console.log("Prenom INvalide")
      return false
  }

  function validerNom(nom) {
      if (nom.length >= 2) {
          console.log("Nom valide")
          return true
      }
      console.log("Nom INvalide")
      return false
  }


  function validerEmail(email) {
      let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
      if (emailRegExp.test(email)) {
          console.log("Email valide")
          return true
      } 
      console.log("Email INvalide")
      return false
  
  }

  function validerConcour(concour) {
      
      if (concour == "") {
          console.log("Concour INvalide")
          return false
        } 
        console.log("Concour valide")
        return true
  
  }

  function validerLocation() {
    var radios = document.getElementsByName('location');
    // Loop dans radio 
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked == true) {
        console.log('radio valide');
        return true;
      }
    }
    console.log('radio invalid');
    return false
  }

  function validerCondition() {
    if (document.getElementById("checkbox1").checked == true) {
      console.log("condition valide")
      return true
    }
      console.log("condition non valide")
      return false

    
  }

  let form = document.querySelector("form")
  form.addEventListener("submit", (event) => {
      event.preventDefault()
      let prenom = document.getElementById("first").value
      let nom = document.getElementById("last").value
      let email = document.getElementById("email").value
      let concour = document.getElementById("concour").value

      // On envoie l'email
      if(validerPrenom(prenom) && validerNom(nom) && validerEmail(email) && validerConcour(concour) && validerLocation() && validerCondition()){
           console.log("YEEPEE")
           closeForm()
      }else{
         console.log("Erreur")
      }

  })

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.addEventListener("click", closeModal);



// launch modal form
function launchModal() {
  modalBg.style.display = "block";
}

// close modal form
function closeModal() {
  modalBg.style.display = "none";
}

function closeForm() {
  modalForm.style.display = "none";
  closeBtn.style.display = "none";
}
