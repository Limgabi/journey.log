import axios from 'axios';

export const useGetSearchKeywordAPI = async ({ x, y, keyword, page }: any) => {
	return await axios
		.get(`https://dapi.kakao.com/v2/local/search/keyword.json`, {
			headers: {
				Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_SEARCH_API_KEY}`,
			},
			params: {
				page: page,
				query: keyword,
				size: 15,
				sort: 'distance',
				x: x !== null && x !== undefined ? x : undefined,
				y: y !== null && y !== undefined ? y : undefined,
				radius: 1000,
			},
		})
		.then(({ data }) => data)
		.catch(err => err.response);
};
