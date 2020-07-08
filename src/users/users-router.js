const express = require('express');

const usersRouter = express.Router();
const jsonBodyParser = express.json();
const { validatePassword,hasUserWithUserName } = require('./users-service');

usersRouter.post('/', jsonBodyParser, (req, res, next) => {
	const { password, userName,fullName,nickName } = req.body;
	for (const field of [ 'fullName', 'userName', 'password' ])
		if (!req.body[field])
			return res.status(400).json({
				error: `Missing '${field}' in request body`
			});

	const passwordError = validatePassword(password);
	if (passwordError) {
		return res.status(400).json({ error: passwordError });
	}
	hasUserWithUserName(req.app.get('db'),userName)
	.then(hasUserWithUserName =>{
		if(hasUserWithUserName){
			return res.status(400).json({error:`User Name already taken`})
		}
	})


});

module.exports = usersRouter;
