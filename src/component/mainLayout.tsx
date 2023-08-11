import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { SearchBar } from "./search";

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
      <main className="flex min-h-screen w-full flex-col items-center">
        <nav className="flex h-16 w-full items-center justify-between px-[9.5rem] text-[16px] font-medium">
          <div className="flex items-center gap-6">
            <div className="font-mono text-3xl font-extrabold">
              <Link href="/">
                <Image
                  className="h-auto w-auto"
                  src="/logo.png"
                  alt="logo"
                  width={120}
                  height={40}
                  priority={true}
                />
              </Link>
            </div>
            <div>Home</div>
            <div>TV Show</div>
            <div>New & Popular</div>
            <div>My List</div>
          </div>
          <div className="flex items-center gap-6">
            <SearchBar />
            {/* <div>▲</div>
          <div>▲</div> */}
            <button className="rounded bg-[#E50914] px-3 py-1">Sign In</button>
          </div>
        </nav>
        {children}
      </main>
    </>
  );
};
