import axios from 'axios';

export const getDistrict = async () => {
	await axios
		.get('/req/data', {
			params: {
				key: process.env.NEXT_PUBLIC_VWORLD_API_KEY,
				request: 'getfeature',
				domain: process.env.NEXT_PUBLIC_BASE_URL,
				format: 'json',
				data: 'LT_C_ADSIDO_INFO',
				geomFilter:
					'BOX(13663271.680031825,3894007.9689600193,14817776.555251127,4688953.0631258525)',
				attribute: true,
				crs: 'EPSG:3857',
			},
		})
		.then(data => console.log(data));
};
