'use client';

import { useState, useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';

import { useGetSearchKeywordAPI, useGetDistrictAPI } from '@/app/_api/search';
import Input from '@/components/Input';
import { MotionDiv } from '@/components/Motion';
import Select from '@/components/Select';
import { URL_PATH } from '@/constants/url-path';
import useRecordInfo from '@/stores/use-record-info';
import { loadGoogleMapsScript } from '@/utils/googleMapsLoader';

import LabelButton from './components/LabelButton';
import RegionList from './components/RegionList';
import * as S from './index.style';

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

interface Dropdown {
  name: string;
  code: string;
}

export interface SelectedPlace {
  id: string;
  value: string;
}

export default function SearchPlace() {
  const router = useRouter();
  const selectRef = useRef<HTMLDivElement>(null);

  const { coords, setCoords, selectedPlace, setSelectedPlace } = useRecordInfo(state => state);

  const [searchText, setSearchText] = useState('');
  const [params, setParams] = useState<{ data: string; attrFilter?: string }>();

  /**
   * 행정구역 cascader 형식으로 보여주기 위한 상태
   */
  const [adsido, setAdsido] = useState<Dropdown[]>([]);
  const [adsigg, setAdsigg] = useState<Dropdown[]>([]);
  const [ademd, setAdemd] = useState<Dropdown[]>([]);
  const [adri, setAdri] = useState<Dropdown[]>([]);

  const [regions, setRegions] = useState({
    adsido: { name: '', code: '' },
    adsigg: { name: '', code: '' },
    ademd: { name: '', code: '' },
    adri: { name: '', code: '' },
  });

  const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false);

  const { data } = useGetDistrictAPI(params);
  const { data: searchKeywordData } = useGetSearchKeywordAPI({
    x: coords.lng,
    y: coords.lat,
    query: searchText,
  });

  /**
   * select 외부 클릭 감지
   */
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsShow(false);
      }
    };

    if (isShow) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectRef, isShow]);

  useEffect(() => {
    if (searchKeywordData?.documents && searchKeywordData?.documents.length > 0) {
      setIsShow(true);
    }
  }, [searchKeywordData]);

  const handleClickAd = (data: {
    name: string;
    code: string;
    type: 'adsido' | 'adsigg' | 'ademd' | 'adri';
  }) => {
    if (data.type === 'adsido') {
      setRegions(() => ({
        adsido: data,
        adsigg: { name: '', code: '' },
        ademd: { name: '', code: '' },
        adri: { name: '', code: '' },
      }));
      setAdsigg([]);
      setAdemd([]);
      setAdri([]);
    } else if (data.type === 'adsigg') {
      setRegions(prev => ({
        ...prev,
        adsigg: data,
        ademd: { name: '', code: '' },
        adri: { name: '', code: '' },
      }));
      setAdemd([]);
      setAdri([]);
    } else if (data.type === 'ademd') {
      setRegions(prev => ({ ...prev, ademd: data, adri: { name: '', code: '' } }));
      setAdri([]);
    } else if (data.type === 'adri') {
      setRegions(prev => ({ ...prev, adri: data }));
    }
  };

  const handleRemoveAd = (level: string) => {
    if (level === 'adsido') {
      setRegions({
        adsido: { name: '', code: '' },
        adsigg: { name: '', code: '' },
        ademd: { name: '', code: '' },
        adri: { name: '', code: '' },
      });
      setAdsido([]);
      setAdsigg([]);
      setAdemd([]);
      setAdri([]);
    } else if (level === 'adsigg') {
      setRegions(prev => ({
        ...prev,
        adsigg: { name: '', code: '' },
        ademd: { name: '', code: '' },
        adri: { name: '', code: '' },
      }));
      setAdsigg([]);
      setAdemd([]);
      setAdri([]);
    } else if (level === 'ademd') {
      setRegions(prev => ({
        ...prev,
        ademd: { name: '', code: '' },
        adri: { name: '', code: '' },
      }));
      setAdemd([]);
      setAdri([]);
    } else if (level === 'adri') {
      setRegions(prev => ({ ...prev, adri: { name: '', code: '' } }));
      setAdri([]);
    }
  };

  useEffect(() => {
    if (!regions.adsido.code && !regions.adsigg.code && !regions.ademd.code && !regions.adri.code) {
      setAdsido(
        data?.map((e: DistrictDropdown) => ({
          name: e.properties.ctp_kor_nm || '',
          code: e.properties.ctprvn_cd || '',
        })) || [],
      );
    } else if (
      regions.adsido.code &&
      !regions.adsigg.code &&
      !regions.ademd.code &&
      !regions.adri.code
    ) {
      setAdsigg(
        data?.map((e: DistrictDropdown) => ({
          name: e.properties.sig_kor_nm || '',
          code: e.properties.sig_cd || '',
        })) || [],
      );
    } else if (
      regions.adsido.code &&
      regions.adsigg.code &&
      !regions.ademd.code &&
      !regions.adri.code
    ) {
      setAdemd(
        data?.map((e: DistrictDropdown) => ({
          name: e.properties.emd_kor_nm || '',
          code: e.properties.emd_cd || '',
        })) || [],
      );
    } else if (
      regions.adsido.code &&
      regions.adsigg.code &&
      regions.ademd.code &&
      !regions.adri.code
    ) {
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

    if (!regions.adsido.code && !regions.adsigg.code && !regions.ademd.code && !regions.adri.code) {
      dataParam = 'LT_C_ADSIDO_INFO';
    } else if (
      regions.adsido.code &&
      !regions.adsigg.code &&
      !regions.ademd.code &&
      !regions.adri.code
    ) {
      dataParam = 'LT_C_ADSIGG_INFO';
      attrFilterParam = `sig_cd:like:${regions.adsido.code}`;
    } else if (
      regions.adsido.code &&
      regions.adsigg.code &&
      !regions.ademd.code &&
      !regions.adri.code
    ) {
      dataParam = 'LT_C_ADEMD_INFO';
      attrFilterParam = `emd_cd:like:${regions.adsigg.code}`;
    } else if (
      regions.adsido.code &&
      regions.adsigg.code &&
      regions.ademd.code &&
      !regions.adri.code
    ) {
      dataParam = 'LT_C_ADRI_INFO';
      attrFilterParam = `li_cd:like:${regions.ademd.code}`;
    }

    setParams({ data: dataParam, attrFilter: attrFilterParam });
  }, [regions]);

  useEffect(() => {
    loadGoogleMapsScript(() => {
      setIsGoogleApiLoaded(true);
    });
  }, []);

  const geocode = (address: string) => {
    if (!isGoogleApiLoaded) {
      return;
    }

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address }, (results: any, status: string) => {
      if (status === 'OK') {
        const location = results[0].geometry.location;
        setCoords({
          lat: location.lat(),
          lng: location.lng(),
        });
      } else {
        console.error(status);
      }
    });
  };

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = async () => {
    await geocode(
      `${regions.adsido.name} ${regions.adsigg.name} ${regions.ademd.name} ${regions.adri.name}`,
    );
  };

  const handleSelectPlace = (option: SelectedPlace) => {
    setSelectedPlace(prev => {
      const isAlreadySelected = prev.some(place => place.id === option.id);
      if (isAlreadySelected) {
        return prev.filter(place => place.id !== option.id);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleDeletePlace = (id: string) => {
    setSelectedPlace(prev => prev.filter(place => place.id !== id));
  };

  return (
    <MotionDiv>
      <S.MainWrapper>
        <h2>기록할 여행 지역을 선택하세요</h2>
        <S.InputWrapper>
          <S.LabelContainer>
            {regions.adsido.name && (
              <LabelButton
                value={regions.adsido.name}
                onClick={() => handleRemoveAd('adsido')}
                type="secondary"
              />
            )}
            {regions.adsigg.name && (
              <LabelButton
                value={regions.adsigg.name}
                onClick={() => handleRemoveAd('adsigg')}
                type="secondary"
              />
            )}
            {regions.ademd.name && (
              <LabelButton
                value={regions.ademd.name}
                onClick={() => handleRemoveAd('ademd')}
                type="secondary"
              />
            )}
            {regions.adri.name && (
              <LabelButton
                value={regions.adri.name}
                onClick={() => handleRemoveAd('adri')}
                type="secondary"
              />
            )}
          </S.LabelContainer>
        </S.InputWrapper>

        {!!regions.adsido.name && !!regions.adsido.name && (
          <S.PlaceWrapper>
            <h3>기록할 장소를 선택하세요</h3>
            <Input
              type="search"
              value={searchText}
              handleChange={handleChangeSearchText}
              handleSearch={handleSearch}
              onClick={() => {
                if (!isShow && searchKeywordData) {
                  setIsShow(true);
                }
              }}
            />
            <S.LabelContainer>
              {selectedPlace.map(place => (
                <LabelButton
                  key={place.id}
                  value={place.value}
                  onClick={() => handleDeletePlace(place.id)}
                />
              ))}
            </S.LabelContainer>
          </S.PlaceWrapper>
        )}

        {searchKeywordData?.documents && isShow ? (
          <Select
            ref={selectRef}
            options={searchKeywordData?.documents.map(option => ({
              id: option.id,
              value: option.place_name,
            }))}
            selected={selectedPlace}
            onSelect={handleSelectPlace}
          />
        ) : (
          <S.Cascader>
            {adsido.length > 0 && (
              <RegionList
                data={adsido}
                selected={regions.adsido}
                onSelect={data => handleClickAd({ ...data, type: 'adsido' })}
              />
            )}
            {adsigg.length > 0 && (
              <RegionList
                data={adsigg}
                selected={regions.adsigg}
                onSelect={data => handleClickAd({ ...data, type: 'adsigg' })}
              />
            )}
            {ademd.length > 0 && (
              <RegionList
                data={ademd}
                selected={regions.ademd}
                onSelect={data => handleClickAd({ ...data, type: 'ademd' })}
              />
            )}
            {adri.length > 0 && (
              <RegionList
                data={adri}
                selected={regions.adri}
                onSelect={data => handleClickAd({ ...data, type: 'adri' })}
              />
            )}
          </S.Cascader>
        )}
      </S.MainWrapper>

      {selectedPlace.length > 0 && (
        <button
          onClick={() =>
            router.push(`/${URL_PATH.SEARCH_PLACE.HOME}/${URL_PATH.SEARCH_PLACE.UPLOAD}`)
          }
        >
          다음으로
        </button>
      )}
    </MotionDiv>
  );
}
