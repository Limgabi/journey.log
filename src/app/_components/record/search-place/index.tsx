'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { debounce, isEqual } from 'lodash';
import styled, { css } from 'styled-components';

import { useGetSearchKeywordAPI } from '@/app/_api/search';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { MotionDiv } from '@/components/Motion';
import Select from '@/components/Select';
import { URL_PATH } from '@/constants/url-path';
import { useIntersectionObserver } from '@/hooks';
import useRecordInfo from '@/stores/use-record-info';

import LabelButton from './components/LabelButton';
import useGetRegions from './hooks/use-get-regions';
import useManageGeocoder from './hooks/use-manage-geocoder';
import useManageRegion, { Region } from './hooks/use-manage-region';
import useSelectPlace from './hooks/use-select-place';
import * as S from './index.style';

export default function SearchPlace() {
  const router = useRouter();
  const selectRef = useRef<HTMLDivElement>(null);
  const prevRegionsRef = useRef<Region | null>(null);

  const { regionState, regionStateDispatch } = useManageRegion();
  const { coords, selectedPlace } = useRecordInfo(state => state);

  const [searchText, setSearchText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
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

  const { sidoList, siggList, emdList } = useGetRegions(regionState);
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
    if (!isEqual(prevRegionsRef.current, regionState)) {
      const setGeocode = async () => {
        await geocode(`${regionState.sido} ${regionState.sigg} ${regionState.emd}`);
      };
      setGeocode();
      prevRegionsRef.current = regionState;
    }
  }, [regionState, geocode]);

  const debouncedSearchText = useCallback(
    debounce((value: string) => setDebouncedText(value), 300),
    [],
  );

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    debouncedSearchText(e.target.value);
  };

  const handleSelectRegion = useCallback(
    (key: keyof Region, value: string) => {
      if (value === '') {
        regionStateDispatch({ type: 'DELETE_REGION', key });
      } else {
        regionStateDispatch({ type: 'SET_REGION', key, payload: value });
      }
    },
    [regionStateDispatch],
  );

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
            {regionState.sido && (
              <LabelButton
                value={regionState.sido}
                onClick={() => handleSelectRegion('sido', '')}
                type="secondary"
              />
            )}
            {regionState.sigg && (
              <LabelButton
                value={regionState.sigg}
                onClick={() => handleSelectRegion('sigg', '')}
                type="secondary"
              />
            )}
            {regionState.emd && (
              <LabelButton
                value={regionState.emd}
                onClick={() => handleSelectRegion('emd', '')}
                type="secondary"
              />
            )}
          </S.LabelContainer>
        </S.InputWrapper>

        {!!regionState.sido && (
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
          <SelectWrapper ref={selectRef}>
            {searchKeywordData.pages
              .flatMap(data => data.documents)
              .map(option => ({
                id: option.id,
                value: option.place_name,
                addressName: option.address_name,
              }))
              .map(option => (
                <SelectOption
                  key={option.id}
                  selected={selectedPlace.some(selectedOption => selectedOption.id === option.id)}
                  onClick={() => handleSelectPlace(option)}
                >
                  <div className="place">{option.value}</div>
                  <div className="address">{option.addressName}</div>
                </SelectOption>
              ))}
            {scrollRef && <ScrollTrigger ref={scrollRef} />}
          </SelectWrapper>
        ) : (
          <S.Cascader>
            {sidoList.length > 0 && renderSelect(sidoList, 'sido', regionState.sido)}
            {siggList.length > 0 && renderSelect(siggList, 'sigg', regionState.sigg)}
            {emdList.length > 0 && renderSelect(emdList, 'emd', regionState.emd)}
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

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-height: 40rem;
  padding: 0.4rem;

  background-color: ${({ theme }) => theme.colors.greyScale.grayScale_0};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow:
    0px 6px 16px 0px rgba(0, 0, 0, 0.08),
    0px 3px 6px -4px rgba(0, 0, 0, 0.12),
    0px 9px 28px 8px rgba(0, 0, 0, 0.05);

  overflow-y: auto;
`;

const SelectOption = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;

  padding: 0.6rem 1.2rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  color: ${({ theme }) => theme.colors.greyScale.warmGray_6};
  font-size: 1.4rem;

  cursor: pointer;

  &:hover {
    background-color: #0000000f;
  }

  ${({ selected, theme }) =>
    selected &&
    css`
      background-color: ${theme.colors.greyScale.grayScale_1};
      color: ${theme.colors.primary.blue_5};
    `}

  .place {
    font-weight: 600;
  }
  .address {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.greyScale.warmGray_3};
  }
`;

const ScrollTrigger = styled.div`
  height: 1px !important;
  width: 100%;
`;
