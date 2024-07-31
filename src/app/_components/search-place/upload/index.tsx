'use client';

import { ChangeEvent, useState } from 'react';

import Image from 'next/image';

import { ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { MotionDiv } from '@/components/Motion';
import { storage } from '@/firebase/firebasedb';

import * as S from '../index.style';

export default function Upload() {
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map(file => URL.createObjectURL(file));
    setImages(previews);
    setImageFiles(files);
  };

  const handleUploadImage = async () => {
    const uploadPromises = imageFiles.map(async file => {
      const fileName = uuidv4() + '.png';
      const imageRef = ref(storage, `images/${fileName}`);

      await uploadBytes(imageRef, file);
    });

    await Promise.all(uploadPromises);
    alert('이미지 업로드 성공');
    setImages([]);
    setImageFiles([]);
  };

  return (
    <MotionDiv>
      <S.MainWrapper>
        <h2>기록할 사진을 업로드하세요</h2>
        <S.InputWrapper>
          <input type="file" multiple accept="image/*" onChange={handleImageInfo} />
        </S.InputWrapper>
        {images.map((url, index) => (
          <Image key={index} src={url} alt="img-preview" width={200} height={300} />
        ))}
      </S.MainWrapper>
      <button onClick={handleUploadImage}>기록하기</button>
    </MotionDiv>
  );
}
