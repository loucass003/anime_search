import axios from 'axios';
import { Anime } from '../interfaces'
import implement from 'implement-js'

export default () => {
	const API_URL = "https://api.jikan.moe/v3";
	return {
		search: ({ search, limit, page, sort }) => {
			return axios.get(`${API_URL}/search/anime`, {
				params : {
					q: search,
					page,
					limit
				}
			}).then(({ data: { results } }) => results.map(({
				mal_id,
				url,
				image_url,
				title,
				synopsis,
				episodes,
				score,
				start_date,
				end_date,
				airing
			}) => {
				if (!end_date)
					end_date = airing ? 'Airing' : 'Not set';
				const data = {
					id: { type: 'mal', id: String(mal_id) },
					url,
					image_url,
					title,
					synopsis,
					episodes,
					score,
					start_date,
					end_date
				};
				return implement(Anime)(data);
			}));
		},
		get: ({ id }) => {
			return axios.get(`${API_URL}/anime/${id}`).then(({data}) => data);
		}
	}
}