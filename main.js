//Création de la source de l'identifiant 

function createID(name, surname, email, phone) {      
      const data = `${name.toLowerCase()}|${surname.toLowerCase()}|${email.toLowerCase()}|${phone}`;
      let hash = 0;
      for (let i = 0; i < data.length; i++) {
        const c = data.charCodeAt(i);
        hash = (hash << 5) - hash + c;
        hash = hash & hash; // reste en 32 bits
      }
     return "ID-" + Math.abs(hash).toString().padStart(10, '0');   
}

//Sauvegarde locale de l'utilisateur
function saveUser(userData) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const existEmail = users.find(u => u.email === userData.email);
    const existPhone = users.find(u => u.phone === userData.phone);
    if(existEmail) {
        //alert("Cet email est déjà utilisé.");
    }else if(existPhone) {
       // alert("Ce téléphone est déjà utilisé.");
    }else {
        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));
    }
}

//Création de la carte 

function createCard() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const day = document.getElementById('birthday').value;
    const birth = document.getElementById('birth').value;
    const gender = document.getElementById('gender').value;
    const nationality = document.getElementById('nationality').value; 
    const city = document.getElementById('city').value;
    const residency = document.getElementById('residency').value;
    const district = document.getElementById('district').value;
    const profession = document.getElementById('profession').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const photo = document.getElementById("photo");
    const id = createID(firstName, lastName, email, phone);
    
    const user = {id, firstName, lastName,day, birth, gender, nationality, city, residency, district, profession, phone, email, photo};
    
    //Affichage des données recueillies 
    
     if (!firstName || !lastName || !day || !birth || !gender || !nationality || !city || !residency || !district || !profession || !phone || !email) {
         alert("Veuillez remplir tous les champs");
     }else if (photo.files && photo.files[0]) {
          const reader = new FileReader();
          reader.onload = function (e) {
          document.getElementById('photoCard').src = e.target.result;
      };
          reader.readAsDataURL(photo.files[0]);
      }else {
        document.getElementById("firstNameCard").textContent = "Nom : " + firstName;
    document.getElementById("lastNameCard").textContent = "Prénom(s) : " + lastName;
    document.getElementById("genderCard").textContent = "Sexe : " + gender;
     document.getElementById("birthdayCard").textContent = "Date de naissance : " + day ;
    document.getElementById("birthCard").textContent = "Lieu de naissance : " + birth;   document.getElementById("nationalityCard").textContent = "Nationalité : " + nationality;
    document.getElementById("cityCard").textContent = "Ville : " + city;
   document.getElementById("residencyCard").textContent = "Arrondissement : " + residency;
    document.getElementById("districtCard").textContent = "Quartier : " + district;
  document.getElementById("professionCard").textContent = "Profession : " + profession;
    document.getElementById("phoneCard").textContent = "Téléphone : " + phone;
    document.getElementById("emailCard").textContent = "Email : " + email;
    document.getElementById("identifiant").textContent = id;
    
    saveUser(user);
    
    //Affichage de la carte 
    document.getElementById("carte").style.display = "block";
    document.getElementById("teleCarte").style.display = "block";
    
      }           
}


// Création de version PDF de la carte 
async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const identityCard = document.getElementById("carte");

    const canvas = await html2canvas(identityCard, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save("carte_identite.pdf");
  }