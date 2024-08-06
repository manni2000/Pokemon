# Pokemon-App
Project Overview:
The Pokemon Full-Stack Application allows users to interact with a database of Pokémon, performing CRUD (Create, Read, Update, Delete) operations. The application is structured into a frontend and a backend, ensuring a clean separation of concerns and maintainability.<br><br>

# Technologies used:

**Frontend:**
- **React**: A JavaScript library for building user interfaces. It allows for the creation of reusable UI components.
- **React Router**: A standard library for routing in React. It enables navigation among different views of various components in a React application.
- **HTML/CSS**: Standard web technologies used for structuring and styling the web pages.
- **JavaScript**: The programming language used for client-side logic.

**Backend:**
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, used for server-side scripting.
- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Axios**: A promise-based HTTP client for the browser and Node.js used to make HTTP requests from the frontend to the backend.
- **Json-Server**: Used as a simple JSON file-based database to mock a RESTful API.

**Database:**
- The database is in JSON format, which is managed using Json-Server for ease of development and demonstration purposes.

**API:**
- The application utilizes the Pokémon Database API (pokeapi) to fetch Pokémon data.

# Functionalities
- **List Pokémon**: The main page displays a list of all Pokémon users in the database. Each entry shows the Pokémon owner's name, Pokémon name, and ability.
- **Add Pokémon**: A form allows users to add new Pokémon to the database by entering the necessary details like owner name, Pokémon name, ability, initial position, speed, and direction.
- **Edit Pokémon**: Users can update the details of existing Pokémon entries.
- **Delete Pokémon**: Users can delete individual Pokémon entries or clear the entire list.


# Steps to Run the Project
<b>1. Clone the Repository:</b><br>
<pre>
git clone https://github.com/manni2000/Pokemon.git
cd Pokemon
</pre>

<b>2. Install Dependencies:</b>   
<ul>
  <li><b>For Backend:</b><br>
    <pre>
cd backend
npm install
    </pre>
  </li>
  <li><b>For Frontend:</b><br>
    <pre>
cd ../frontend
npm install
    </pre>
  </li>
</ul>

<b>3. Start the Backend Server:</b>
<ul>
  <li><b>For Backend:</b><br>
    <pre>
cd backend
node server.js
# or
npm run dev
    </pre>
  </li>
  <li><b>For Frontend:</b><br>
    <pre>
cd ../frontend
npm start
    </pre>
  </li>
</ul>

<b>4. Access the Application:</b>
Open your browser and navigate to `http://localhost:3000`

<b>5. Deploy at Render cloud hositing website: </b>
https://pokemon-h9ur.onrender.com/

# Preview
![Pokemon](https://github.com/user-attachments/assets/32510099-412e-4174-83dd-be48cf0957b0)

![pokemondetails](https://github.com/user-attachments/assets/45bd609d-331d-486d-8c0c-932000b87905)

![Pokemon-Add_user](https://github.com/user-attachments/assets/0b62a293-d303-45ec-990c-42d3a9c554b7)

![Pokemon-list](https://github.com/user-attachments/assets/afad82eb-af25-41c7-8855-ebdb2b2386a0)

