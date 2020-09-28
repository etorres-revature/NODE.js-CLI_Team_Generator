//uses require function to pull in npm library - ABSTRACTION
const validEMail = require("email-validator");

//creates the Validate object with constructor
function Validate(input) {
  //instantiates input variable
    this.input=input;
}

//function to validate null values
Validate.prototype.validateNull = (input) => {
  //if an empty string is entered
    if (input === "") {
      //return this message
      return `You MUST enter something to continue.`;
    } else {
      return true;
    }
  };

  //function to validate null values AND letters
  Validate.prototype.validateNullAndNumber = (input) => {
    // re = /^\d*$/;
    //if an empty string is entered
    if (input === "") {
      //return this message
      return `You MUST enter something to continue.`;
      //or if something that is not a number is entered
    } else if (isNaN(input)) {
      //return this message
      return `You MUST enter a whole number value.`;
    } else {
      return true;
    }
  };
  
  //function to validate e-mail entries
  Validate.prototype.validateEMail = (input) => {
    //using the library required above check that whatever is input is a valid e-mail address - ABSTRACTION
    if (validEMail.validate(input)) {
      //if the email address is valid return "true" and continue
      return true;
    } else {
      //if the email address is invalid return this message
      return `You MUST enter a valid e-mail address including the "@" symbol and a top-level domain (TLD; such as, ".com"; ".net"; ".edu"; etc.)`;
    }
  };
  
  //validates the confirm entry
  Validate.prototype.validateConfirm = (input) => {
    //if input does not equal "y" or "n
    if (input !== "y" || input !== "n") {
      //return this phrase
      return `Please input a 'y' or 'n' to continue`;
    } else {
      //otherwise, return "true" and contineu
      return true;
    }
  }

  //exports this module for use by other files
  module.exports = Validate;