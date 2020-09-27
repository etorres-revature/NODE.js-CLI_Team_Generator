// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
//uses require funciton to pull in Employee
const Employee = require("./Employee");

//creates Intern object with constructor information
function Intern(name, id, email, school) {
  //calls the super class and instantiates constructor variables - INHERITANCE
  Employee.call(this, name, id, email);
    //instantiates school variable
  this.school = school;
}

//uses the Object.create function to put the Employee prototype on the Intern prototype - INHERITANCE
Intern.prototype = Object.create(Employee.prototype);

//overwrites the Employee getRole function to be specific to Intern object - POLYMORPHISM
Intern.prototype.getRole = function () {
  return "Intern";
};

//adds the getSchool method to the Intern object protoype
Intern.prototype.getSchool = function () {
  return this.school;
};

//exports this module for use by other files
module.exports = Intern;
