import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-white shadow-md sm:h-28 sm:w-28 dark:ring-neutral-800">
        <Image
          src={imageUrl}
          alt={`${name} 프로필 사진`}
          fill
          sizes="112px"
          className="object-cover"
          priority
          unoptimized={imageUrl.endsWith(".svg")}
        />
      </div>
      <h1 className="mt-4 text-xl font-bold sm:text-2xl">{name}</h1>
      <p className="mt-1 text-sm text-neutral-600 sm:text-base dark:text-neutral-400">{bio}</p>
    </header>
  );
}
