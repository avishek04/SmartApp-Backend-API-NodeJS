const handleProfileGet = (req, res, db) => {
	const { id } = req.params;
	db.select('*').from('users').where({
		id : id
	})
	.then(users => {
		if (users.length) {
			res.json(users[0]);
		} else {
			res.status(400).json('not found')
		}
	}).catch(error => res.status(400).json('error getting user'));
}

module.exports = {
	handleProfileGet: handleProfileGet
};