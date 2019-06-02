import axios from 'axios';
import { Torrent } from '../interfaces'
import implement from 'implement-js'

export default () => {
	const API_URL = "https://nyaa.pantsu.cat/api/search/"
	return {
		search: ({ search, limit, page, sort }) => {
			return axios.get(`https://cors-anywhere.herokuapp.com/${API_URL}`, {
				params : {
					q: search,
					limit,
					page,
					sort,
				}
			}).then(({ data: { torrents } }) => torrents.map(({
				id,
				torrent: url,
				magnet,
				name,
				description: synopsis
			}) => {
				const data = {
					id: { type: 'nyaa', id: String(id) },
					url,
					magnet,
					name,
					synopsis
				};
				return implement(Torrent)(data);
			}));
		}
	}
}