const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { inherits } = require("util");

const teamMembers = [];

// let teamName = "";

function managerInfo() {
  inquirer
    .prompt([
    //   {
    //     type: "input",
    //     name: "teamName",
    //     message: "Plese enter a name/title for your team.",
    //   },
      {
        type: "input",
        name: "managerName",
        message: "Please enter the name of the manager of this project.",
      },
      {
        type: "input",
        name: "managerID",
        message: "Enter the manager's EmployeeID",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "Please enter the manager's e-mail address.",
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "Please enter the manager's office number.",
      },
    ])
    .then((manager) => {
    //   teamName = manager.teamName;
      manager = new Manager(
        manager.managerName,
        manager.managerID,
        manager.managerEmail,
        manager.managerOfficeNumber
      );
      teamMembers.push(manager);
      newEmployee();
    });
}
function newEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "What is the next employee's role?",
        choices: ["Engineer", "Intern"],
      },
      {
        type: "input",
        name: "empName",
        message: "Please enter the employee's name.",
      },
      {
        type: "input",
        name: "empID",
        message: "Please enter the employee's EmployeeID.",
      },
      {
        type: "input",
        name: "empEmail",
        message: "Please enter the employee's e-mail address.",
        choices: ["Intern", "Engineer"],
      },
      {
        type: "input",
        name: "github",
        message: "Please enter the engineers's GitHub profile.",
        when: (userInput) => userInput.role === "Engineer",
      },
      {
        type: "input",
        name: "school",
        message: "Please enter the name of the Intern's school.",
        when: (userInput) => userInput.role === "Intern",
      },
    ])
    .then((employee) => {
      if (employee.role === "Intern") {
        teamMembers.push(
          new Intern(
            employee.empName,
            employee.empID,
            employee.empEmail,
            employee.school
          )
        );
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
      diffEmployee();
    });
}

function diffEmployee() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "nextEmp",
        message: "Enter information for another team member?",
      },
    ])
    .then((confirm) => {
      if (confirm.nextEmp) {
        newEmployee();
      } else {
        console.log(teamMembers);
        // render.employees = teamMembers;
        fs.existsSync(OUTPUT_DIR) || fs.mkdirSync(OUTPUT_DIR);
        fs.writeFileSync(outputPath, render(teamMembers), "utf8");
      }
    });
}

managerInfo();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
