import { useEffect, useState, useCallback } from 'react';

import { collection, getDocs } from 'firebase/firestore';

import { firestore } from '@/firebase/firebasedb';

export interface Region {
  emd: string;
  sigg: string;
  sido: string;
}

export default function useGetRegions(region: Region) {
  const { sigg, sido } = region;

  const [regions, setRegions] = useState<Region[]>([]);
  const [sidoList, setSidoList] = useState<string[]>([]);
  const [siggList, setSiggList] = useState<string[]>([]);
  const [emdList, setEmdList] = useState<string[]>([]);

  const getInitDistrict = useCallback(async () => {
    const querySnapshot = await getDocs(collection(firestore, 'district'));
    const data = querySnapshot.docs.map(doc => doc.data())[0];
    setRegions(data.district);
  }, []);

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
