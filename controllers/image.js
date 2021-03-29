const clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '97d18246d4904f5b9916de2b4484f9a2'
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
			  .then(data => {
			  	res.json(data);
			  })
			  .catch(error => res.status(400).json('unable to work with API'))
} 
				  
const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(error => res.status(400).json('unable to get entries'));
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};