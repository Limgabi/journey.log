import { useEffect, useState, useCallback } from 'react';

import { Region } from './use-manage-region';
import supabase from '../../../../../../supabase';

type DistrictTableData = {
  id: number;
  sido: string;
  sigg: string | null;
  emd: string | null;
};

export default function useGetRegions(region: Region) {
  const { sigg, sido } = region;

  const [regions, setRegions] = useState<Region[]>([]);
  const [sidoList, setSidoList] = useState<string[]>([]);
  const [siggList, setSiggList] = useState<string[]>([]);
  const [emdList, setEmdList] = useState<string[]>([]);

  const getInitDistrict = async () => {
    let allData: Region[] = [];
    let from = 0;
    let to = 999;
    let moreData = true;

    while (moreData) {
      const { data, error } = await supabase.from('district').select('*').range(from, to); // 페이징으로 데이터를 1000개씩 가져옴

      if (error) {
        break;
      }

      // TODO: sigg 없고 emd 있는 경우 예외처리
      if (data && data.length > 0) {
        const transformedData = data.map((item: DistrictTableData) => ({
          ...item,
          sigg: item.sigg || '',
          emd: item.emd || '',
        }));

        allData = [...allData, ...transformedData];
        from += 1000;
        to += 1000;
      } else {
        moreData = false;
      }
    }

    setRegions(allData);
  };

  const updateSidoList = useCallback(() => {
    setSidoList(Array.from(new Set(regions.map(region => region.sido))));
  }, [regions]);

  const updateSiggList = useCallback(() => {
    if (sido) {
      setSiggList(
        Array.from(
          new Set(regions.filter(region => region.sido === sido).map(region => region.sigg)),
        ),
      );
    } else {
      setSiggList([]);
    }
  }, [sido, regions]);

  const updateEmdList = useCallback(() => {
    if (sido && sigg) {
      setEmdList(
        regions
          .filter(region => region.sido === sido && region.sigg === sigg)
          .map(region => region.emd),
      );
    } else {
      setEmdList([]);
    }
  }, [sido, sigg, regions]);

  useEffect(() => {
    getInitDistrict();
  }, []);

  useEffect(() => {
    updateSidoList();
  }, [regions]);

  useEffect(() => {
    updateSiggList();
  }, [sido]);

  useEffect(() => {
    updateEmdList();
  }, [sido, sigg, updateEmdList]);

  return { sidoList, siggList, emdList };
}
