document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById("bloodSearchForm");
    if(!form){
        return;
    }

    const bloodGroupField = document.getElementById("searchBloodGroup");
    const cityField = document.getElementById("searchCity");
    const status = document.getElementById("searchStatus");
    const bloodBankResults = document.getElementById("bloodBankResults");
    const donorRows = document.getElementById("nearbyDonorRows");

    const bloodBanks = [
        { city: "Chennai", name: "Rajiv Gandhi Government General Hospital", address: "Park Town, Chennai", inventory: { "A+": 12, "A-": 3, "B+": 9, "B-": 2, "AB+": 4, "AB-": 1, "O+": 18, "O-": 4 } },
        { city: "Chennai", name: "Apollo Hospitals", address: "Greams Road, Chennai", inventory: { "A+": 10, "A-": 2, "B+": 8, "B-": 2, "AB+": 5, "AB-": 1, "O+": 14, "O-": 3 } },
        { city: "Coimbatore", name: "Coimbatore Medical College Hospital", address: "Avinashi Road, Coimbatore", inventory: { "A+": 8, "A-": 2, "B+": 11, "B-": 3, "AB+": 3, "AB-": 1, "O+": 16, "O-": 4 } },
        { city: "Coimbatore", name: "Kovai Medical Center and Hospital", address: "Avinashi Road, Coimbatore", inventory: { "A+": 9, "A-": 2, "B+": 7, "B-": 2, "AB+": 4, "AB-": 1, "O+": 13, "O-": 3 } },
        { city: "Madurai", name: "Government Rajaji Hospital", address: "Panagal Road, Madurai", inventory: { "A+": 11, "A-": 2, "B+": 8, "B-": 2, "AB+": 3, "AB-": 1, "O+": 15, "O-": 3 } },
        { city: "Madurai", name: "Meenakshi Mission Hospital", address: "Melur Road, Madurai", inventory: { "A+": 7, "A-": 1, "B+": 9, "B-": 2, "AB+": 4, "AB-": 1, "O+": 12, "O-": 3 } },
        { city: "Salem", name: "Government Mohan Kumaramangalam Medical College Hospital", address: "Salem", inventory: { "A+": 8, "A-": 2, "B+": 6, "B-": 2, "AB+": 3, "AB-": 1, "O+": 12, "O-": 2 } },
        { city: "Tiruchirappalli", name: "Mahatma Gandhi Memorial Government Hospital", address: "Tiruchirappalli", inventory: { "A+": 7, "A-": 1, "B+": 8, "B-": 2, "AB+": 3, "AB-": 1, "O+": 10, "O-": 2 } },
        { city: "Vellore", name: "Christian Medical College", address: "Ida Scudder Road, Vellore", inventory: { "A+": 10, "A-": 2, "B+": 7, "B-": 2, "AB+": 4, "AB-": 1, "O+": 14, "O-": 3 } },
        { city: "Tirunelveli", name: "Tirunelveli Medical College Hospital", address: "High Ground, Tirunelveli", inventory: { "A+": 6, "A-": 1, "B+": 7, "B-": 2, "AB+": 2, "AB-": 1, "O+": 11, "O-": 2 } },
        { city: "Erode", name: "Government Headquarters Hospital", address: "Erode", inventory: { "A+": 5, "A-": 1, "B+": 6, "B-": 1, "AB+": 2, "AB-": 1, "O+": 9, "O-": 2 } },
        { city: "Tiruppur", name: "Government Medical College Hospital", address: "Tiruppur", inventory: { "A+": 5, "A-": 1, "B+": 6, "B-": 1, "AB+": 2, "AB-": 1, "O+": 8, "O-": 2 } }
    ];

    const tamilNaduCities = [
        "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
        "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram",
        "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai",
        "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai",
        "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi",
        "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
        "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur",
        "Vellore", "Viluppuram", "Virudhunagar"
    ];

    tamilNaduCities.forEach(function(city){
        const hasListings = bloodBanks.some(function(bank){
            return bank.city === city;
        });
        if(!hasListings){
            bloodBanks.push({
                city: city,
                name: `${city} District Blood Centre (sample)`,
                address: `${city} district`,
                inventory: { "A+": 8, "A-": 2, "B+": 6, "B-": 2, "AB+": 3, "AB-": 1, "O+": 10, "O-": 2 }
            });
        }
    });

    const sampleDonors = [
        { name: "Arun K.", bloodGroup: "O+", city: "Chennai" },
        { name: "Priya S.", bloodGroup: "A+", city: "Chennai" },
        { name: "Rahul M.", bloodGroup: "B+", city: "Chennai" },
        { name: "Karthik R.", bloodGroup: "O+", city: "Coimbatore" },
        { name: "Divya P.", bloodGroup: "AB+", city: "Coimbatore" },
        { name: "Meena V.", bloodGroup: "A+", city: "Madurai" },
        { name: "Suresh T.", bloodGroup: "O-", city: "Madurai" },
        { name: "Nila R.", bloodGroup: "B+", city: "Salem" },
        { name: "Vijay S.", bloodGroup: "O+", city: "Tiruchirappalli" },
        { name: "Anitha J.", bloodGroup: "A-", city: "Vellore" },
        { name: "Bala K.", bloodGroup: "O+", city: "Tirunelveli" },
        { name: "Sanjay P.", bloodGroup: "B-", city: "Erode" },
        { name: "Malar D.", bloodGroup: "O+", city: "Tiruppur" }
    ];

    function makeElement(tag, text, className){
        const element = document.createElement(tag);
        element.textContent = text;
        if(className){
            element.className = className;
        }
        return element;
    }

    function renderBloodBanks(city, bloodGroup){
        const matches = bloodBanks.filter(function(bank){
            return bank.city.toLowerCase() === city.toLowerCase() && bank.inventory[bloodGroup] > 0;
        });
        bloodBankResults.replaceChildren();

        if(!matches.length){
            bloodBankResults.append(makeElement("p", `No directory listings for ${city} and ${bloodGroup}.`, "empty-state"));
            return 0;
        }

        matches.forEach(function(bank){
            const card = makeElement("article", "", "blood-card");
            card.append(makeElement("h3", bank.name));
            card.append(makeElement("p", `Blood group: ${bloodGroup}`));
            card.append(makeElement("p", `Sample units: ${bank.inventory[bloodGroup]}`));
            card.append(makeElement("p", `Location: ${bank.address}`));
            card.append(makeElement("span", "Sample listing · not live", "limited"));
            bloodBankResults.append(card);
        });
        return matches.length;
    }

    function renderDonors(city, bloodGroup){
        const matches = sampleDonors.filter(function(donor){
            return donor.city.toLowerCase() === city.toLowerCase() && donor.bloodGroup === bloodGroup;
        });
        try {
            const user = JSON.parse(localStorage.getItem("userData") || "null");
            if(user && user.role === "Donor" && typeof user.location === "string" && user.location.toLowerCase() === city.toLowerCase() && user.bloodGroup === bloodGroup){
                matches.unshift({
                    name: `${user.name || "Registered donor"} (you)`,
                    bloodGroup: user.bloodGroup,
                    city: user.location,
                    status: "Registered · availability unconfirmed"
                });
            }
        } catch (error) {
            console.warn("Unable to read registered donor details:", error);
        }
        donorRows.replaceChildren();

        if(!matches.length){
            const row = document.createElement("tr");
            const cell = makeElement("td", `No sample donor listings for ${bloodGroup} in ${city}.`);
            cell.colSpan = 4;
            row.append(cell);
            donorRows.append(row);
            return 0;
        }

        matches.forEach(function(donor){
            const row = document.createElement("tr");
            row.append(makeElement("td", donor.name));
            row.append(makeElement("td", donor.bloodGroup));
            row.append(makeElement("td", donor.city));
            row.append(makeElement("td", donor.status || "Sample only · availability unverified"));
            donorRows.append(row);
        });
        return matches.length;
    }

    function searchAvailability(){
        if(!form.reportValidity()){
            return;
        }
        const enteredCity = cityField.value.trim();
        const city = bloodBanks.find(function(bank){
            return bank.city.toLowerCase() === enteredCity.toLowerCase();
        })?.city || enteredCity;
        const bloodGroup = bloodGroupField.value;
        const bankCount = renderBloodBanks(city, bloodGroup);
        const donorCount = renderDonors(city, bloodGroup);
        status.textContent = `${bankCount} blood centre listing${bankCount === 1 ? "" : "s"} and ${donorCount} donor example${donorCount === 1 ? "" : "s"} for ${city} (${bloodGroup}).`;
    }

    form.addEventListener("submit", function(event){
        event.preventDefault();
        searchAvailability();
    });

    form.addEventListener("input", function(){
        if(bloodGroupField.value && cityField.value.trim()){
            searchAvailability();
        }
    });
    form.addEventListener("change", function(){
        if(bloodGroupField.value && cityField.value.trim()){
            searchAvailability();
        }
    });
});