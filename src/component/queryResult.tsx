import Image from "next/image";
import type { Content } from "@/types";

type ItemProps = {
  title: string;
  path: string;
};

const Item = ({ title, path }: ItemProps) => {
  return (
    <Image
      src={`https://image.tmdb.org/t/p/w500/${path}`}
      alt={title}
      height={168 * (16 / 9)}
      width={299}
      loading="lazy"
      className="aspect-video cursor-pointer object-cover transition-all duration-100 hover:scale-110"
    />
  );
};

type Props = {
  data: Content[] | undefined;
  query: string;
};

export const QueryResult = ({ data, query }: Props) => {
  return (
    <div className="container mx-8 mt-8 max-w-screen-2xl sm:mx-12">
      <h2 className="pb-10 text-3xl">Results for &quot;{query}&quot;</h2>
      <section className="flex flex-wrap gap-2">
        {data?.map((item) => (
          <Item
            key={item.id}
            title={item.title ?? item.name ?? ""}
            path={item.backdrop_path ?? item.poster_path ?? ""}
          />
        ))}
      </section>
    </div>
  );
};
