const malesNames = [
    "kwasi",
    "Kwadwo",
    "Kwabena",
    "Kwaku",
    "Yaw",
    "Kofi",
    "Kwame"
];

const femaleNames = [
    "Akosua",
    "Adwoa",
    "Abenaa",
    "Akua",
    "Yaa",
    "Afua",
    "Ama"
];

const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Sunday"
];

// Retrieve the form

const form = document.getElementById("akan-form")


// Listen for submit button

form.addEventListener("submit",function (event){

    // prevent page refresh

    event.preventDefault();

    // Retrieve user input

    const day = Number(document.getElementById("day").value);
    const month = Number(document.getElementById("month").value);
    const year = document.getElementById("year").value;
    const gender = document.getElementById("gender").value;

    // Retrieve the result and history sections

    const resultContainer = document.getElementById("result-container");
    const historyContainer = document.getElementById("history-container");
    const emptyHistory = document.getElementById("empty-history");

    // Check if any field is empty

    if (!day || !month || !year || !gender){

        alert("Please fill in all the fields");

        return;
    }

    // Vlidate day

    if (day < 1 || day >31) {

        alert("Please eneter a valid day.");

        return;
    }

    // Validate month

    if (month <1 || month > 12) {
        
        alert("Please enter a valid month.");

        return;
    }

    // Validate the year

    if (year.length !== 4) {
        
        alert("Please enter a valid four-digit year.");

        return;
    }

    // Validate actual dates

    const date = new Date(year, month -1, day);

    if (
        date.getFullYear() != year ||
        date.getMonth() != month -1 ||
        date.getDate() != day 
    ) {
        
        alert("Please enter a valid date.");

        return;
    }

    // Obtain CC and YY

    const CC = Number(year.substring(0, 2));
    const YY = Number(year.substring(2));

    // Apply the formula

    let dayNumber = Math.floor(

        (
            ((CC /4) -(2 * CC) - 1) +
            ((5 * YY) / 4) +
            ((26 * (month +1)) / 10) + day

        ) % 7

    );

    // Prevent negative values

    if (dayNumber < 0) {
        
        dayNumber += 7;
    }

    // Determine the day of the week

    const dayOfWeek = weekDays[dayNumber];

    // Determine the Akan name

    let akanName;

    if (gender === "male") {
        
        akanName = malesNames[dayNumber];

    } else {
        
        akanName = femaleNames[dayNumber];
    }

    // Display the results

    resultContainer.innerHTML = `
    <h3>${akanName}<h3>
    
    <p><strong>Day born:</strong> ${dayOfWeek}<p>
    
    <p><strong>Gender:</strong> ${gender}<p>
    
    <p><strong>Date of Birth:</strong> ${day}/${month}/${year}<p>
    `;

    // Remove the empty history message

    emptyHistory.style.display = "none";

    // Add the result to the history section

    const historyCard = document.createElement("div");

    historyCard.classList.add("history-card");

    historyCard.innerHTML = `
    
    <h4>${akanName}</h4>
    
    <p><strong>Day Born:</strong> ${dayOfWeek}</p>
    
    <p><strong>Gender:</strong> ${gender}</p>
    
    <p><strong>Date of Birth:</strong> ${day}/${month}/${year}</p>
    `;

    historyContainer.appendChild(historyCard);

    // Clear the form

    document.getElementById("day").value = "";
    document.getElementById("month").value = "";
    document.getElementById("year").value = "";
    document.getElementById("gender").value = "";

    // scroll down

    const resultSection = document.getElementById("result");

    resultSection.scrollIntoView({
        behavior: "smooth"
    })
});
