'use client';

import { ChangeEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import Button from '@/components/Button';
import Image from '@/components/Image';
import { MotionDiv } from '@/components/Motion';
import { URL_PATH } from '@/constants/url-path';
import { firestore, storage } from '@/firebase/firebasedb';
import useRecordInfo from '@/stores/use-record-info';

export default function Upload() {
  const route = useRouter();
  const { coords, selectedPlace, setImages } = useRecordInfo(state => state);

  const [imagePreview, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [content, setContent] = useState('');

  const handleImageInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
    setImageFiles(files);
  };

  const handleUploadRecord = async () => {
    const uploadPromises = imageFiles.map(async file => {
      const fileName = uuidv4() + '.png';
      const imageRef = ref(storage, `images/${fileName}`);

      const uploadResult = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(uploadResult.ref);

      return { fileName, downloadURL };
    });

    const uploadedImages = await Promise.all(uploadPromises);
    setImages(uploadedImages);

    await addDoc(collection(firestore, 'JourneyEntries'), {
      location: coords,
      places_visited: selectedPlace,
      images: uploadedImages,
      content,
    });

    alert('이미지 업로드 성공');
    setImagePreviews([]);
    setImageFiles([]);
    route.replace(URL_PATH.HOME);
  };

  return (
    <MainWrapper>
      <h2>기록할 사진을 업로드하세요</h2>
      <InputWrapper>
        <input type="file" multiple accept="image/*" onChange={handleImageInfo} />
      </InputWrapper>
      <ImageWrapper>
        {imagePreview.map(url => (
          <Image key={url} src={url} alt="img-preview" width={200} height={300} />
        ))}
      </ImageWrapper>
      <TextWrapper
        placeholder="기록할 문구를 입력하세요."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <Button onClick={handleUploadRecord} disabled={!!!imagePreview.length}>
        기록하기
      </Button>
    </MainWrapper>
  );
}

const MainWrapper = styled(MotionDiv)`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;

  padding: 2rem 1.6rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
`;

const ImageWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  overflow-x: auto;
`;

const TextWrapper = styled.textarea`
  width: 100%;
  resize: none;
  padding: 14px 15px;

  outline: none;
  color: ${({ theme }) => theme.colors.greyScale.warmGray_6};
  font-size: 1.4rem;

  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 0.1rem solid ${({ theme }) => theme.colors.greyScale.grayScale_3};
  background-color: ${({ theme }) => theme.colors.greyScale.grayScale_0};

  resize: none;
`;
