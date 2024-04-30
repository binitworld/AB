document.addEventListener("DOMContentLoaded", function () {
    const darkModeDropdown = document.querySelector(".dark-mode-dropdown");

  // Event listener for toggling dark mode
    darkModeDropdown.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
    if (event.target.textContent === "Dark") {
        document.body.classList.add("dark-mode");
    } else {
    document.body.classList.remove("dark-mode");
    }
    }

    // Close dropdown if clicked outside
    const dropdowns = document.querySelectorAll(".dropdown-content");
    dropdowns.forEach((dropdown) => {
    if (
        dropdown.classList.contains("show") &&
        !event.target.matches(".dropdown-button")
    ) {
    dropdown.classList.remove("show");
    }
    });

    if (!event.target.matches(".dark-mode-button")) {
    if (darkModeDropdown.classList.contains("show")) {
        darkModeDropdown.classList.remove("show");
    }
    }
});

// for login 

const loginSubmitButton = document.getElementById('loginSubmitButton');
const loginForm = document.getElementById('loginForm');

// Event listener for clicking the submit button
loginSubmitButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    sendLoginData();
});

// Event listener for pressing Enter key
loginForm.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission behavior
        sendLoginData();
    }
});

function sendLoginData() {
    // Get email and password from the input fields
    const email = document.getElementById('loginEmailInput').value;
    const password = document.getElementById('loginPasswordInput').value;

    // Create an object to hold the login data
    const loginData = {
        email: email,
        password: password
    };

    // Send the login data to the backend
    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {

            localStorage.setItem('userId', data.userId);
            localStorage.setItem('name', data.user.name);
            localStorage.setItem('email', data.user.email);
            window.location.href = "main.html"; 
        } else {
            alert("Incorrect email or password. Please try again."); // Display error message
        }
    })
    .catch(error => {
        console.error('There was a problem logging in:', error);
        alert("An error occurred. Please try again."); // Display generic error message
    });
}



  // for sign up 

const signupSubmitButton = document.getElementById("signupSubmitButton");

signupSubmitButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Get input values
const name = document.getElementById("nameInput").value;
const email = document.getElementById("emailInput").value;
const password = document.getElementById("passwordInput").value;

  // Validate input (optional)

  // Create an object with form data
const formData = {
    name: name,
    email: email,
    password: password,
};

  // Call a function to send the form data to the backend
sendDataToBackend(formData);
});

function sendDataToBackend(formData) {
  // Send form data to the backend using Fetch API or XMLHttpRequest
  // Example:
fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        window.location.href = "index.html";
    } else {
        alert(data.error); // Display error message
    }
})
.catch(error => {
    console.error('There was a problem signing up:', error);
      alert("An error occurred. Please try again."); // Display generic error message
});
}

});
