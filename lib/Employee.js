// TODO: Write code to define and export the Employee class
//creates the Employee object with the constructor information
function Employee(name, id, email) {
  //instantiates the values from the constructor in the object
  this.name = name;
  this.id = id;
  this.email = email;
}

//creates a getName function on the Employee prototype that returns the Employee object name
Employee.prototype.getName = function () {
  return this.name;
};

//creates a getId function on the Employee prototype that returns the Employee object id
Employee.prototype.getId = function () {
  return this.id;
};

//creates a getEmail function on the Employee prototype that returns the Employee object email
Employee.prototype.getEmail = function () {
  return this.email;
};

//creates a getRole function on the Employee prototype that returns the Employee object role
Employee.prototype.getRole = function () {
  return "Employee";
};

//exports this module for use by other files
module.exports = Employee;
