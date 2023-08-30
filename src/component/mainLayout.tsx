"use client";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState, type ReactNode, useEffect } from "react";
import { SearchBar } from "./search";
import { Button } from "./button";
import { NotificationBell } from "./icons";
import { getQueryData } from "@/lib/fetcher";
import { QueryResult } from "./queryResult";
import type { Content } from "@/types";

type Props = {
  title?: string;
  children: ReactNode;
};

export const MainLayout = ({ title, children }: Props) => {
  const [changeNavBg, setChangeNavBg] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [queryData, setQueryData] = useState<undefined | Content[]>();

  useEffect(() => {
    const changeNavBgColor = () => {
      if (window.scrollY >= 60) {
        setChangeNavBg(true);
      } else {
        setChangeNavBg(false);
      }
    };
    window.addEventListener("scroll", changeNavBgColor);
  }, []);

  const handleQuery = async (input: string) => {
    const data = await getQueryData(input);
    setQueryData(data);
    console.log(data);
  };

  const LINKS = [
    "FAQ",
    "Help Center",
    "Account",
    "Media Center",
    "Investor Relations",
    "Jobs",
    "Ways to Watch",
    "Terms of Use",
    "Privacy",
    "Cookie Preferences",
    "Corporate Information",
    "Contact Us",
    "Speed Test",
    "Legal Notices",
    "Only on Netflix",
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header
        className={`sticky top-0 z-50 flex w-full justify-center transition-all duration-150 ease-in-out  ${
          changeNavBg
            ? "bg-[#181818] shadow-xl"
            : "bg-gradient-to-b from-[#000000a9] to-transparent"
        }`}
      >
        <nav className="container mx-8 flex h-16 max-w-screen-2xl items-center justify-between text-[16px] font-normal text-zinc-300 sm:mx-12 ">
          <div className="flex items-center gap-1 md:gap-6">
            <div className="cursor-pointer">
              <Link href="/" className="hidden md:block">
                <Image
                  className="h-auto w-auto"
                  src="/logo.png"
                  alt="logo"
                  width={95}
                  height={30}
                  priority={true}
                />
              </Link>
              <Link
                href="/"
                className="block md:hidden"
                onClick={() => setQuery("")}
              >
                <Image
                  className="h-auto scale-[0.6]"
                  src="/minimal_logo.png"
                  alt="logo"
                  width={21}
                  height={32}
                  priority={true}
                />
              </Link>
            </div>
            <div className="hidden gap-4 md:flex lg:gap-6">
              <Link className="transition-all hover:text-zinc-200" href={"/"}>
                Home
              </Link>
              <Link
                className="transition-all hover:text-zinc-200"
                href={"/tv-show"}
              >
                Tv Show
              </Link>
              <Link
                className="transition-all hover:text-zinc-200"
                href={"/new-and-popular"}
              >
                New & Popular
              </Link>
              <Link
                className="transition-all hover:text-zinc-200"
                href={"/my-list"}
              >
                My List
              </Link>
            </div>
            <div className="block md:hidden">
              <div className="transition-all hover:text-zinc-200">Menu</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <SearchBar
              query={query}
              setQuery={setQuery}
              handleQuery={handleQuery}
            />
            <div className="hidden cursor-pointer active:opacity-70 sm:block">
              <NotificationBell />
            </div>
            <Button
              icon={null}
              text="Sign In"
              type="netflix"
              handleClick={() => console.log("take to login page")}
            />
          </div>
        </nav>
      </header>

      <main className="flex w-full justify-center px-8 sm:px-12">
        {query === "" ? (
          children
        ) : (
          <QueryResult data={queryData} query={query} />
        )}
      </main>

      <footer className="mt-16 flex w-full justify-center text-zinc-500">
        <section className="container mx-8 max-w-screen-2xl sm:mx-12">
          <p className="container my-4 max-w-screen-2xl text-[15px]">
            Questions? Call{" "}
            <span className="cursor-pointer hover:text-zinc-400 hover:underline active:opacity-70">
              000-000-000-000
            </span>
          </p>
          <section className="container max-w-screen-2xl">
            <ul className="flex max-w-3xl flex-wrap gap-x-6 sm:gap-x-12 sm:gap-y-2 ">
              {LINKS.map((link) => (
                <li key={link} className="w-[140px] text-[13px] font-light ">
                  <Link
                    className="cursor-pointer transition-all hover:text-zinc-400"
                    href="/"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <p className="mb-8 mt-4 text-[15px]">© Netflix</p>
        </section>
      </footer>
    </>
  );
};
