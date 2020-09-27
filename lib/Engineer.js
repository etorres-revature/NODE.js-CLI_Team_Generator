// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
//uses require funciton to pull in Employee
const Employee = require("./Employee");

//creates Engineer object with constructor information
function Engineer(name, id, email, github) {
    //calls the super class and instantiates constructor variables - INHERITANCE
  Employee.call(this, name, id, email);
  //instantiates github variable
  this.github = github;
}

//uses the Object.create function to put the Employee prototype on the Engineer prototype - INHERITANCE
Engineer.prototype = Object.create(Employee.prototype);

//overwrites the Employee getRole function to be specific to Engineer object - POLYMORPHISM
Engineer.prototype.getRole = function () {
  return "Engineer";
};

//adds the getGithub method to the Engineer object protoype
Engineer.prototype.getGithub = function () {
  return this.github;
};

//exports this module for use by other files
module.exports = Engineer;
