// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
//uses require funciton to pull in Employee
const Employee = require("./Employee");

//creates Manager object with constructor information
function Manager(name, id, email, officeNumber) {
  //calls the super class and instantiates constructor variables - INHERITANCE
  Employee.call(this, name, id, email);
  //instantiates officeNumber variable
  this.officeNumber = officeNumber;
}

//uses the Object.create function to put the Employee prototype on the Manager prototype - INHERITANCE
Manager.prototype = Object.create(Employee.prototype);

//overwrites the Employee getRole function to be specific to Manager object - POLYMORPHISM
Manager.prototype.getRole = function () {
  return "Manager";
};

//adds the getOfficeNumber method to the Manager object protoype
Manager.prototype.getOfficeNumber = function () {
  return this.officeNumber;
};

//exports this module for use by other files
module.exports = Manager;
