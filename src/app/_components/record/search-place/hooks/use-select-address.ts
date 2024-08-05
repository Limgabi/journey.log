import { Dispatch, SetStateAction } from 'react';

import { AdDropdown, Regions } from '..';

type District = 'adsido' | 'adsigg' | 'ademd' | 'adri';

interface UseSelectAddressProps {
  setRegions: Dispatch<SetStateAction<Regions>>;
  setAdsido: Dispatch<SetStateAction<AdDropdown[]>>;
  setAdsigg: Dispatch<SetStateAction<AdDropdown[]>>;
  setAdemd: Dispatch<SetStateAction<AdDropdown[]>>;
  setAdri: Dispatch<SetStateAction<AdDropdown[]>>;
}

const emptyAd = { name: '', code: '' };

/**
 * 행정구역 선택 함수
 */
export default function useSelectAddress({
  setRegions,
  setAdsido,
  setAdsigg,
  setAdemd,
  setAdri,
}: UseSelectAddressProps) {
  const handleClickAd = (data: { name: string; code: string; type: District }) => {
    if (data.type === 'adsido') {
      setRegions(() => ({
        adsido: data,
        adsigg: emptyAd,
        ademd: emptyAd,
        adri: emptyAd,
      }));
      setAdsigg([]);
      setAdemd([]);
      setAdri([]);
    } else if (data.type === 'adsigg') {
      setRegions(prev => ({
        ...prev,
        adsigg: data,
        ademd: emptyAd,
        adri: emptyAd,
      }));
      setAdemd([]);
      setAdri([]);
    } else if (data.type === 'ademd') {
      setRegions(prev => ({ ...prev, ademd: data, adri: emptyAd }));
      setAdri([]);
    } else if (data.type === 'adri') {
      setRegions(prev => ({ ...prev, adri: data }));
    }
  };

  const handleRemoveAd = (level: District) => {
    if (level === 'adsido') {
      setRegions({
        adsido: emptyAd,
        adsigg: emptyAd,
        ademd: emptyAd,
        adri: emptyAd,
      });
      setAdsido([]);
      setAdsigg([]);
      setAdemd([]);
      setAdri([]);
    } else if (level === 'adsigg') {
      setRegions(prev => ({
        ...prev,
        adsigg: emptyAd,
        ademd: emptyAd,
        adri: emptyAd,
      }));
      setAdsigg([]);
      setAdemd([]);
      setAdri([]);
    } else if (level === 'ademd') {
      setRegions(prev => ({
        ...prev,
        ademd: emptyAd,
        adri: emptyAd,
      }));
      setAdemd([]);
      setAdri([]);
    } else if (level === 'adri') {
      setRegions(prev => ({ ...prev, adri: emptyAd }));
      setAdri([]);
    }
  };

  return { handleClickAd, handleRemoveAd };
}
