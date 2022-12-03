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

💡 *You can open your API testing platform and import the file called `The Leap.postman_collection.json` that I included in the repository to import the whole testing*

### *`/`*
After successfully logged in using your own account, you can go to `http://localhost:5500/` which is the home page by creating a `GET` request.   

💡 *The request will show the home page but only in a specific amount of time. After that, whenever users make a request to their home page, they have to login.*

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

### *`/api/chat/send`*
Open Postman and create a new `POST` request with the URL to be `http://localhost:5500/api/chat/send`. In the `Body` tab of the request, change it to raw typed and JSON. Add the following to the body:  
```json
{
    "from": "",
    "to":"",
    "message":"hello"
}
```
Enter username(s) for both `from` and `to` with the `message` of anything in order to send it. You can also leave one of those fields empty to see a different result.

### *`/api/chat/get?withUser=`*
Open Postman and create a new `GET` request with the URL to be `http://localhost:5500/api/chat/get?withUser=`. Enter the username for `withUser` in order to get all the chats between you and that user. You can leave it empty or type random username to see different result.  

### *`/api/tweet/create`*
Open Postman and create a new `POST` request with the URL to be `http://localhost:5500/api/tweet/create`. In the `Body` tab of the request, change it to raw typed and JSON. Add the following to the body:  
```json
{
    "user":"",
    "content":""
}
```
Enter username in the `user` field and content in the `content` field in order to create a new tweet with that `user`. Save the `id` that is returned to you in order to use it for other APIs. You can also leave those fields empty to see different result. 

### *`/api/tweet/create`*
Open Postman and create a new `POST` request with the URL to be `http://localhost:5500/api/tweet/create`. In the `Body` tab of the request, change it to raw typed and JSON. Add the following to the body:  
```json
{
    "user":"",
    "content":""
}
```
Enter username in the `user` field and content in the `content` field in order to create a new with that `user`. You can also leave those fields empty to see different result.

### *`/api/tweet/all`*
Open Postman and create a new `GET` request with the URL to be `http://localhost:5500/api/tweet/all`. You will be asked to log in in order to see all the tweets that you have created.

### *`/api/tweet/_id/:id`*
Open Postman and create a new `GET` request with the URL to be `http://localhost:5500/api/tweet/_id/:id`. Change the `:id` to the id of any tweet that you have created. You can refer to the `id` that you saved when you created a new tweet. You will be asked to log in in order to use this API.  

### *`/api/tweet/update`*
Open Postman and create a new `POST` request with the URL to be `http://localhost:5500/api/tweet/update/:id`. Change `:id` to any id of any tweet that have created. You can refer to the `id` that you saved when you created a new tweet.  In the `Body` tab of the request, change it to raw typed and JSON. Add the following to the body:  
```json
{
    "content":""
}
```
Change the `content` to anything that you want to update your tweet. You can also leave it empty to see different result.

### *`/api/tweet/delete/:id`*
Open Postman and create a new `POST` request with the URL to be `http://localhost:5500/api/tweet/delete/:id`. Change `:id` to any id of any tweet that have created. You can refer to the `id` that you saved when you created a new tweet. Hit "Send" to use this route. You can change `:id` to anything to see different result.  

# How to run unit tests
Before running unit test, make sure you have already complete step 1 and 2 of [How to run the appication](#how-to-run-the-application)  

To test `login` feature, run the following command:
```bash
npm run testLogin
```  
`register`
```bash
npm run testRegister
```  
`chat`
```bash
npm run testChat
```  
For the CRUD operation of the tweet, it's best that you unit test the delete method last because the other CREATE, READ and UPDATE are dependent on a hardcoded tweet ID.  

`createTweet`
```bash
npm run testCreateTweet
```  
`getAllTweets`
```bash
npm run testGetAllTweets
```  
`getTweetById`
```bash
npm run testGetTweetById
```  
`updateTweet`
```bash
npm run testUpdateTweet
```  
`deleteTweet`
```bash
npm run testDeleteTweet
```  