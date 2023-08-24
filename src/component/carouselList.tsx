import { Carousel } from "./carousel";
import type { DataByCategory } from "@/types";

type Props = {
  contents: DataByCategory[];
};

export const Carousels = ({ contents }: Props) => {
  return (
    <section className="mt-12">
      {contents.map((item) => (
        <Carousel
          key={item.category}
          title={item.category}
          content={item.data ?? []}
        />
      ))}
    </section>
  );
};
