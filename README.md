## Dialogium Readme ##

## Description ##

Dialogium is an applicatiobn built using the OpenAI GPT-3 natural language processing API, it allows users to generate, create, and build courses for self-directed learning of any topic of their choosing. The application has the ability to generate courses, add AI generated text to lessons in those courses, and allows users to add any Youtube video content of their choosint to those lessons. This may be a useful tool for anyone looking to learn a new skill on their own, and seeking help structuring and organizing their learning. 

This applicaiton was built using React for the front end with react-redux for managing state, and MUi for styling, it was built using ruby on rails for the backend, with special librariaes for calling API's and working with data from both youtube and OpenAI. 

To use this application, log in as a user, and ask the application to generate a course on any given topic in the "create a course" page, once the course is generated, add lessons, text content, and videos to your course to build your perfect learning plan. Alternatively, view and search courses that have been created by other users, and sign up to "take the course." 

See the instructions for initializing and using this project below, or see it live at: 

https://dialogium.onrender.com/

## Credits ##
Material UI:
https://mui.com/



**Initializing the database**
To initialize the database for Dialogium, you will need to run the following commands:

<rails db:create db:migrate>

This will create the necessary database tables and set up the schema.

**Seeding the database**

The database will be initialized empty for this application, as the application uses OpenAI to seed the database with new courses and lessons.

**Configuring the system**
To configure your system, you will need to set up the following:

Environment variables: You will need to set up any necessary environment variables, such as your Open AI key, which can be obtained by creating an account here: https://beta.openai.com/overview, and clicking on the "manage API keys" section in the top left user dropdown, as well as your Youtube API key, which can be found here: https://console.cloud.google.com/apis/credentials after creating a google developer account. 

**Dependencies:**
Make sure all necessary dependencies are installed by running bundle install with your Gemfile.

run the development server with the command 

<rails s>

You can start the react development server by running:

<npm start --prefix client>

Once you have completed these steps, you should be able to start your Rails server and begin using Dialogium.