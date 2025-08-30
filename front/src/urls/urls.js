
export const apiUrl = 'http://localhost:3000';
export const urls = {
	car: {
    get: `${apiUrl}/api/cars`,
    save: `${apiUrl}/api/cars`
	},
	brand: {
    get: `${apiUrl}/api/brands`
	},
	model: {
    get: `${apiUrl}/api/models`
	},
	store: {
    get: `${apiUrl}/api/stores`
	}
}
