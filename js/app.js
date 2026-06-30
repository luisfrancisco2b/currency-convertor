// Selecting DOM elements
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertBtn = document.getElementById("convert-btn");
const resultText = document.getElementById("result-text");

// Base URL for the currency exchange API
const baseUrl = "https://economia.awesomeapi.com.br/last/";

// Simple function to test the button click and element
convertBtn.addEventListener("click", () => {
  const amount = amountInput.value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  // Log to current values to the console
  console.log(
    `Testing click ! Amount:$ ${amount}, | From: ${from} | To: ${to}`,
  );

  // Tempory message on screen to confirm it works
  resultText.textContent = `Connecting... Converting ${amount} ${from} to ${to}!`;
});
