import Link from 'next/link';

export default function Home() {
  return (
    <main>
      journey.log
      <Link href="/record">
        <button>기록하기</button>
      </Link>
    </main>
  );
}
