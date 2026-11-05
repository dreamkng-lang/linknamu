"use client";

import { useState } from "react";
import type { LinkItem } from "@/data/profile";

type LinkCardProps = {
  link: LinkItem;
  /** 서버에서 읽은 클릭 수. 아직 불러오는 중이거나 불러오지 못하면 undefined */
  initialCount?: number;
};

// 페이지 이동을 막지 않도록 sendBeacon으로 클릭을 기록합니다.
function trackClick(id: string) {
  const url = `/api/click/${encodeURIComponent(id)}`;
  if (navigator.sendBeacon?.(url)) return;
  fetch(url, { method: "POST", keepalive: true }).catch(() => {});
}

const formatter = new Intl.NumberFormat("ko-KR");

export default function LinkCard({ link, initialCount }: LinkCardProps) {
  const [count, setCount] = useState(initialCount);

  const handleClick = () => {
    trackClick(link.id);
    setCount((c) => (c === undefined ? c : c + 1));
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      onAuxClick={(e) => {
        if (e.button === 1) handleClick(); // 마우스 휠 클릭(새 탭)
      }}
      className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 active:translate-y-0 dark:border-neutral-700 dark:bg-neutral-900"
    >
      <span className="min-w-0 text-left">
        <span className="block truncate font-semibold">{link.title}</span>
        {link.description && (
          <span className="block truncate text-sm text-neutral-500 dark:text-neutral-400">
            {link.description}
          </span>
        )}
      </span>
      <span className="flex shrink-0 items-center gap-3">
        {count !== undefined && (
          <span
            className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium tabular-nums text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
            aria-label={`클릭 ${count}회`}
          >
            {formatter.format(count)}회
          </span>
        )}
        <span
          aria-hidden
          className="text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-500"
        >
          →
        </span>
      </span>
    </a>
  );
}
