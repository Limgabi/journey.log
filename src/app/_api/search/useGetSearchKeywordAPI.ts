import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface UseGetSearchKeywordAPIParams {
  x: number;
  y: number;
  query: string;
  page?: number;
}

interface UseGetSearchKeywordAPIResponse {
  documents: PlaceInfo[];
  meta: {
    is_end: boolean;
    total_count: number;
  };
}

interface PlaceInfo {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export const useGetSearchKeywordAPI = (params: UseGetSearchKeywordAPIParams) => {
  const queryKey = [params];

  const queryFn = async () => {
    try {
      const { x, y, query, page } = params;
      const response = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_SEARCH_API_KEY}`,
        },
        params: {
          query,
          x,
          y,
          page,
          size: 15,
          sort: 'distance',
          radius: 1000,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const isEnabled = !!params.x && !!params.y && !!params.query;

  return useQuery<UseGetSearchKeywordAPIResponse>({
    queryKey,
    queryFn,
    enabled: isEnabled,
  });
};
