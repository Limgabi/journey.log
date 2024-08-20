'use client';

import { useState } from 'react';

import styled from 'styled-components';

import BackHeader from '@/components/BackHeader';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function SignIn() {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  return (
    <Wrapper>
      <BackHeader />
      <LogoWrapper>
        <Logo>j.log</Logo>
        <SubText>나만의 여행을 기록하고 공유하세요.</SubText>
      </LogoWrapper>
      <InputWrapper>
        <Input value={id} handleChange={e => setId(e.target.value)} placeholder="아이디" />
        <Input
          value={pwd}
          handleChange={e => setPwd(e.target.value)}
          placeholder="비밀번호"
          type="password"
        />
      </InputWrapper>

      <Button onClick={() => {}} disabled={!!!id || !!!pwd}>
        로그인
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  padding: 0 2rem;
  margin-top: 4.8rem; // TODO: 헤더 수정 후 공통 레이아웃 정의
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Logo = styled.span`
  font-size: 2.4rem;
  font-weight: 700;
`;

const SubText = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.greyScale.coolGray_4};
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
