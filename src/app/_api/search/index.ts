import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetDistrict = (params?: { data: string; attrFilter?: string }) => {
	// LT_C_ADSIDO_INFO 시 리스트
	// LT_C_ADSIGG_INFO 구 리스트, 속성명은 [sig_cd,full_nm,sig_kor_nm,sig_eng_nm,ag_geom] 중 하나
	// LT_C_ADEMD_INFO 동, 구 리스트, 속성명은 [emd_cd,full_nm,emd_kor_nm,emd_eng_nm,ag_geom] 중 하나
	// LT_C_ADRI_INFO 리 리스트, 속성명은 [li_cd,full_nm,li_kor_nm,li_eng_nm,ag_geom] 중 하나

	const queryKey = ['/req/data', params];
	const queryFn = async () =>
		await axios
			.get('/req/data', {
				params: {
					...params,
					key: process.env.NEXT_PUBLIC_VWORLD_API_KEY,
					request: 'getfeature',
					domain: process.env.NEXT_PUBLIC_BASE_URL,
					format: 'json',
					geomFilter:
						'BOX(13663271.680031825,3894007.9689600193,14817776.555251127,4688953.0631258525)',
					attribute: true,
					crs: 'EPSG:3857',
				},
			})
			.then(({ data }) => data.response.result.featureCollection.features);

	return useQuery({
		queryKey: [queryKey],
		queryFn,
	});
};
