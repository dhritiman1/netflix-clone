import type { Content } from "@/types";
import { useEffect, useState } from "react";

type Props = {
  content: Content[];
};

export const Hero = ({ content }: Props) => {
  const [randomMovie, setRandomMovie] = useState<Content | null>(null);
  useEffect(() => {
    const random = Math.floor(Math.random() * content.length);
    setRandomMovie(content[random] ?? null);
  }, [content]);

  return (
    <section>
      <div></div>
    </section>
  );
};
