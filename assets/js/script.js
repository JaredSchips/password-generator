// Reset the password on page reload
var passwordText = document.querySelector("#password");
passwordText.value = ""

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Writes password to the #password input
function writePassword() {
  var password = generatePassword();
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Characters for the generated password will be selected from here
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = lowercase.toUpperCase();
const numeric = "0123456789";
const special = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

// Will be used in order to check if the user inputed a specific setting
const lowercaseRegex = /\b((?:lowercase)|l)\b/i;
const uppercaseRegex = /\b((?:uppercase)|u)\b/i;
const numericRegex = /\b((?:numeric)|n)\b/i;
const specialRegex = /\b((?:special)|s)\b/i;

// Called on button click
function generatePassword() {
  // Ask for the length of the password. Loops when given invalid input
  do {
    // Keeps track of whether to loop the do-while loop
    var tryAgain = false

    var passwordLength = window.prompt("How long should your password be? (must be 8-128 characters)");

    // If the password does not contain one number written as one "word"
    if (passwordLength.match(/^\s*?\b[0-9]+\b\s*?$/) === null) {
        window.alert("Invalid input!")
        tryAgain = true
        continue
      }
    
    if (parseInt(passwordLength) < 8) {
      window.alert("Password must be at least 8 characters long!")
      tryAgain = true
      continue
    }

    if (parseInt(passwordLength) > 128) {
      window.alert("Password cannot be greater than 128 characters long!")
      tryAgain = true
      continue
    }
  } while (tryAgain === true)

  // Ask for the character types to be included. Loops when given invalid input
  do {
    var tryAgain = false

    var passwordCharTypes = window.prompt("Please list each character type you would like included in your password, followed by a space:\n(L)owercase, (U)ppercase, (N)umeric, (S)pecial");
    
    // If the input is empty or whitespace
    if (passwordCharTypes === "" || passwordCharTypes.match(/^\s*?$/)) {
      window.alert("You must include at least one type of character!")
      tryAgain = true
      continue
    }

    // Check which settings the user included
    var includeLowercase = ( passwordCharTypes.match(lowercaseRegex) !== null );
    var includeUppercase = ( passwordCharTypes.match(uppercaseRegex) !== null );
    var includeNumeric = ( passwordCharTypes.match(numericRegex) !== null );
    var includeSpecial = ( passwordCharTypes.match(specialRegex) !== null );

    // Create charList, a string with all of the possible characters which match the settings
    var charList = ""
    if (includeLowercase) {charList += lowercase}
    if (includeUppercase) {charList += uppercase}
    if (includeNumeric) {charList += numeric}
    if (includeSpecial) {charList += special}
    
    // If the user input isn't whitespace, but also didn't include any of the settings
    if (charList === "") {
      window.alert("Invalid input!")
      tryAgain = true
      continue
    }
  } while (tryAgain === true)

  // Initialize password
  var password = "";

  // push [passwordLength] random elements onto [password]
  for (let index = 0; index < passwordLength; index++) {
    charIndex = Math.floor(Math.random() * charList.length);
    password += charList[charIndex];
  }
  
  return password;
}