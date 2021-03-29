const saltRounds = 10;

const handleRegister = (req, res, db, bcrypt) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return res.status(400).json('incorrect form submission');
	}
	const hash = bcrypt.hashSync(password, saltRounds);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		}).into('login')
		  .returning('email')
		  .then(loginEmail => {
		  	return trx('users')
		  	.returning('*')
		  	.insert({
		  		name: name,
		  		email: email,
		  		joined: new Date()
		  	})
		  	.then(users => {
		  		res.json(users[0]);
		  	})
		  })
		  .then(trx.commit)
		  .catch(trx.rollback)
	})
	.catch(error => res.status(400).json('unable to register'));
}

module.exports = {
	handleRegister: handleRegister
};