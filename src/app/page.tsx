import { Suspense } from "react";
import LinkList, { LinkListView } from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="flex flex-1 justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md">
        <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />

        <div className="mt-8">
          {/* 클릭 수를 불러오는 동안에도 링크 카드는 바로 보이도록 합니다. */}
          <Suspense fallback={<LinkListView links={profile.links} />}>
            <LinkList links={profile.links} />
          </Suspense>
        </div>

        <footer className="mt-12 text-center text-xs text-neutral-400">🌳 링크나무</footer>
      </div>
    </main>
  );
}
