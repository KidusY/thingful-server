const express = require('express');

const usersRouter = express.Router();
const jsonBodyParser = express.json();
const { insertUser ,validatePassword, hasUserWithUserName, serializeUser, hashPassword } = require('./users-service');

usersRouter.post('/', jsonBodyParser, (req, res, next) => {
	const { password, userName, fullName, nickName } = req.body;
	for (const field of [ 'fullName', 'userName', 'password' ])
		if (!req.body[field])
			return res.status(400).json({
				error: `Missing '${field}' in request body`
			});

	const passwordError = validatePassword(password);
	if (passwordError) {
		return res.status(400).json({ error: passwordError });
	}
	hasUserWithUserName(req.app.get('db'), userName)
		.then((hasUserWithUserName) => {
			if (hasUserWithUserName) {
				return res.status(400).json({ error: `User Name already taken` });
			}

			return hashPassword(password).then((hashedPassword) => {
				const newUser = {
					user_name:userName,			
					password: hashedPassword,
					full_name:fullName,
					nickname:nickName					
				};

				return insertUser(req.app.get('db'), newUser).then((user) => {
					res.status(201).json(serializeUser(user));
				});
			});
		})
		.catch(next);
});

module.exports = usersRouter;
