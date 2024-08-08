'use client';

import { useState, useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';

import { debounce } from 'lodash';

import { useGetSearchKeywordAPI } from '@/app/_api/search';
import Input from '@/components/Input';
import { MotionDiv } from '@/components/Motion';
import Select from '@/components/Select';
import { URL_PATH } from '@/constants/url-path';
import { useIntersectionObserver } from '@/hooks';
import useRecordInfo from '@/stores/use-record-info';

import LabelButton from './components/LabelButton';
import RegionList from './components/RegionList';
import useManageGeocoder from './hooks/use-manage-geocoder';
import useManageRegions from './hooks/use-manage-regions';
import useSelectAddress from './hooks/use-select-address';
import useSelectPlace from './hooks/use-select-place';
import * as S from './index.style';

export interface AdDropdown {
  name: string;
  code: string;
}

export interface Regions {
  adsido: AdDropdown;
  adsigg: AdDropdown;
  ademd: AdDropdown;
  adri: AdDropdown;
}

export default function SearchPlace() {
  const router = useRouter();
  const selectRef = useRef<HTMLDivElement>(null);

  const { coords, selectedPlace } = useRecordInfo(state => state);

  const [searchText, setSearchText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');

  const [regions, setRegions] = useState<Regions>({
    adsido: { name: '', code: '' },
    adsigg: { name: '', code: '' },
    ademd: { name: '', code: '' },
    adri: { name: '', code: '' },
  });

  const {
    data: searchKeywordData,
    hasNextPage,
    fetchNextPage,
  } = useGetSearchKeywordAPI({
    x: coords.lng,
    y: coords.lat,
    query: debouncedText,
  });

  const { adsido, setAdsido, adsigg, setAdsigg, ademd, setAdemd, adri, setAdri } = useManageRegions(
    { regions, setRegions },
  );

  const { handleClickAd, handleRemoveAd } = useSelectAddress({
    setRegions,
    setAdsido,
    setAdsigg,
    setAdemd,
    setAdri,
  });

  const { handleSelectPlace, handleDeletePlace } = useSelectPlace();

  const { geocode } = useManageGeocoder();

  const { observedTargetRef: scrollRef } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
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
    if (searchKeywordData?.pages && searchKeywordData?.pages.length > 0) {
      setIsShow(true);
    }
  }, [searchKeywordData]);

  const debouncedSearchText = debounce((value: string) => {
    setDebouncedText(value);
  }, 300);

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    debouncedSearchText(e.target.value);
  };

  const handleSearch = async () => {
    await geocode(
      `${regions.adsido.name} ${regions.adsigg.name} ${regions.ademd.name} ${regions.adri.name}`,
    );
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

        {searchKeywordData?.pages && isShow ? (
          <Select
            ref={selectRef}
            scrollRef={hasNextPage ? scrollRef : undefined}
            options={searchKeywordData?.pages
              .flatMap(data => data.documents)
              .map(option => ({
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
        <button onClick={() => router.push(`/${URL_PATH.RECORD.HOME}/${URL_PATH.RECORD.UPLOAD}`)}>
          다음으로
        </button>
      )}
    </MotionDiv>
  );
}
