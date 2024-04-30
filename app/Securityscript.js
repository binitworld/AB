document.addEventListener("DOMContentLoaded", function() {
    // Dark mode functionality
    const darkModeButton = document.querySelector(".dark-mode-button");
    const darkModeDropdown = document.querySelector(".dark-mode-dropdown");

    darkModeButton.addEventListener("click", function(event) {
        event.stopPropagation();
        darkModeDropdown.classList.toggle("show");
        
        // Toggle dark mode class on body
        document.body.classList.toggle("dark-mode");

        // Toggle background color based on dark mode
        if (document.body.classList.contains("dark-mode")) {
            document.body.style.backgroundColor = "#000"; // Set background color to black
        } else {
            document.body.style.backgroundColor = "#eff2ec"; // Set background color to original color
        }
    });

    darkModeDropdown.addEventListener("click", function(event) {
        if (event.target.tagName === "A") {
            if (event.target.textContent === "Dark") {
                document.body.classList.add("dark-mode");
                document.body.style.backgroundColor = "#000"; // Set background color to black
            } else {
                document.body.classList.remove("dark-mode");
                document.body.style.backgroundColor = "#eff2ec"; // Set background color to original color
            }
        }
    });

    // Close dropdowns when clicking outside
    window.addEventListener("click", function(event) {
        if (!event.target.matches(".dark-mode-button")) {
            if (darkModeDropdown.classList.contains("show")) {
                darkModeDropdown.classList.remove("show");
            }
        }
    });

    // Feedback form functionality
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackButton = document.getElementById('feedback-button');

    feedbackButton.addEventListener('click', function() {
        feedbackForm.style.display = feedbackForm.style.display === 'none' ? 'block' : 'none';
    });

    // Event listener for form submission
    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission behavior
        sendFeedback(); // Call function to send feedback data
    });

    function sendFeedback() {
        const name = document.getElementById('name').value;
        const bankId = document.getElementById('bank-id').value;
        const email = document.getElementById('email').value;
        const cifNo = document.getElementById('cif-no').value;
        const issueDescription = document.getElementById('issue-description').value;

        // Create an object to hold the form data
        const feedbackData = {
            name: name,
            bankId: bankId,
            email: email,
            cifNo: cifNo,
            issueDescription: issueDescription
        };

        // Send the feedback data to the backend
        fetch('http://localhost:5000/Security', { // Corrected endpoint URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedbackData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Your feedback has been submitted successfully."); // Display success message
            } else {
                alert("An error occurred. Please try again."); // Display error message
            }
        })
        .catch(error => {
            console.error('There was a problem submitting feedback:', error);
            alert("An error occurred. Please try again."); // Display generic error message
        });
    }

    // Responsive behavior
    window.addEventListener("resize", function() {
        if (window.innerWidth <= 768) {
            feedbackForm.style.display = 'none'; // Hide feedback form on smaller screens
        } else {
            feedbackForm.style.display = 'block'; // Show feedback form on larger screens
        }
    });
});