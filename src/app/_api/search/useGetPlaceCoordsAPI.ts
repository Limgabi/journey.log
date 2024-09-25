import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Region } from '@/app/_components/record/search-place/hooks/use-manage-region';

type UseGetPlaceCoordsAPIParams = Pick<Region, 'emd' | 'sido' | 'sigg'>;

export function useGetPlaceCoordsAPI({ params }: { params: UseGetPlaceCoordsAPIParams }) {
  const queryKey = [params];

  const queryFn = async () => {
    const response = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_SEARCH_API_KEY}`,
      },
      params: {
        analyze_type: 'similar',
        query: `${params.sido} ${params.sigg} ${params.emd}`,
        page: 1,
        size: 10,
      },
    });
    return { lat: Number(response.data.documents[0].y), lng: Number(response.data.documents[0].x) };
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: params && !!Object.values(params).filter(value => !!value).length,
  });
}
