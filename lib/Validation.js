const validEMail = require("email-validator");

function Validate(input) {
    this.input=input;
}

Validate.prototype.validateNull = (input) => {
    if (input === "") {
      return `You MUST enter something to continue.`;
    } else {
      return true;
    }
  };
  
  Validate.prototype.validateNullAndNumber = (input) => {
    // re = /^\d*$/;
    if (input === "") {
      return `You MUST enter something to continue.`;
    } else if (isNaN(input)) {
      return `You MUST enter a whole number value.`;
    } else {
      return true;
    }
  };
  
  Validate.prototype.validateEMail = (input) => {
    if (validEMail.validate(input)) {
      return true;
    } else {
      return `You MUST enter a valid e-mail address including the "@" symbol and a top-level domain (TLD; such as, ".com"; ".net"; ".edu"; etc.)`;
    }
  };
  
  Validate.prototype.validateConfirm = (input) => {
    if (input !== "y" || input !== "n") {
      return `Please input a 'y' or 'n' to continue`;
    } else {
      return true;
    }
  }

  module.exports = Validate;