import { Play } from "./icons";

type ButtonType = "ghost" | "neutral" | "netflix";

type Props = {
  icon: string | null;
  text: string;
  type: ButtonType;
  handleClick: () => void;
};

export const Button = ({ icon, text, type, handleClick }: Props) => {
  const BASE_STYLE =
    "flex rounded px-4 py-1 font-semibold active:opacity-60 hover:opacity-90 transition-opacity duration-75 items-center";

  const styles = {
    neutral: "gap-1 bg-zinc-200 text-zinc-900 ",
    netflix: "bg-[#E50914] ",
    ghost: "rounded bg-transparent border ",
  };

  return (
    <>
      <button onClick={handleClick} className={styles[type] + BASE_STYLE}>
        {icon == "play" ? <Play /> : null}
        <p>{text}</p>
      </button>
    </>
  );
};
