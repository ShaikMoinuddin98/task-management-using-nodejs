
# Task Management Using Nodejs,Express and MongoDB





## Installation

* Ensure that when you download the project files, you have all the required dependencies and configurations. For instance, check if there is a package.json file that lists project dependencies.
* install Node.js from the official website or a trusted source. Follow the instructions for your specific operating system.

* When you navigate to the project directory using the cd foldername command, make sure the "foldername" is the correct name of the directory where you placed your project files.
```bash
  cd foldername
```
* then install the necessary packages using npm
```bash
  npm install express mongoose path ejs
```
* Now you can run the index.js file using node
```bash
  node index.js
```
* after this the website will be live on your computer localhost server .you can access it by typing 'localhost:7000/' in your browser

    
## API Reference

#### Get The home Page

```http
  GET /
```

| Description                |
| :------------------------- |
| Displays the index page |

#### Add a new Task

```http
  POST /addtask
```

| Description                       |
| :-------------------------------- |
| adds a new task |

#### Update the Task info

```http
  POST /update
```

| Description                       |
| :-------------------------------- |
| Updates the task information |

#### Delete a Task

```http
  POST /delete?name=<taskname>
```

|Description|
| :-------------------------------- |
| deletes the task|





## Documentation


### Overview

The frontend of this website is developed using HTML, CSS, JavaScript, and Bootstrap and the Backend using Nodejs,Express and MongoDB. The main features include task management functionalities, allowing users to add, update, mark as completed, and delete tasks.

### Home Page

On the home page, you'll find a user-friendly interface with inputs for adding tasks. The form enforces required fields, ensuring that empty tasks cannot be added. All available tasks from the database are displayed on this page.

### Displaying Tasks

The available tasks list is fetched from database and it is passed as a array of objects during the rendering of the EJS file. Using Embedded JavaScript (EJS), a loop is employed to dynamically display each task on the home page.

### Adding Tasks

When you click on the "Add Task" button, a POST request is sent to `/addtask` along with the data entered in the form. In the backend, the data is added to the database.

### Updating Tasks

To update a task, click on the "Update" button associated with the task. This action converts the text fields into input fields, pre-filled with the existing values. The "Update" button is replaced by a "Save" button. Upon clicking "Save," the new values and the old task name are sent to the `/update` API using a POST request. The backend updates the data based on the old task name, and the "Save" button is replaced again by the "Update" button.

### Completion Status

Clicking the checkbox next to a task triggers a POST request to `/update` with the updated task status. Once a task is marked as completed, it becomes disabled, preventing further updates.

## Deleting Tasks

To delete a task, click on the "Delete" button associated with the task. A POST request is sent to `/delete` with the task name as a query parameter. The task is then removed from the database.




