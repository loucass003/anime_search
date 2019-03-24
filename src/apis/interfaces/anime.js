import { Interface, type } from 'implement-js'
import { ID } from './'

export default Interface('Anime')({
	id: type('object', ID),
	url: type('string'),
	image_url: type('string'),
	title: type('string'),
	synopsis: type('string'),
	episodes: type('number'),
	score: type('number'),
	start_date: type('string'),
	end_date: type('string')
})