import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import Icon from '@/components/Icon';

// TODO: 뒤로가기 헤더 (임시)
export default function BackHeader() {
  const route = useRouter();

  const handleClickBack = () => {
    route.back();
  };

  return (
    <HeaderWrapper>
      <Icon icon="Chevron" cursor="pointer" onClick={() => handleClickBack()} />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: flex-start;

  padding: 1.2rem 2rem;
`;
