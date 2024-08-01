'use client';

import { ChangeEvent, useState } from 'react';

import Image from 'next/image';

import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { MotionDiv } from '@/components/Motion';
import { firestore, storage } from '@/firebase/firebasedb';
import useRecordInfo from '@/stores/use-record-info';

import * as S from '../search-place/index.style';

export default function Upload() {
  const { coords, selectedPlace, setImages } = useRecordInfo(state => state);

  const [imagePreview, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

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
    });

    alert('이미지 업로드 성공');
    setImagePreviews([]);
    setImageFiles([]);
  };

  return (
    <MotionDiv>
      <S.MainWrapper>
        <h2>기록할 사진을 업로드하세요</h2>
        <S.InputWrapper>
          <input type="file" multiple accept="image/*" onChange={handleImageInfo} />
        </S.InputWrapper>
        {imagePreview.map((url, index) => (
          <Image key={index} src={url} alt="img-preview" width={200} height={300} />
        ))}
      </S.MainWrapper>
      <button onClick={handleUploadRecord}>기록하기</button>
    </MotionDiv>
  );
}
