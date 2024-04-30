document.addEventListener("DOMContentLoaded", function () {
  const darkModeButton = document.querySelector(".dark-mode-button");
  const darkModeDropdown = document.querySelector(".dark-mode-dropdown");

  darkModeButton.addEventListener("click", function (event) {
    event.stopPropagation();
    darkModeDropdown.classList.toggle("show");
    document.body.classList.toggle("dark-mode");
    document.body.style.backgroundColor = document.body.classList.contains(
      "dark-mode"
    )
      ? "#000"
      : "#eff2ec";
  });

  darkModeDropdown.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      if (event.target.textContent === "Dark") {
        document.body.classList.add("dark-mode");
        document.body.style.backgroundColor = "#000";
      } else {
        document.body.classList.remove("dark-mode");
        document.body.style.backgroundColor = "#eff2ec";
      }
    }
  });

  window.addEventListener("click", function (event) {
    if (!event.target.matches(".dark-mode-button")) {
      if (darkModeDropdown.classList.contains("show")) {
        darkModeDropdown.classList.remove("show");
      }
    }
  });

  const upiContainer = document.getElementById("container1");
  const creditCardContainer = document.getElementById("container2");
  const debitCardContainer = document.getElementById("container3");
  const netBankingContainer = document.getElementById("container4");
  const paymentDetailsContainer = document.getElementById("container5");

  const upiButton = document.getElementById("upi-button");
  const creditCardButton = document.getElementById("credit-card-button");
  const debitCardButton = document.getElementById("debit-card-button");
  const netBankingButton = document.getElementById("net-banking-button");

  upiButton.addEventListener("click", function () {
    hideAllContainers();
    upiContainer.classList.remove("hidden");
  });

  creditCardButton.addEventListener("click", function () {
    hideAllContainers();
    creditCardContainer.classList.remove("hidden");
  });

  debitCardButton.addEventListener("click", function () {
    hideAllContainers();
    debitCardContainer.classList.remove("hidden");
  });

  netBankingButton.addEventListener("click", function () {
    hideAllContainers();
    netBankingContainer.classList.remove("hidden");
  });

  function hideAllContainers() {
    upiContainer.classList.add("hidden");
    creditCardContainer.classList.add("hidden");
    debitCardContainer.classList.add("hidden");
    netBankingContainer.classList.add("hidden");
    paymentDetailsContainer.classList.add("hidden");
  }

  const generateTransactionButton = document.getElementById("paymentButton");

  generateTransactionButton.addEventListener("click", function (event) {
    generateTransactionDetails();
  });

  function generateTransactionDetails() {
    const amountInput = document.getElementById("amount").value;
    const transactionIdInput = document.getElementById("transaction-id");
    const datetimeInput = document.getElementById("datetime");

    // Generate a random transaction ID
    const transactionId = generateRandomTransactionId();
    transactionIdInput.value = transactionId;

    // Get the current date and time
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    datetimeInput.value = dateTimeString;

    // Retrieve the user ID from localStorage
    const userId = localStorage.getItem("userId");

    // Send payment details to the server
    const paymentData = {
      userId: userId,
      amount: amountInput,
      transactionId: transactionId,
      datetime: dateTimeString,
    };

    fetch("http://localhost:5000/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Payment details stored successfully");
          paymentDetailsContainer.classList.remove("hidden");
        } else {
          console.error(
            "Failed to store payment details:",
            response.statusText
          );
        }
      })
      .catch((error) => {
        console.error("Error storing payment details:", error);
      });
  }

  // Function to generate a random transaction ID (you can replace this with your own logic)
  function generateRandomTransactionId() {
    return Math.random().toString(36).substr(2, 9);
  }

  function generateRandomTransactionId() {
    // Generate a random 6-digit transaction ID
    return Math.floor(100000 + Math.random() * 900000);
  }

  window.addEventListener("resize", function () {
    const paymentOptions = document.querySelector(".payment-options");
    const paymentDetails = document.querySelector(".container:not(.hidden)");

    if (window.innerWidth <= 768) {
      paymentOptions.style.flexDirection = "column";
      paymentDetails.style.width = "100%";
    } else {
      paymentOptions.style.flexDirection = "row";
      paymentDetails.style.width = "";
    }
  });

  if (window.innerWidth <= 768) {
    const paymentOptions = document.querySelector(".payment-options");
    const paymentDetails = document.querySelector(".container:not(.hidden)");
    paymentOptions.style.flexDirection = "column";
    paymentDetails.style.width = "100%";
  }
});
