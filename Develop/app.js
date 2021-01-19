const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const employees = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function initApp() {
    loadHtml();
    getTeamInfo();
}

const promptArray = [{
    type: "input",
    message: "What is your name?",
    name: "name"
}, {
    type: "input",
    message: "What is your ID?",
    name: "id"
}, {
    type: "input",
    message: "What is your email?",
    name: "email"
}, {
    type: "list",
    message: "What is your role",
    choices: ["Manager", "Engineer", "Intern"],
    name: "role"
}];

function getTeamInfo() {
    inquirer.prompt(promptArray)
        .then(function ({ name, role, id, email, roleInfo, moreMembers }) {

            let roleInfo = "";
            if (role === "Engineer") {
                roleInfo = "GitHub username";
            } else if (role === "Intern") {
                roleInfo = "school name";
            } else {
                roleInfo = "office phone number";
            }

            let newMember;
            if (role === "Engineer") {
                newMember = new Engineer(name, id, email, roleInfo);
            } else if (role === "Intern") {
                newMember = new Intern(name, id, email, roleInfo);
            } else {
                newMember = new Manager(name, id, email, roleInfo);
            }

            employees.push(newMember);
            addHtml(newMember)
                .then(function () {
                    if (moreMembers === "yes") {
                        getTeamInfo();
                    } else {
                        endHtml();
                    }
                });
        });
}

function loadHtml() {
 const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        

}

function endHtml() {
    const html = ` </div>
    </div>
    
</body>
</html>`;
    fs.appendFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("end");
}
initApp();
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