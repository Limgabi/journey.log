import Link from 'next/link';

import { URL_PATH } from '@/constants/url-path';

export default function Home() {
  return (
    <main>
      journey.log
      <Link href={`/${URL_PATH.SEARCH_PLACE}`}>
        <button>기록하기</button>
      </Link>
    </main>
  );
}
