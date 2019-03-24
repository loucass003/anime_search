import axios from 'axios';
import { Anime } from '../interfaces'
import implement from 'implement-js'

export default () => {
	const API_URL = "https://api.jikan.moe/v3/search/anime"
	return {
		search: ({ search, limit, page, sort }) => {
			return axios.get(API_URL, {
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
				end_date
			}) => implement(Anime)({
				id: { type: 'MAL', id: String(mal_id) },
				url, 
				image_url, 
				title, 
				synopsis, 
				episodes, 
				score,
				start_date,
				end_date
			})));
		}
	}
}