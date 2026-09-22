// Blood Donation System JavaScript


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