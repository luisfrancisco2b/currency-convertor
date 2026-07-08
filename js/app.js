// Selecting DOM elements
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertBtn = document.getElementById("convert-btn");
const resultText = document.getElementById("result-text");

// Simple object width map of currency codes to their respective symbols
const currencySymbols = {
  BRL: "R$",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

// Base URL for the currency exchange API
const baseUrl = "https://economia.awesomeapi.com.br/last/";

// Function to fetch exchange rate and calculate conversion
async function convertCurrency() {
  const amount = amountInput.value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  // Validation to check if the user entered a value
  if (!amount || amount <= 0) {
    resultText.innerText = "Por favor, insira um valor válido!";
    return;
  }

  // Validation to check if the currencies are the same
  if (from === to) {
    resultText.innerText = "Por favor, selecione moadas diferentes!";
    return;
  }

  resultText.innerText = "Buscando taxas de câmbio... ";

  try {
    // Constructuring the dynamic URL. For example: USD -> BRL
    const response = await fetch(`${baseUrl}${from}-${to}`);

    // Checking if there was a response from API
    if (!response.ok) {
      throw new Error("Moeadas não suportadas pela API!");
    }

    // Transforming the response in JSON
    const data = await response.json();

    // Creating the dynamic key. For example: "USDBRL"
    const currencyPair = `${from}${to}`;

    // Extracting the bid (exchange rate) from the response
    const exchangeRate = data[currencyPair].bid;

    // Converting the exchange rate strinh into a decimal number
    const rateAsNumber = parseFloat(exchangeRate);

    // Calculating the final converted value
    const convertedAmount = amount * rateAsNumber;

    // Formating the final value to show only 2 decimal places
    const formattedResult = convertedAmount.toFixed(2);

    // Get the correct symbol
    const fromSymbol = currencySymbols[from] || from;
    const toSymbol = currencySymbols[to] || to;

    // Display the final result to the user
    resultText.innerText = ` ${fromSymbol} ${amount} = ${toSymbol} ${formattedResult}`;
  } catch (error) {
    console.error("Erro ao buscar dados: ", error);
    resultText.innerText =
      "Erro ao buscar dados na API! Tente novamente mais tarde.";
  }
}
// Listening to the button click event
convertBtn.addEventListener("click", convertCurrency);
