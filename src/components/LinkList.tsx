import { connection } from "next/server";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";
import { getClickCounts } from "@/lib/clicks";

type LinkListProps = {
  links: LinkItem[];
  counts?: Record<string, number>;
};

/** 클릭 수 없이(또는 주어진 클릭 수로) 카드 목록을 그립니다. Suspense fallback으로도 사용됩니다. */
export function LinkListView({ links, counts }: LinkListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} initialCount={counts ? (counts[link.id] ?? 0) : undefined} />
        </li>
      ))}
    </ul>
  );
}

/** 요청 시점에 DB에서 클릭 수를 읽어 카드 목록을 그립니다. */
export default async function LinkList({ links }: { links: LinkItem[] }) {
  await connection();

  let counts: Record<string, number> | undefined;
  try {
    counts = await getClickCounts();
  } catch (err) {
    // DB에 연결할 수 없어도 링크 자체는 보여 줍니다.
    console.error("[LinkList] 클릭 수 조회 실패:", err);
  }

  return <LinkListView links={links} counts={counts} />;
}
