//uses require function to bring in Validation 
const Validate = require("../lib/Validation");

//test for validateNull function
describe("validateNull", () => {
  //tests for validation function for when an empty string is entered into prompt
  it("validates for a null value entry", () => {
    const v = new Validate();
    const methodReturn = `You MUST enter something to continue.`;
    const result = v.validateNull("");

    expect(result).toEqual(methodReturn);
  });
});

//test function for validateNullAndNumber
describe("validateNullANumber", () => {
  //texts for validation function for when an empty string is entered into prompt
  it("validates for a null value entry", () => {
    const v = new Validate();
    const methodReturn = `You MUST enter something to continue.`;
    const result = v.validateNullAndNumber("");

    expect(result).toEqual(methodReturn);
  });

  //tests for validation function for when a letter is entered into the prompt
  it("validates that the entry is a number", () => {
    const v = new Validate();
    const methodReturn = `You MUST enter a whole number value.`;
    const result = v.validateNullAndNumber("asdf");

    expect(result).toEqual(methodReturn);
  });
});

//text function for validateEmail
describe("validateEMail", () => {
//tests for what happens when anything not matching an expected value for an e-mail
  it("validates that an E-mail with '@' and '.com' were entered", () => {
    const v = new Validate();
    const methodReturn = `You MUST enter a valid e-mail address including the "@" symbol and a top-level domain (TLD; such as, ".com"; ".net"; ".edu"; etc.)`;
    const result = v.validateEMail("etorresnotary");

    expect(result).toEqual(methodReturn);
  });
});

//text function for validateConfirm
describe("validateConfirm", () => {
  //tests for what happens when something other than the letter "y" or the letter "n" is entered
  it("detects whether it is 'y' or 'n' that was entered", () => {
    const v = new Validate();
    const methodReturn = `Please input a 'y' or 'n' to continue`;
    const result = v.validateConfirm("");

    expect(result).toEqual(methodReturn);
  });
});
