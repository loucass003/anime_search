import modules from './modules'

// API({ select : ['nyaa'] }).search(params);
const ERROR = Symbol('Error')

console.log(modules);
export default (options) => {
	const self = {
		call: (fn, params) => {
			const mods = Object.keys(modules)
				.filter(m => options.select && options.select.includes(m))
				.map(m => {
					const module = modules[m]()
					return module[fn] 
						? Promise.resolve(module[fn](params)) 
						: Promise.reject()
				}).map(m => m.catch(() => ERROR))
			return Promise.all(mods)
				.then(ps => ps.filter(p => p != ERROR))
		},
		search: (params = {search: '', limit: 50, page: 0, sort: 'id'}) => self.call('search', params)
	};
	return self;
}