import type { Content } from "@/types";
import Image from "next/image";

type ItemProps = {
  title: string;
  url: string;
};

const Item = ({ title, url }: ItemProps) => {
  return (
    <div className="h-[140px]">
      <Image
        src={`https://image.tmdb.org/t/p/w500/${url}`}
        alt={title}
        height={140}
        width={250}
        loading="lazy"
        className="aspect-video h-[140px] w-[250px] cursor-pointer object-cover transition-all hover:scale-110"
      />
    </div>
  );
};

type Props = {
  title: string;
  content: Content[];
};
export const Carousel = ({ title, content }: Props) => {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-xl">{title}</h2>
      <div className="no-scrollbar flex w-full gap-[8px] overflow-y-hidden">
        {content.map((item) => (
          <Item
            key={item.id}
            title={item.title ?? ""}
            url={item.backdrop_path ?? item.poster_path ?? ""}
          />
        ))}
      </div>
    </section>
  );
};
