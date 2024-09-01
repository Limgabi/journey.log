'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';
import { collection, getDocs } from 'firebase/firestore';
import styled from 'styled-components';

import Image from '@/components/Image';
import { firestore } from '@/firebase/firebasedb';
import { Image as ImageType } from '@/stores/use-record-info';

import { SelectedPlace } from '../record/search-place/hooks/use-select-place';

interface RecordDetail {
  id: string;
  images: ImageType[];
  location: { lng: number; lat: number };
  address: string;
  places_visited: SelectedPlace[];
  content: string;
}

export default function Main() {
  const [records, setRecords] = useState<RecordDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * firestore에 저장한 모든 log 조회
   */
  const getRecords = async () => {
    setIsLoading(true);
    try {
      const recordRef = collection(firestore, 'JourneyEntries');
      const recordSnapshot = await getDocs(recordRef);

      const recordsArray = await Promise.all(
        recordSnapshot.docs.map(async doc => {
          const data = doc.data();
          const { lng, lat } = data.location;

          if (lng && lat) {
            const response = await axios.get(
              'https://dapi.kakao.com/v2/local/geo/coord2address.json',
              {
                headers: {
                  Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_SEARCH_API_KEY}`,
                },
                params: { x: lng, y: lat },
              },
            );

            return {
              id: doc.id,
              ...data,
              address: response.data?.documents?.[0]?.address?.address_name || '',
            } as RecordDetail;
          } else {
            return {
              id: doc.id,
              ...data,
              address: '',
            } as RecordDetail;
          }
        }),
      );

      setRecords(recordsArray);
    } catch (error) {
      console.error('Error getting records: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  if (isLoading) return <div>로딩중</div>;

  return (
    <MainWrapper>
      {records.map(record => (
        <RecordWrapper key={record.id}>
          <PlaceContainer>
            {record.address}
            <TagContainer>
              {record.places_visited.map(place => (
                <Tag key={place.id}>{place.value}</Tag>
              ))}
            </TagContainer>
          </PlaceContainer>

          <ImageContainer>
            {record.images.map(image => (
              <Images
                key={image.fileName}
                src={image.downloadURL}
                alt="image"
                width={200}
                height={300}
              />
            ))}
          </ImageContainer>
          {record.content && <Content>{record.content}</Content>}
        </RecordWrapper>
      ))}
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  padding: 2.4rem;
`;

const RecordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const PlaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.6rem;
  overflow-x: auto;
`;

const Tag = styled.div`
  padding: 0 0.8em;

  border-radius: ${({ theme }) => theme.borderRadius.xs};
  border: 0.1rem solid ${({ theme }) => theme.colors.greyScale.coolGray_0};
  background-color: ${({ theme }) => theme.colors.greyScale.grayScale_1};

  white-space: nowrap;
  color: ${({ theme }) => theme.colors.greyScale.coolGray_6};
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 1.6rem;

  overflow-x: auto;
`;

const Images = styled(Image)`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const Content = styled.div``;
