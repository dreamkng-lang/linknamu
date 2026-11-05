export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description?: string;
};

export type Profile = {
  name: string;
  bio: string;
  imageUrl: string;
  links: LinkItem[];
};

// TODO: 실제 프로필 정보와 링크로 교체하세요.
export const profile: Profile = {
  name: "김클로",
  bio: "세계최강 바이브코딩",
  imageUrl: "/profile.svg",
  links: [
    {
      id: "github",
      title: "GitHub",
      url: "https://github.com",
      description: "오픈소스 프로젝트 모음",
    },
    {
      id: "blog",
      title: "블로그",
      url: "https://velog.io",
      description: "개발 기록과 회고",
    },
    {
      id: "instagram",
      title: "Instagram",
      url: "https://instagram.com",
      description: "일상 공유",
    },
    {
      id: "youtube",
      title: "YouTube",
      url: "https://youtube.com",
      description: "바이브코딩 영상",
    },
  ],
};
