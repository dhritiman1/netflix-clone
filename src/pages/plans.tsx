import { Button } from "@/component/button";
import { MainLayout } from "@/component/mainLayout";

const SquareContainer = ({ tier }: { tier: string }) => {
  return (
    <div className="flex h-28 w-28 items-center justify-center rounded-sm bg-[#E50914]">
      <p>{tier}</p>
    </div>
  );
};

const Plans = () => {
  return (
    <MainLayout title="Plans">
      <div className="container mt-12 flex max-w-5xl flex-col gap-4">
        <section className="w-full">
          <h1 className="pb-3 text-3xl font-medium  sm:text-4xl">
            Choose the plan that&apos;s right for you
          </h1>
          <ul className="flex flex-col gap-2">
            <li className="">
              <div></div>
              <p className="opacity-60">Watch on your phone, tablet, and TV</p>
            </li>
            <li>
              <div></div>
              <p className="opacity-60">Unlimited movies and TV shows</p>
            </li>
            <li>
              <div></div>
              <p className="opacity-60">Change or cancel you plan anytime</p>
            </li>
          </ul>
        </section>
        <section className="overflow-x-scroll py-3 scrollbar-thin scrollbar-track-zinc-800 sm:overflow-hidden">
          <div className="min-w-[32rem]">
            <div className="flex justify-end gap-5">
              {["Mobile", "Basic", "Standard", "Premium"].map((tier, index) => (
                <SquareContainer tier={tier} key={index} />
              ))}
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center gap-3 text-sm ">
          <p className="opacity-60">
            HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability
            subject to your internet service and device capabilities. Not all
            content is available in all resolutions. See our Terms of Use for
            more details.
          </p>
          <p className="opacity-60">
            Only people who live with you may use your account. Watch on 4
            different devices at the same time with Premium, 2 with Standard,
            and 1 with Basic and Mobile.
          </p>
          <div className="py-2">
            <Button text="Subscribe" type="netflix" />
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Plans;
