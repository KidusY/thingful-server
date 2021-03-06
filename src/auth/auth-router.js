const express = require('express');
const AuthService = require('./auth_service');

const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter.post('/login', jsonBodyParser, (req, res, next) => {
	const { userName, password } = req.body;
	const loginUser = { userName, password };

	for (const [ key, value ] of Object.entries(loginUser))
		if (value == null)
			return res.status(400).json({
				error: `Missing '${key}' in request body`
			});

	AuthService.getUserWithUserName(req.app.get('db'), loginUser.userName)
		.then((dbUser) => {
			if (!dbUser)
				return res.status(400).json({
					error: 'Incorrect User Name or Password'
				});
			return AuthService.comparePasswords(loginUser.password, dbUser.password).then((compareMatch) => {
				if (!compareMatch) {
					return res.status(400).json({
						error: 'Incorrect user_name or password'
					});
				}
				const sub = dbUser.user_name;
				const payload = { user_id: dbUser.id };
				res.send({
					authToken: AuthService.createJwt(sub, payload)
				});
			});
		})
		.catch(next);
});

module.exports = authRouter;
