//use require function to pull in path and file system built-in NODE libraries
const path = require("path");
const fs = require("fs");

//variable to hold the directory for html templates
const templatesDir = path.resolve(__dirname, "../templates");

//render function
const render = employees => {
  //empty array to hold html from templates
  const html = [];

  //pushing the employees data from app.js onto the empty html array
  html.push(...employees
    //using higher order filter array function to go through html and and choose the entries whose role is Manager
    .filter(employee => employee.getRole() === "Manager")
    //using higher order map array function to run the renderManager function on the Manager object
    .map(manager => renderManager(manager))
  );
  //pushing the employees data from app.js onto the empty html array
  html.push(...employees
    //using higher order filter array function to go through html array and choose the entries whose role is Engineer
    .filter(employee => employee.getRole() === "Engineer")
    //using higher order map array function to run the renderEngineer function on the Engineer objects
    .map(engineer => renderEngineer(engineer))
  );
  //pushing the employees data from app.js onto the empty html array
  html.push(...employees
    //using higher order filter array funciton to go throuugh html array and choose the entries whose role is Intern
    .filter(employee => employee.getRole() === "Intern")
    //using higher order map array function to run the renderIntern function on the Intern objects
    .map(intern => renderIntern(intern))
  );

  //return the results of the renderMain and joins the html into a string
  return renderMain(html.join(""));

};

//render manager function takes in data about a Manager
const renderManager = manager => {
  //creates a template variable to hold the results of a read file on the html for the manager template utilizing the template that holds the html template directory above
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  //calling the replacePlaceholders function to replace the manager name html using the template variable, string for name, and getName from Manager prototype
  template = replacePlaceholders(template, "name", manager.getName());
    //calling the replacePlaceholders funciton to replace the manager role html using the template variable, string for role, and getRole from Manager prototype
  template = replacePlaceholders(template, "role", manager.getRole());
    //calling the replacePlaceholders function to replace the manager email html using the template variable, string for email, and getEmail from Manager prototype
  template = replacePlaceholders(template, "email", manager.getEmail());
    //calling the replacePlaceholders function to replace the manager id html using the template variable, string for id, and getId from Manager prototype
  template = replacePlaceholders(template, "id", manager.getId());
    //calling the replacePlaceholders function to replace the manager office number html using the template variable, string for officeNumber, and getOfficeNumber from Manager prototype
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  //returning the resulting html and putting it into the html array
  return template;
};

//render manager function takes in data about a Engineer
const renderEngineer = engineer => {
  //creates a template variable to hold the results of a read file on the html for the engineer template utilizing the template that holds the html template directory above
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  //calling the replacePlaceholders function to replace the engineer name html using the template variable, string for name, and getName from Engineer prototype
   template = replacePlaceholders(template, "name", engineer.getName());
 //calling the replacePlaceholders function to replace the engineer role html using the template variable, string for role, and getRole from Engineer prototype
  template = replacePlaceholders(template, "role", engineer.getRole());
  //calling the replacePlaceholders function to replace the engineer email html using the template variable, string for email, and getEmail from Engineer prototype
  template = replacePlaceholders(template, "email", engineer.getEmail());
  //calling the replacePlaceholders function to replace the engineer id html using the template variable, string for id, and getId from Engineer prototype
  template = replacePlaceholders(template, "id", engineer.getId());
  //calling the replacePlaceholders function to replace the engineer Github profile name html using the  template variable, string for github, and getGithub from Engineer rototype
  template = replacePlaceholders(template, "github", engineer.getGithub());
   //returning the resulting html and putting it into the html array
  return template;
};

//render manager function takes in data about a Intern
const renderIntern = intern => {
  //creates a template variable to hold the results of a read file on the html for the intern template utilizing the template that holds the html template directory above
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
    //calling the replacePlaceholders function to replace the intern name html using the template variable, string for name, and getName from Intern prototype
  template = replacePlaceholders(template, "name", intern.getName());
   //calling the replacePlaceholders function to replace the intern role html using the template variable, string for role, and getRole from Intern prototype
  template = replacePlaceholders(template, "role", intern.getRole());
    //calling the replacePlaceholders function to replace the manager email html using the template variable, string for email, and getEmail from Intern Prototype
  template = replacePlaceholders(template, "email", intern.getEmail());
  //calling the replacePlaceholders function to replace the manager id html using the template variable, string for id, and getId from Intern Prototype
  template = replacePlaceholders(template, "id", intern.getId());
  //calling the replacePlaceholders function to replace the intern school html using the template variable, string for school, and getSchool from Intern Prototype
  template = replacePlaceholders(template, "school", intern.getSchool());
   //returning the resulting html and putting it into the html array
  return template;
};

//renderMain function brings in html data
const renderMain = html => {
  //creates template variable with fs runciton to read file of main.html
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  //returns the template as a file neame team with html
  return replacePlaceholders(template, "team", html);
};

//replacePlaceHolders function takes in template, placeholder and value
const replacePlaceholders = (template, placeholder, value) => {
  //uses RegEx for the individual placeholders included in each (Manager/Engineer/Intern) html template
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  //returns template with the RegEx pattern and replaces it with the value passed in
  return template.replace(pattern, value);
};

//exports this module for use by other friles
module.exports = render;
