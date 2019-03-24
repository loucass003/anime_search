import axios from 'axios';

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
			}).then(({ data }) => data);
		}
	}
}