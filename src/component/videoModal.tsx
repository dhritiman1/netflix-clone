import type { Dispatch, SetStateAction } from "react";
import { Close } from "./icons";

type Props = {
  id: string;
  title: string;
  show?: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setYoutubeId: Dispatch<SetStateAction<string>>;
};

export const Modal = ({
  id,
  title,
  show,
  setShowModal,
  setYoutubeId,
}: Props) => {
  return (
    <section
      className={`fixed inset-0 left-0 top-0 h-screen w-full ${
        show ? "z-[100]" : "-z-50 hidden"
      }`}
    >
      <div className=" flex h-screen w-full flex-col items-center justify-center gap-2">
        <div className="z-[100] flex h-[400px] w-full flex-col gap-3 sm:h-[600px] sm:w-3/5 sm:min-w-[631px]">
          <div className="flex justify-between gap-2 px-4 sm:px-0">
            <div className="border-l-2 border-[#E50914] px-2 text-sm sm:text-base">
              {title}
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowModal(false);
                setYoutubeId("");
              }}
            >
              <Close />
            </div>
          </div>
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            className="z-50 h-full w-full bg-black "
          ></iframe>
        </div>
      </div>
      <div className="absolute inset-0 z-[90] h-screen w-full bg-[#000000e2]"></div>
    </section>
  );
};
