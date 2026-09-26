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
    const gender = document.getElementById("registerGender");
    const donationDate = document.getElementById("lastDonationDate");
    const donationCountGroup = document.getElementById("donationCountGroup");
    const donationCount = document.getElementById("donationCount");
    const donatedBeforeRadios = form.querySelectorAll('input[name="donatedBefore"]');
    const password = document.getElementById("registerPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    if(!name || !role || !gender || !email || !mobile || !donationCountGroup || !donationCount || !donatedBeforeRadios.length || !password || !confirmPassword){
        return;
    }

    function updateDonationCountVisibility(){
        const donatedBefore = form.querySelector('input[name="donatedBefore"]:checked')?.value === "yes";
        donationCountGroup.hidden = !donatedBefore;
        donationCount.disabled = !donatedBefore;
        donationCount.required = donatedBefore;
        if(!donatedBefore){
            donationCount.value = "";
        }
    }

    donatedBeforeRadios.forEach(function(radio){
        radio.addEventListener("change", updateDonationCountVisibility);
    });

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

    updateDonationCountVisibility();

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
            const donatedBefore = form.querySelector('input[name="donatedBefore"]:checked').value === "yes";
            localStorage.setItem("userData", JSON.stringify({
                name: name.value.trim(),
                role: role.value,
                gender: gender.value,
                email: email.value.trim(),
                phone: mobile.value,
                lastDonationDate: donationDate ? donationDate.value : "",
                donatedBefore: donatedBefore,
                donationCount: donatedBefore ? Number(donationCount.value) : 0,
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
    const resetForm = document.getElementById("resetPasswordForm");
    const forgotPasswordLink = document.getElementById("forgotPasswordLink");
    const backToLoginLink = document.getElementById("backToLoginLink");
    const title = document.getElementById("loginTitle");
    const description = document.getElementById("loginDescription");

    if(!form){
        return;
    }

    function showLogin(message){
        form.hidden = false;
        if(resetForm){
            resetForm.hidden = true;
            resetForm.reset();
        }
        if(title){
            title.textContent = "Login";
        }
        if(description){
            description.textContent = message || "Sign in to continue";
        }
    }

    if(resetForm && forgotPasswordLink && backToLoginLink){
        forgotPasswordLink.addEventListener("click", function(event){
            event.preventDefault();
            form.hidden = true;
            resetForm.hidden = false;
            title.textContent = "Reset Password";
            description.textContent = "Verify your account and choose a new password";
            document.getElementById("resetEmail").focus();
        });

        backToLoginLink.addEventListener("click", function(event){
            event.preventDefault();
            showLogin();
        });

        const confirmNewPassword = document.getElementById("confirmNewPassword");
        const newPassword = document.getElementById("newPassword");
        confirmNewPassword.addEventListener("input", function(){
            confirmNewPassword.setCustomValidity(
                confirmNewPassword.value === newPassword.value ? "" : "Passwords must match."
            );
        });

        resetForm.addEventListener("submit", function(event){
            event.preventDefault();
            const resetEmail = document.getElementById("resetEmail").value.trim();
            const resetMobile = document.getElementById("resetMobile").value.trim();
            const resetMessage = document.getElementById("resetMessage");

            confirmNewPassword.setCustomValidity(
                confirmNewPassword.value === newPassword.value ? "" : "Passwords must match."
            );
            if(!resetForm.checkValidity()){
                resetForm.reportValidity();
                return;
            }

            let registeredUser = null;
            try {
                registeredUser = JSON.parse(localStorage.getItem("userData") || "null");
            } catch (error) {
                registeredUser = null;
            }

            const emailMatches = registeredUser && registeredUser.email &&
                registeredUser.email.trim().toLowerCase() === resetEmail.toLowerCase();
            const mobileMatches = registeredUser && registeredUser.phone === resetMobile;

            if(!emailMatches || !mobileMatches){
                resetMessage.textContent = "Those details do not match the registered account.";
                return;
            }

            registeredUser.password = newPassword.value;
            localStorage.setItem("userData", JSON.stringify(registeredUser));
            document.getElementById("loginEmail").value = registeredUser.email;
            showLogin("Password reset. Sign in with your new password.");
        });
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

        if(!registeredUser || typeof registeredUser.email !== "string" || !registeredUser.email.trim()){
            alert("You are not registered yet. Please register before logging in.");
            window.location.href = "register.html";
            return;
        }

        if(registeredUser.email.trim().toLowerCase() !== email.toLowerCase()){
            alert("No account is registered with this email. Please register, or use the email you used to sign up.");
            return;
        }

        if(registeredUser.role !== role || registeredUser.password !== password){
            alert("The email or password is incorrect.");
            return;
        }

        window.location.href = "dashboard.html";
    });
});

document.addEventListener("DOMContentLoaded", function(){

    const welcomeMessage = document.getElementById("welcomeMessage");
    const nextEligibleDonation = document.getElementById("nextEligibleDonation");
    const eligibilityNotification = document.getElementById("donationEligibilityNotification");
    const donorBadge = document.getElementById("donorBadge");
    const livesSaved = document.getElementById("livesSaved");

    if(!welcomeMessage && !nextEligibleDonation && !donorBadge && !livesSaved){
        return;
    }

    try {
        const savedUser = JSON.parse(localStorage.getItem("userData") || "null");
        if(welcomeMessage && savedUser && savedUser.name){
            welcomeMessage.textContent = `Welcome, ${savedUser.name} 👋`;
        }

        if(donorBadge){
            const donationCount = savedUser && Number.isInteger(Number(savedUser.donationCount))
                ? Number(savedUser.donationCount)
                : null;

            if(donationCount === null || donationCount < 0){
                donorBadge.textContent = "Donation count needed";
            } else if(donationCount === 0){
                donorBadge.textContent = "Welcome Donor";
            } else if(donationCount < 25){
                donorBadge.textContent = "Bronze Donor";
            } else if(donationCount < 50){
                donorBadge.textContent = "Silver Donor";
            } else if(donationCount < 75){
                donorBadge.textContent = "Gold Donor";
            } else if(donationCount < 100){
                donorBadge.textContent = "Emerald Donor";
            } else {
                donorBadge.textContent = "Ruby Donor";
            }
        }

        if(livesSaved){
            const donationCount = savedUser && Number.isInteger(Number(savedUser.donationCount))
                ? Number(savedUser.donationCount)
                : null;
            livesSaved.textContent = donationCount !== null && donationCount >= 0
                ? String(donationCount * 3)
                : "Not available";
        }

        if(nextEligibleDonation){
            let eligibilityText = "No previous donation date";
            let notificationText = "Add your last donation date to see your next eligibility date.";

            if(savedUser && savedUser.lastDonationDate){
                const [year, month, day] = savedUser.lastDonationDate.split("-").map(Number);
                const lastDonation = new Date(year, month - 1, day);
                const validDate = lastDonation.getFullYear() === year &&
                    lastDonation.getMonth() === month - 1 &&
                    lastDonation.getDate() === day;
                const intervalMonths = savedUser.gender === "Male" ? 3 :
                    savedUser.gender === "Female" ? 4 : null;

                if(validDate && intervalMonths){
                    const nextDate = new Date(year, month - 1, 1);
                    nextDate.setMonth(nextDate.getMonth() + intervalMonths);
                    const lastDayOfTargetMonth = new Date(
                        nextDate.getFullYear(),
                        nextDate.getMonth() + 1,
                        0
                    ).getDate();
                    nextDate.setDate(Math.min(day, lastDayOfTargetMonth));
                    const formattedDate = new Intl.DateTimeFormat(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                    }).format(nextDate);

                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if(nextDate <= today){
                        eligibilityText = "Eligible now";
                        notificationText = `Eligible since ${formattedDate}.`;
                    } else {
                        eligibilityText = formattedDate;
                        notificationText = `Next eligible donation: ${formattedDate}.`;
                    }
                } else if(validDate){
                    eligibilityText = "Check with your blood center";
                    notificationText = eligibilityText;
                } else {
                    eligibilityText = "Donation date unavailable";
                    notificationText = eligibilityText;
                }
            }

            nextEligibleDonation.textContent = eligibilityText;
            if(eligibilityNotification){
                eligibilityNotification.textContent = notificationText;
            }
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