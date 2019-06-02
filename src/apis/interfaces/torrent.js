import { Interface, type } from 'implement-js'
import { ID } from './'

export default Interface('Torrent')({
	id: type('object', ID),
	url: type('string'),
	magnet: type('string'),
	name: type('string'),
	synopsis: type('string')
})