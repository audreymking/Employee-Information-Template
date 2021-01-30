//path for JS files with classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
//required path and fs
const path = require("path");
const fs = require("fs");

//to direct user input into output folder, team.htlm file
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//path for renderer and templates
const render = require("./lib/htmlRenderer");

//array for user input of employees
const employees = [];

//inquirer questions if user selects Manager
const managerQuestions = [
    {
        type: "input",
        name: "managerName",
        message: "What is the manager's full name?"
    },
    {
        type: "input",
        name: "managerId",
        message: "What is the manager's ID?"
    },
    {
        type: "input",
        name: "managerEmail",
        message: "What is the manager's email address?"
    },
    {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is the manager's office number?"
    }
];

//inquirer questions if user selects Intern
const internQuestions = [
    {
        type: "input",
        name: "internName",
        message: "What is the intern's full name?"
    },
    {
        type: "input",
        name: "internId",
        message: "What is the intern's ID?"
    },
    {
        type: "input",
        name: "internEmail",
        message: "What is the intern's email address?"
    },
    {
        type: "input",
        name: "internSchool",
        message: "Where does the intern go to school?"
    }
];

//inquirer questions if user selects Engineer
const engineerQuestions = [
    {
        type: "input",
        name: "engineerName",
        message: "What is the engineer's name?"
    },
    {
        type: "input",
        name: "engineerId",
        message: "What is the engineer's ID?"
    },
    {
        type: "input",
        name: "engineerEmail",
        message: "What is the engineer's email address?"
    },
    {
        type: "input",
        name: "engineerGithub",
        message: "What is the engineer's GitHub username?"
    }
];

const createManager = () => {
    inquirer.prompt(managerQuestions).then((answers) => {
        //this creates the Manager object
        const newManager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
        //pushes the Manager object to employees array
        employees.push(newManager);
        //asks the next set of questions
        addAnotherMember();
    });
}

const createIntern = () => {
    inquirer.prompt(internQuestions).then((answers) => {
        //creates the Intern object
        const newIntern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        //pushes the Intern object to employees array
        employees.push(newIntern);
        //asks the next set of questions
        addAnotherMember();
    });
}

const createEngineer = () => {
    inquirer.prompt(engineerQuestions).then((answers) => {
        //creates the Engineer object
        const newEngineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
        //pushes the Engineer object to employees array
        employees.push(newEngineer);
        //asks the next set of questions
        addAnotherMember();
    });
}

//provides employee selection
const addAnotherMember = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "employeeChoice",
            message: "What kind of employee do you wnat to add the the team?",
            choices: [ "Manager", "Engineer", "Intern", "No more please" ]
        }
    ]).then((answer) => {
        //this follows what the user selects- controls what function is used depending on what the user chooses.
        switch(answer.employeeChoice) {
            //if user selects Manager, createManager is executed
            case "Manager":
                createManager();
                break;
            //if user selects Engineer, createEngineer is executed
            case "Engineer":
                createEngineer();
                break;
            //if user selects Intern, createIntern is executed
            case "Intern":
                createIntern();
                break;
            default:
                //this generates the output html
                fs.writeFileSync(outputPath, render(employees), "utf-8");
        }
    });
}

createManager();
