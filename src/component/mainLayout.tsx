import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { SearchBar } from "./search";
import { Button } from "./button";

type Props = {
  title: string;
  children: ReactNode;
};

export const MainLayout = ({ title, children }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="sticky top-0 flex w-full justify-center">
        <nav className="container mx-12 flex h-16 max-w-screen-2xl items-center justify-between text-[16px] font-medium sm:space-x-0">
          <div className="flex items-center gap-6">
            <div className="cursor-pointer font-mono text-3xl font-extrabold">
              <Link href="/">
                <Image
                  className="h-auto w-auto"
                  src="/logo.png"
                  alt="logo"
                  width={110}
                  height={35}
                  priority={true}
                />
              </Link>
            </div>
            <div className="flex gap-6">
              <div>Home</div>
              <div>TV Show</div>
              <div>New & Popular</div>
              <div>My List</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <SearchBar />
            {/* <div>▲</div>*/}
            {/* <div>▲</div> */}
            <Button
              icon={null}
              text="Sign In"
              type="netflix"
              handleClick={() => console.log("take to login page")}
            />
          </div>
        </nav>
      </header>

      <main className=" flex w-full justify-center">{children}</main>

      <footer></footer>
    </>
  );
};
