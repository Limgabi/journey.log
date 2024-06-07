import { URL_PATH } from "@/constants/url-path";
import Link from "next/link";

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
