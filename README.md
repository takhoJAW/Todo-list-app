# Todolist Website

A simple Todo List web application built with **Node.js**, **Express**, **PostgreSQL**, and **EJS**. Easily manage your daily and monthly tasks with a clean interface and persistent storage.

## Features

- Add, edit, complete, and delete daily tasks
- Monthly tasks management on a separate page
- Task completion toggling
- Responsive and user-friendly UI
- Data stored in PostgreSQL for persistence


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/takhoJAW/Todo-list-app/tree/main
   cd todolist-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL:**
   - Create a database named `Permalist`.
   - Create the following tables:
     ```sql
     CREATE TABLE items (
       id SERIAL PRIMARY KEY,
       title TEXT NOT NULL,
       completed BOOLEAN DEFAULT FALSE
     );

     CREATE TABLE monthlyitems (
       id SERIAL PRIMARY KEY,
       title TEXT NOT NULL,
       complete BOOLEAN DEFAULT FALSE
     );
     ```
   - Update the database credentials in `index.js` if needed.

4. **Start the server:**
   ```bash
   npm start
   ```
   or
   ```bash
   node index.js
   ```

5. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## Deployment

---

## Folder Structure

```
/views         # EJS templates
/public        # Static assets (CSS, JS, images)
index.js       # Main server file
.gitignore
README.md
```
