


<h1 align="center"> Whatsapp chatbotapp</h1>

**This Chatbot** is a microservice implemented to provide customer support to users via WhatsApp chat. 
It is implemented using Node.js,express.js, and MongoDB. It is a rules-based service where all the questions and the following options are pre-configured in the DB, if the user is looking for a query that isn't there in the configured questions
he can type the query which will be passed as a prompt to the chatbot.

Integrated WhatsApp using Twilio, and for rules configuration rule engine has been used.

## Steps to Setup the Repo 📜

1. Create an account in Twilio, and get the auth key for Twilio
2. Create an account in Chatgpt, and get the auth key for Chatgpt
3. Configure all your auth keys and db URI in .env file
4. Install Node and NPM
5. in the repo to install all the required libs, **run npm i**
6. finally, to run the service, use **npm run dev**
