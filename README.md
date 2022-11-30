# Requirement
In order to run the project, your computer needs to have these packages and environment installed and configured:
- [NodeJS](https://choosealicense.com/licenses/mit/) (version 14.5.3 and up)
- npm (version 6.14.9)
- [git](https://git-scm.com/downloads)

# How to run the application
First, you need to clone the project to your local machine

```bash
git clone https://github.com/NamDo8467/TheLeap.git
``` 

After successfully cloning the project, run the following commands to install all dependencies :

```bash
npm install
```

Run the command below command to start the project in development mode:
```bash
npm run dev
```

# API
You may use any API testing platform but this document will show you how to do it with Postman. The user interface might be different but the technical aspects of working with this project's API are the same across platforms.

### *`/api/register`*

Open Postman and create a new `POST` request with the URL to be `http://localhost:5500/api/register`. In the `Body` tab of the request, change it to raw typed and JSON. Add the following to the body:  
```json
{
   "username": "",
   "password": ""
}
```
whereas the values of `username` and `password` are your own choices. Then click **Send** to make the request to the server.
💡   *You can try to leave either of those fields empty*        
### *`/api/login`*  
After you created your own account, create a new `POST` request with the URL to be `http://localhost:5500/api/login`. In the `Body` tab of the of the request, change it to raw typed and JSON. Change those fields below to the `username` and `password` that you have just created:
```json
{
   "username": "",
   "password": ""
}
```
💡   *You can also leave either of those fields empty to see the result* 

### *`/`*
After successfully logged in using your own account, you can go to `http://localhost:5500/` which is the home page by creating a `GET` request.   

💡 *The request will show the home page but only in a specific amount of time. After that, whenever users make a request to their home page, they have to login.*
# How to run unit tests
Before running unit test, make sure you have already complete step 1 and 2 of [How to run the appication](#how-to-run-the-application)
To test these 2 APIs, run the following command: 
```bash
npm test
```  
You can also test those 2 methods one by one by doing:
```bash
npm run testLogin
```  
and
```bash
npm run testRegister
```  