import type { Content } from "@/types";
import Image from "next/image";

type ItemProps = {
  title: string;
  path: string;
};

const Item = ({ title, path }: ItemProps) => {
  return (
    <Image
      src={`https://image.tmdb.org/t/p/w500/${path}`}
      alt={title}
      height={140}
      width={250}
      loading="lazy"
      className="aspect-video h-[140px] w-[250px] cursor-pointer object-cover transition-all duration-100 hover:scale-110"
    />
  );
};

type Props = {
  title: string;
  content: Content[];
};
export const Carousel = ({ title, content }: Props) => {
  return (
    <div className="mb-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl">{title}</h2>
        <div className="flex flex-[0_0_25%] gap-1 overflow-y-hidden scrollbar-none">
          {content.map((item) => (
            <Item
              key={item.id}
              title={item.title ?? item.name ?? ""}
              path={item.backdrop_path ?? ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
