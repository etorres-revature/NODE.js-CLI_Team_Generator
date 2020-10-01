//using require to bring in the necessary objects
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Validate = require("./lib/Validation");
//using require to build necessary built-in and npm libraries
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//creating variables for the output folder and file
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//variable to require the htmlRenderer
const render = require("./lib/htmlRenderer");
const { inherits, isNull } = require("util");

//empty array to contain the team member objects (Manager/Engineer/Intern)
const teamMembers = [];
//variable to hold the Validate object
const validator = new Validate();

// let teamName = "";

//function to collect information re: manager (only one manager per team)
function managerInfo() {
  //call inquirer
  inquirer
    //async prompt
    .prompt([
      //   {
      //     type: "input",
      //     name: "teamName",
      //     message: "Plese enter a name/title for your team.",
      //   },
      //input manager name
      {
        type: "input",
        name: "managerName",
        message: "Please enter the name of the manager of this project.",
        //validate manager name is not empty
        validate: validator.validateNull,
      },
      //input manager ID
      {
        type: "input",
        name: "managerID",
        message: "Enter the manager's EmployeeID",
        //validate that manager name is not empty and is a number
        validate: validator.validateNullAndNumber,
      },
      //input manager e-mail
      {
        type: "input",
        name: "managerEmail",
        message: "Please enter the manager's e-mail address.",
        //validate manager e-mail (called in a library so this funcitonality is abstracted)
        validate: validator.validateEMail,
      },
      //input manager office number
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "Please enter the manager's office number.",
        //validate manager office number is not empty and is a number
        validate: validator.validateNullAndNumber,
      },
    ])
    //await to run the promise with the data entered above
    .then((manager) => {
      //   teamName = manager.teamName;
      //create a new Manager object and put in the appropriate information above into the constructor
      manager = new Manager(
        manager.managerName,
        manager.managerID,
        manager.managerEmail,
        manager.managerOfficeNumber
      );
      //push the information onto the empty array above to hold team members
      teamMembers.push(manager);
      //call function to collect new employee information
      newEmployee();
    });
}

//declare funciton to collect new employee information
function newEmployee() {
  //call the inquirer library
  inquirer
    //async prompt function
    .prompt([
      //find out from user whether they are entering an Engineer or an Intern
      {
        type: "list",
        name: "role",
        message: "What is the next employee's role?",
        choices: ["Engineer", "Intern"],
      },
      //get employee name
      {
        type: "input",
        name: "empName",
        message: "Please enter the employee's name.",
        //validate that field is not empty
        validate: validator.validateNull,
      },
      //get employee ID
      {
        type: "input",
        name: "empID",
        message: "Please enter the employee's EmployeeID.",
        //validate that field is not empty and that a number was entered
        validate: validator.validateNullAndNumber,
      },
      //get employee e-mail
      {
        type: "input",
        name: "empEmail",
        message: "Please enter the employee's e-mail address.",
        //validate that an e-mail address was entered in proper form
        validate: validator.validateEMail,
      },
      //enter the Engineer's github account
      {
        type: "input",
        name: "github",
        message: "Please enter the engineers's GitHub profile.",
        //make this prompt only run if "Engineer" was chosen from the first list prompt
        when: (userInput) => userInput.role === "Engineer",
        //validates that there is something input
        validate: validator.validateNull,
      },
      //enter the Intern's school
      {
        type: "input",
        name: "school",
        message: "Please enter the name of the Intern's school.",
        //make this prompt run if the "Intern" was chosen from the first list prompt
        when: (userInput) => userInput.role === "Intern",
        //validates that there is something input
        validate: validator.validateNull,
      },
    ])
    //await the promise with the data entered above about the employee
    .then((employee) => {
      //if the employee entered was an "Intern" create a new Intern object and push it to the array of team members
      if (employee.role === "Intern") {
        teamMembers.push(
          new Intern(
            employee.empName,
            employee.empID,
            employee.empEmail,
            employee.school
          )
        );
        //otherwise, if the employee entered was an "Engineer" create a new Engineer object and push it to the array of team members
      } else {
        teamMembers.push(
          new Engineer(
            employee.empName,
            employee.empID,
            employee.empEmail,
            employee.github
          )
        );
      }
      //run the function diffEmployee
      diffEmployee();
    });
}

//function to find out through user input if there is another employee to be entered.
function diffEmployee() {
  //call the inquirer library
  inquirer
  //async prompt function
    .prompt([
      //confirm through "y" or "n" if user wants to enter another employee
      {
        type: "confirm",
        name: "nextEmp",
        message: "Enter information for another team member?",
        //validate whether "y" or "n" entered
        validate: validator.validateConfirm,
      },
    ])
    //await promise with data from entry above
    .then((confirm) => {
      //if "y"/true run the newEmployee function to collect further information
      if (confirm.nextEmp) {
        newEmployee();
        //otherwise do this
      } else {
        //logs to the console the array of objects entered
        console.log(teamMembers);
        // render.employees = teamMembers;
        //looks for whether the output folder exists/if it does not creates the output folder
        fs.existsSync(OUTPUT_DIR) || fs.mkdirSync(OUTPUT_DIR);
        //does a write file with the htmlRenderer.js to create the team.html folder
        fs.writeFileSync(outputPath, render(teamMembers), "utf8");
      }
    });
}

//runs the managerInfo function and the program runs recursively until the user ends further inputs in the diffEmployee function
managerInfo();
