import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

interface UseGetSearchKeywordAPIParams {
  x: number;
  y: number;
  query: string;
}

interface UseGetSearchKeywordAPIResponse {
  documents: PlaceInfo[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
}

interface UseGetSearchKeywordAPIInfiniteResponse {
  pageParams: number[];
  pages: { data: UseGetSearchKeywordAPIResponse }[];
}

export interface PlaceInfo {
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
  const queryKey = ['searchKeyword', params.x, params.y, params.query];

  const isEnabled = !!params.x && !!params.y && !!params.query;

  const getNextPageParam = (
    lastPage: UseGetSearchKeywordAPIResponse,
    allPages: UseGetSearchKeywordAPIResponse[],
  ) => (lastPage.meta.is_end ? undefined : allPages.length + 1);

  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const { x, y, query } = params;
      const response = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_SEARCH_API_KEY}`,
        },
        params: {
          query,
          x,
          y,
          page: pageParam,
          size: 15,
          sort: 'distance',
        },
      });
      return response.data;
    },
    enabled: isEnabled,
    getNextPageParam,
    initialPageParam: 1,
  });
};
