document.addEventListener("DOMContentLoaded", function() {
    const searchBar = document.querySelector(".search-bar");
    const searchInput = searchBar.querySelector("input[type='text']");
    const voiceButton = searchBar.querySelector("#voice-search-button");

    // Function to handle speech recognition
    function startSpeechRecognition() {
        // Check if SpeechRecognition API is available
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'en-US';
            recognition.start();

            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                searchInput.value = transcript;
                console.log("Voice search activated. Search query:", transcript);

                // Check if the wake phrase is detected
                if (transcript.toLowerCase().includes("hi bank") || transcript.toLowerCase().includes("hello bank")) {
                    console.log("Hello Agile Bank! How can I assist you?");
                    // Speak out the response
                    speakOut("Hi, I'm Agile Bank, how can I assist you? You can ask me to operate the whole banking system architecture.");
                } else {
                    processVoiceCommand(transcript);
                }
            };

            recognition.onerror = function(event) {
                console.error("Speech recognition error:", event.error);
                // Fallback mechanism (e.g., display message as text)
                console.error('Speech recognition is not supported in this browser.');
            };
        } else {
            // Fallback mechanism (e.g., display message as text)
            console.error('Speech recognition is not supported in this browser.');
        }
    }

    // Function to handle speech synthesis
    function speakOut(message) {
        const speech = new SpeechSynthesisUtterance(message);
        speech.lang = 'en-US';

        if ('speechSynthesis' in window) {
            window.speechSynthesis.speak(speech);
        } else {
            // Fallback mechanism (e.g., display message as text)
            console.error('Speech synthesis is not supported in this browser.');
        }
    }

    // Function to process voice commands
    function processVoiceCommand(command) {
        if (command.toLowerCase().includes("back to home")) {
            window.location.href = "main.html";
        } else if (command.toLowerCase().includes("open my transactions")) {
            window.location.href = "Transction.html";
        } else if (command.toLowerCase().includes("transfer money")) {
            window.location.href = "Transfer.html";
        } else if (command.toLowerCase().includes("logout")) {
            window.location.href = "index.html";
        } else {
            speakOut("Sorry, I didn't understand that command.");
        }
    }

    voiceButton.addEventListener("click", function(event) {
        event.preventDefault();
        startSpeechRecognition();
        
        // Check if the voice command includes "turn off"
        const transcript = searchInput.value.toLowerCase();
        if (transcript.includes("turn off")) {
            document.body.classList.add("dark-mode");
            speakOut("Dark mode activated.");
        }
    });

    // Typing effect
    const typingText = document.getElementById("typing-text");
    const textToType = "Our bank embraces the agility and efficiency of DevOps, offering innovative banking solutions that are both reliable and user-friendly. Experience the difference with our streamlined services tailored for your convenience.";
    let index = 0;

    function typeText() {
        if (index < textToType.length) {
            typingText.textContent += textToType.charAt(index);
            index++;
            setTimeout(typeText, 50);
        }
    }

    typeText();

    // Dark mode functionality
    const darkModeButton = document.querySelector(".dark-mode-button");
    const darkModeDropdown = document.querySelector(".dark-mode-dropdown");

    darkModeButton.addEventListener("click", function(event) {
        event.stopPropagation();
        darkModeDropdown.classList.toggle("show");
        
        // Toggle dark mode class on body
        document.body.classList.toggle("dark-mode");
    });

    darkModeDropdown.addEventListener("click", function(event) {
        if (event.target.tagName === "A") {
            if (event.target.textContent === "Dark") {
                document.body.classList.add("dark-mode");
            } else {
                document.body.classList.remove("dark-mode");
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
});
