#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

console.log(chalk.white("\n \t<<==="),chalk.blue.bold("WELCOME TO THE TODO-LIST"),chalk.white("===>>\n"));

let todos: string[] = [];
let condition = true;

let mainFunction = async () => {
  while (condition) {
    let option = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: chalk.yellow.italic("\nSelect an option you want to do : \n"),
        choices: [
          "Add Task",
          "Delete Task",
          "Update Task",
          "View Todo-List",
          "Exit",
        ],
      },
    ]);
    if (option.choice === "Add Task") {
      await addTask();
    } else if (option.choice === "Delete Task") {
      await deleteTask();
    } else if (option.choice === "Update Task") {
      await updateTask();
    } else if (option.choice === "View Todo-List") {
      await viewTask();
    } else if (option.choice === "Exit") {
      condition = false;
      console.log(chalk.red.bold("THANK YOU FOR USING TODO-LIST"));
      
    }
  }
};

let addTask = async () => {
  let newTask = await inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: chalk.yellow.italic("\nEnter your new task : \n"),
    },
  ]);
  todos.push(newTask.task);
  console.log(chalk.cyan(`\n ${newTask.task} Task added successfully in Todo-List`));
};

let viewTask = () => {
  console.log(chalk.cyan(`\n Your Todo-List: \n`));
  todos.forEach((task, index) => {
    console.log(chalk.cyan(`${index}: ${task}`));
  });
};

let deleteTask = async () => {
  await viewTask();
  let taskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.yellow.italic("\nEnter the index number of the task you want to delete : \n"),
    },
  ]);
  let deletedTask = todos.splice(taskIndex.index, 1);
  console.log(chalk.cyan(
    `\n ${deletedTask} This task is has been deleted successfully from your Todo-List\n`)
  );
};

let updateTask = async () => {
  await viewTask();
  let update_task_index = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.yellow.italic("\nEnter the index number of the task you want to update : \n"),
    },
    {
      name: "newTask",
      type: "input",
      message: chalk.yellow.italic("\nEnter new task name : \n"),
    },
  ]);
  todos[update_task_index.index] = update_task_index.newTask;
  console.log(chalk.cyan(
    `\n Task at index number ${update_task_index.index} updated successfully [For updated list check option: "View Todo-List"] \n`
  ));
};

mainFunction();
