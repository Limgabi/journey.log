import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { useGetDistrictAPI } from '@/app/_api/search';

import { AdDropdown, Regions } from '..';

interface UseManageRegionsProps {
  regions: Regions;
  setRegions: Dispatch<SetStateAction<Regions>>;
}

interface DistrictDropdown {
  properties: {
    ctp_kor_nm?: string;
    sig_kor_nm?: string;
    emd_kor_nm?: string;
    li_kor_nm?: string;

    ctprvn_cd?: string;
    sig_cd?: string;
    emd_cd?: string;
    li_cd?: string;
  };
}

export default function useManageRegions({ regions, setRegions }: UseManageRegionsProps) {
  const [adsido, setAdsido] = useState<AdDropdown[]>([]);
  const [adsigg, setAdsigg] = useState<AdDropdown[]>([]);
  const [ademd, setAdemd] = useState<AdDropdown[]>([]);
  const [adri, setAdri] = useState<AdDropdown[]>([]);

  const [params, setParams] = useState<{ data: string; attrFilter?: string }>();
  const { data } = useGetDistrictAPI(params);

  /**
   * 행정구역 시/군/구 중 어느 것을 set해야 하는지 확인하는 변수
   */
  const isSidoRequired =
    !regions.adsido.code && !regions.adsigg.code && !regions.ademd.code && !regions.adri.code;
  const isSiggRequired =
    regions.adsido.code && !regions.adsigg.code && !regions.ademd.code && !regions.adri.code;
  const isEmdRequired =
    regions.adsido.code && regions.adsigg.code && !regions.ademd.code && !regions.adri.code;
  const isRiRequired =
    regions.adsido.code && regions.adsigg.code && regions.ademd.code && !regions.adri.code;

  useEffect(() => {
    if (isSidoRequired) {
      setAdsido(
        data?.map((e: DistrictDropdown) => ({
          name: e.properties.ctp_kor_nm || '',
          code: e.properties.ctprvn_cd || '',
        })) || [],
      );
    } else if (isSiggRequired) {
      setAdsigg(
        data?.map((e: DistrictDropdown) => ({
          name: e.properties.sig_kor_nm || '',
          code: e.properties.sig_cd || '',
        })) || [],
      );
    } else if (isEmdRequired) {
      setAdemd(
        data?.map((e: DistrictDropdown) => ({
          name: e.properties.emd_kor_nm || '',
          code: e.properties.emd_cd || '',
        })) || [],
      );
    } else if (isRiRequired) {
      setAdri(
        data?.map((e: DistrictDropdown) => ({
          name: e.properties.li_kor_nm || '',
          code: e.properties.li_cd || '',
        })) || [],
      );
    }
  }, [data, regions]);

  useEffect(() => {
    let dataParam: string = '';
    let attrFilterParam: string | undefined = undefined;

    if (isSidoRequired) {
      dataParam = 'LT_C_ADSIDO_INFO';
    } else if (isSiggRequired) {
      dataParam = 'LT_C_ADSIGG_INFO';
      attrFilterParam = `sig_cd:like:${regions.adsido.code}`;
    } else if (isEmdRequired) {
      dataParam = 'LT_C_ADEMD_INFO';
      attrFilterParam = `emd_cd:like:${regions.adsigg.code}`;
    } else if (isRiRequired) {
      dataParam = 'LT_C_ADRI_INFO';
      attrFilterParam = `li_cd:like:${regions.ademd.code}`;
    }

    setParams({ data: dataParam, attrFilter: attrFilterParam });
  }, [regions]);

  return {
    regions,
    setRegions,
    adsido,
    setAdsido,
    adsigg,
    setAdsigg,
    ademd,
    setAdemd,
    adri,
    setAdri,
  };
}
