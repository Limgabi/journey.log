'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { debounce, isEqual } from 'lodash';

import { useGetSearchKeywordAPI } from '@/app/_api/search';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { MotionDiv } from '@/components/Motion';
import Select from '@/components/Select';
import { URL_PATH } from '@/constants/url-path';
import { useIntersectionObserver } from '@/hooks';
import useRecordInfo from '@/stores/use-record-info';

import LabelButton from './components/LabelButton';
import useGetRegions, { Region } from './hooks/use-get-regions';
import useManageGeocoder from './hooks/use-manage-geocoder';
import useSelectPlace from './hooks/use-select-place';
import * as S from './index.style';

export default function SearchPlace() {
  const router = useRouter();
  const selectRef = useRef<HTMLDivElement>(null);
  const prevRegionsRef = useRef<Region | null>(null);

  const { coords, selectedPlace } = useRecordInfo(state => state);

  const [searchText, setSearchText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const [region, setRegion] = useState<Region>({ emd: '', sigg: '', sido: '' });
  const [isShow, setIsShow] = useState(false);

  const {
    data: searchKeywordData,
    hasNextPage,
    fetchNextPage,
  } = useGetSearchKeywordAPI({
    x: coords.lng,
    y: coords.lat,
    query: debouncedText,
  });

  const { sidoList, siggList, emdList } = useGetRegions(region);
  const { handleSelectPlace, handleDeletePlace } = useSelectPlace();
  const { geocode } = useManageGeocoder();
  const { observedTargetRef: scrollRef } = useIntersectionObserver({ hasNextPage, fetchNextPage });

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsShow(false);
      }
    };

    if (isShow) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isShow]);

  useEffect(() => {
    if (searchKeywordData?.pages && searchKeywordData.pages.length > 0) {
      setIsShow(true);
    }
  }, [searchKeywordData]);

  useEffect(() => {
    if (!isEqual(prevRegionsRef.current, region)) {
      const setGeocode = async () => {
        await geocode(`${region.sido} ${region.sigg} ${region.emd}`);
      };
      setGeocode();
      prevRegionsRef.current = region;
    }
  }, [region, geocode]);

  const debouncedSearchText = useCallback(
    debounce((value: string) => setDebouncedText(value), 300),
    [],
  );

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    debouncedSearchText(e.target.value);
  };

  const handleSelectRegion = useCallback((key: keyof Region, value: string) => {
    setRegion(prevState => ({
      ...prevState,
      [key]: value,
      ...(key !== 'emd' && { emd: '' }),
      ...(key === 'sido' && { sigg: '', emd: '' }),
    }));
  }, []);

  const renderSelect = (options: string[], key: keyof Region, selectedValue: string) => (
    <Select
      options={options.map(value => ({ id: value, value }))}
      selected={[{ id: selectedValue, value: selectedValue }]}
      onSelect={option => handleSelectRegion(key, option.value)}
    />
  );

  return (
    <MotionDiv>
      <S.MainWrapper>
        <h2>기록할 여행 지역을 선택하세요</h2>
        <S.InputWrapper>
          <S.LabelContainer>
            {region.sido && (
              <LabelButton
                value={region.sido}
                onClick={() => handleSelectRegion('sido', '')}
                type="secondary"
              />
            )}
            {region.sigg && (
              <LabelButton
                value={region.sigg}
                onClick={() => handleSelectRegion('sigg', '')}
                type="secondary"
              />
            )}
            {region.emd && (
              <LabelButton
                value={region.emd}
                onClick={() => handleSelectRegion('emd', '')}
                type="secondary"
              />
            )}
          </S.LabelContainer>
        </S.InputWrapper>

        {!!region.sido && (
          <S.PlaceWrapper>
            <h3>기록할 장소를 선택하세요</h3>
            <Input
              type="search"
              value={searchText}
              handleChange={handleChangeSearchText}
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
            scrollRef={hasNextPage ? scrollRef : null}
            options={searchKeywordData.pages
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
            {sidoList.length > 0 && renderSelect(sidoList, 'sido', region.sido)}
            {siggList.length > 0 && renderSelect(siggList, 'sigg', region.sigg)}
            {emdList.length > 0 && renderSelect(emdList, 'emd', region.emd)}
          </S.Cascader>
        )}
      </S.MainWrapper>

      {selectedPlace.length > 0 && (
        <Button onClick={() => router.push(`/${URL_PATH.RECORD.HOME}/${URL_PATH.RECORD.UPLOAD}`)}>
          다음으로
        </Button>
      )}
    </MotionDiv>
  );
}
