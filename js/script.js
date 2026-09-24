// Blood Donation System JavaScript

document.addEventListener("DOMContentLoaded", function(){
    const protectedPages = ["dashboard.html", "profile.html", "search.html", "request.html", "admin.html"];
    const currentPage = window.location.pathname.split("/").pop().toLowerCase();

    if(!protectedPages.includes(currentPage)){
        return;
    }

    let registeredUser = null;
    try {
        registeredUser = JSON.parse(localStorage.getItem("userData") || "null");
    } catch (error) {
        registeredUser = null;
    }

    if(!registeredUser || !registeredUser.email){
        alert("Please register on the website before accessing the portal.");
        window.location.replace("register.html");
    }
});


// Registration validation and password visibility

document.addEventListener("DOMContentLoaded", function(){

    const form = document.getElementById("registerForm");

    if(!form){
        return;
    }

    const name = document.getElementById("registerName");
    const role = document.getElementById("registerRole");
    const email = document.getElementById("registerEmail");
    const mobile = document.getElementById("mobileNumber");
    const donationDate = document.querySelector("#registerForm input[type='date']");
    const password = document.getElementById("registerPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    if(!name || !role || !email || !mobile || !password || !confirmPassword){
        return;
    }

    const messages = {
        name: document.getElementById("nameMessage"),
        email: document.getElementById("emailMessage"),
        mobile: document.getElementById("mobileMessage"),
        password: document.getElementById("passwordMessage"),
        confirmPassword: document.getElementById("confirmPasswordMessage")
    };

    if(donationDate){
        donationDate.max = new Date().toISOString().split("T")[0];
    }

    if(messages.password){
        messages.password.textContent = "Use at least 12 characters, including an uppercase letter, number, and special character (! @ # $ % ^ & *).";
        messages.password.classList.add("password-requirements");
    }

    function setMessage(field, message){
        if(messages[field]){
            messages[field].textContent = message;
        }
    }

    function validateName(){
        const message = name.value.trim() ? "" : "Please enter your full name.";
        name.setCustomValidity(message);
        setMessage("name", message);
        return !message;
    }

    function validateEmail(){
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        const message = validEmail ? "" : "Please enter a valid email address, such as user@example.com.";
        email.setCustomValidity(message);
        setMessage("email", message);
        return validEmail;
    }

    function validateMobile(){
        const validMobile = /^[6-9][0-9]{9}$/.test(mobile.value);
        const message = validMobile ? "" : "Mobile number must be exactly 10 digits and start with 6, 7, 8, or 9.";
        mobile.setCustomValidity(message);
        setMessage("mobile", message);
        return validMobile;
    }

    function validatePassword(){
        const validPassword = /^(?=.{12,}$)(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password.value);
        const message = validPassword ? "" : "Password must be at least 12 characters and include an uppercase letter, number, and special character.";
        password.setCustomValidity(message);
        setMessage("password", message || "Use at least 12 characters, including an uppercase letter, number, and special character (! @ # $ % ^ & *).");
        return validPassword;
    }

    function validateConfirmPassword(){
        const matches = confirmPassword.value === password.value && confirmPassword.value !== "";
        const message = matches ? "" : "Passwords must match exactly.";
        confirmPassword.setCustomValidity(message);
        setMessage("confirmPassword", message);
        return matches;
    }

    name.addEventListener("input", validateName);
    email.addEventListener("input", validateEmail);
    mobile.addEventListener("input", function(){
        mobile.value = mobile.value.replace(/\D/g, "").slice(0, 10);
        validateMobile();
    });
    password.addEventListener("input", function(){
        validatePassword();
        validateConfirmPassword();
    });
    confirmPassword.addEventListener("input", validateConfirmPassword);

    form.addEventListener("submit", function(event){
        const valid = validateName() && validateEmail() && validateMobile() && validatePassword() && validateConfirmPassword();

        if(!valid || !form.checkValidity()){
            event.preventDefault();
            form.reportValidity();
        } else {
            localStorage.setItem("userData", JSON.stringify({
                name: name.value.trim(),
                role: role.value,
                email: email.value.trim(),
                phone: mobile.value,
                password: password.value
            }));
        }
    });

    document.querySelectorAll(".password-toggle").forEach(function(toggle){
        toggle.addEventListener("click", function(){
            const field = document.getElementById(toggle.dataset.passwordTarget);
            if(!field){
                return;
            }

            const icon = toggle.querySelector("i");
            const showing = field.type === "text";

            field.type = showing ? "password" : "text";
            toggle.setAttribute("aria-pressed", String(!showing));
            toggle.setAttribute("aria-label", showing ? "Show password" : "Hide password");
            if(icon){
                icon.classList.toggle("fa-eye", showing);
                icon.classList.toggle("fa-eye-slash", !showing);
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById("loginForm");

    if(!form){
        return;
    }

    form.addEventListener("submit", function(event){
        event.preventDefault();

        let registeredUser = null;
        try {
            registeredUser = JSON.parse(localStorage.getItem("userData") || "null");
        } catch (error) {
            registeredUser = null;
        }

        const role = document.getElementById("loginRole").value;
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("password").value;

        if(!form.checkValidity()){
            form.reportValidity();
            return;
        }

        if(!registeredUser || registeredUser.email !== email || registeredUser.role !== role){
            alert("Please register on the portal before you login.");
            window.location.href = "register.html";
            return;
        }

        if(registeredUser.password !== password){
            alert("The email or password is incorrect.");
            return;
        }

        window.location.href = "dashboard.html";
    });
});

document.addEventListener("DOMContentLoaded", function(){

    const welcomeMessage = document.getElementById("welcomeMessage");

    if(!welcomeMessage){
        return;
    }

    try {
        const savedUser = JSON.parse(localStorage.getItem("userData") || "null");
        if(savedUser && savedUser.name){
            welcomeMessage.textContent = `Welcome, ${savedUser.name} 👋`;
        }
    } catch (error) {
        console.warn("Unable to read saved user data:", error);
    }
});


function togglePassword(){
    const passwordField = document.getElementById("password");

    if(!passwordField){
        return;
    }

    const isHidden = passwordField.type === "password";
    passwordField.type = isHidden ? "text" : "password";

    const toggleIcon = document.querySelector(".toggle-password");
    if(toggleIcon){
        toggleIcon.classList.toggle("fa-eye", !isHidden);
        toggleIcon.classList.toggle("fa-eye-slash", isHidden);
    }
}

// Login Function

function loginUser(){

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;


    if(email == "" || password == ""){

        alert("Please fill all fields");

    }
    else{

        alert("Login Successful");

        window.location.href = "dashboard.html";

    }

}



// Register Function

function registerUser(){

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;


    if(name=="" || email=="" || phone=="" || password==""){

        alert("Please fill all details");

    }

    else{

        alert("Registration Successful");

        window.location.href="login.html";

    }

}



// Logout Function

function logout(){

    alert("Logged out successfully");

    window.location.href="login.html";

}
// ===============================
// Blood Donor Search Function
// ===============================


function searchDonor(){

    let blood = document.getElementById("blood").value;
    let location = document.getElementById("location").value;


    if(blood == "" || location == ""){

        alert("Please select blood group and location");

    }

    else{

        alert("Searching donors...");


        // Demo result

        document.getElementById("result").innerHTML = `

        <div class="donor-card">

            <div class="donor-info">

                <h3>Rahul Kumar</h3>

                <p>Blood Group : ${blood}</p>

                <p>Location : ${location}</p>

                <p>Available : Yes</p>

            </div>


            <a href="#" class="contact-btn">
                Contact
            </a>

        </div>

        `;

    }

}





// ===============================
// Blood Request Function
// ===============================


function requestBlood(){


    let patient = document.getElementById("patient").value;
    let blood = document.getElementById("blood").value;
    let hospital = document.getElementById("hospital").value;



    if(patient=="" || blood=="" || hospital==""){


        alert("Please fill all request details");


    }

    else{


        alert("Blood request submitted successfully");


        document.getElementById("status").innerHTML =

        "Request Status : Pending";


    }


}





// ===============================
// Profile Update Function
// ===============================


function updateProfile(){


    let name = document.getElementById("profileName").value;
    let phone = document.getElementById("profilePhone").value;


    if(name=="" || phone==""){


        alert("Please enter all details");


    }

    else{


        alert("Profile updated successfully");


    }


}





// ===============================
// Admin Approve Request
// ===============================


function approveRequest(){


    alert("Request Approved");


}





// ===============================
// Admin Delete Request
// ===============================


function deleteRequest(){


    let confirmDelete = confirm(
        "Are you sure you want to delete?"
    );


    if(confirmDelete){


        alert("Request Deleted");


    }


}

// =====================================
// LOCAL STORAGE USER REGISTRATION
// =====================================


function saveUser(){

    let user = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        blood: document.getElementById("blood").value

    };


    localStorage.setItem(
        "userData",
        JSON.stringify(user)
    );


    alert("Registration Completed");


    window.location.href="login.html";

}




// =====================================
// LOGIN CHECK USING LOCAL STORAGE
// =====================================


function checkLogin(){


    let email =
    document.getElementById("email").value;


    let password =
    document.getElementById("password").value;



    if(email=="" || password==""){


        alert("Enter email and password");


    }

    else{


        localStorage.setItem(
            "loginStatus",
            "true"
        );


        window.location.href="dashboard.html";


    }

}





// =====================================
// DISPLAY PROFILE DATA
// =====================================


function loadProfile(){


    let user =
    JSON.parse(
        localStorage.getItem("userData")
    );


    if(user){


        document.getElementById("showName").innerHTML =
        user.name;


        document.getElementById("showEmail").innerHTML =
        user.email;


        document.getElementById("showPhone").innerHTML =
        user.phone;


        document.getElementById("showBlood").innerHTML =
        user.blood;


    }


}





// =====================================
// DONOR DATABASE
// =====================================


let donors = [

{
    name:"Arun",
    blood:"O+",
    location:"Chennai",
    phone:"9876543210"
},

{
    name:"Priya",
    blood:"A+",
    location:"Madurai",
    phone:"8765432109"
},

{
    name:"Karthik",
    blood:"B+",
    location:"Coimbatore",
    phone:"7654321098"
},

{
    name:"Divya",
    blood:"AB+",
    location:"Chennai",
    phone:"6543210987"
}

];




// =====================================
// ADVANCED SEARCH
// =====================================


function findDonor(){


    let group =
    document.getElementById("blood").value;


    let place =
    document.getElementById("location").value;



    let result =
    document.getElementById("result");



    let found = donors.filter(function(donor){


        return donor.blood==group &&
               donor.location==place;


    });



    if(found.length > 0){


        result.innerHTML="";


        found.forEach(function(donor){


            result.innerHTML += `


            <div class="donor-card">


            <h3>${donor.name}</h3>

            <p>
            Blood Group : ${donor.blood}
            </p>

            <p>
            Location : ${donor.location}
            </p>

            <p>
            Phone : ${donor.phone}
            </p>


            </div>


            `;


        });


    }


    else{


        result.innerHTML =
        "No donor available";


    }


}





// =====================================
// ADMIN COUNT
// =====================================


function adminCount(){


    let totalDonors =
    donors.length;



    document.getElementById("donorCount").innerHTML =
    totalDonors;


}

// =====================================
// DARK / LIGHT MODE
// =====================================


function toggleMode(){

    document.body.classList.toggle("dark-mode");


    let mode =
    document.body.classList.contains("dark-mode")
    ? "dark"
    : "light";


    localStorage.setItem(
        "theme",
        mode
    );

}



// Load saved theme

window.onload = function(){


    let theme =
    localStorage.getItem("theme");


    if(theme=="dark"){

        document.body.classList.add("dark-mode");

    }


};





// =====================================
// SUCCESS NOTIFICATION
// =====================================


function showMessage(message){


    let box =
    document.createElement("div");


    box.className="notification";


    box.innerHTML=message;


    document.body.appendChild(box);



    setTimeout(function(){


        box.remove();


    },3000);


}





// =====================================
// PAGE LOGIN PROTECTION
// =====================================


function protectPage(){


    let status =
    localStorage.getItem("loginStatus");



    if(status!="true"){


        alert(
        "Please login first"
        );


        window.location.href="login.html";


    }


}





// =====================================
// CURRENT DATE
// =====================================


function showDate(){


    let date =
    new Date();


    let today =
    date.toDateString();



    let element =
    document.getElementById("date");


    if(element){

        element.innerHTML =
        today;

    }


}





// =====================================
// CLEAR USER DATA (LOGOUT)
// =====================================


function logoutUser(){


    localStorage.removeItem(
        "loginStatus"
    );


    showMessage(
        "Logged out successfully"
    );


    setTimeout(function(){

        window.location.href="login.html";

    },1500);


}