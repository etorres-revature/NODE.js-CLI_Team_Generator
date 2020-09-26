const Validate = require("../lib/Validation");

describe("validateNull", () => {
  it("validates for a null value entry", () => {
    const v = new Validate();
    const methodReturn = `You MUST enter something to continue.`;
    const result = v.validateNull("");

    expect(result).toEqual(methodReturn);
  });
});

describe("validateNullANumber", () => {
  it("validates for a null value entry", () => {
    const v = new Validate();
    const methodReturn = `You MUST enter something to continue.`;
    const result = v.validateNullAndNumber("");

    expect(result).toEqual(methodReturn);
  });

  it("validates that the entry is a number", () => {
    const v = new Validate();
    const methodReturn = `You MUST enter a whole number value.`;
    const result = v.validateNullAndNumber("asdf");

    expect(result).toEqual(methodReturn);
  });
});

describe("validateEMail", () => {
  it("validates that an E-mail with '@' and '.com' were entered", () => {
    const v = new Validate();
    const methodReturn = `You MUST enter a valid e-mail address including the "@" symbol and a top-level domain (TLD; such as, ".com"; ".net"; ".edu"; etc.)`;
    const result = v.validateEMail("etorresnotary");

    expect(result).toEqual(methodReturn);
  });
});

describe("validateConfirm", () => {
  it("detects whether it is 'y' or 'n' that was entered", () => {
    const v = new Validate();
    const methodReturn = `Please input a 'y' or 'n' to continue`;
    const result = v.validateConfirm("");

    expect(result).toEqual(methodReturn);
  });
});
