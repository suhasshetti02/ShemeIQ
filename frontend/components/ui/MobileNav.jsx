"use client";
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { Link as ScrollLink } from "react-scroll";

const links = [
  {
    name: "home",
    path: "/",
  },
  // {
  //   name: "services",
  //   path: "/services",
  // },
  {
    name: "resume",
    path: "resume",
  },
  {
    name: "Projects",
    path: "work",
  },
  {
    name: "contact",
    path: "contact",
  },
];
const MobileNav = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger>
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex flex-col 
       transition-all duration-500 ease-in-out
    data-[state=open]:translate-x-0 data-[state=open]:opacity-100
    data-[state=closed]:translate-x-full data-[state=closed]:opacity-0"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold">
            Suhas <span className="text-accent">.</span>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              Suhas <span className="text-accent">.</span>
            </h1>
          </Link>
        </div>

        <nav className="flex flex-col gap-8 items-center justify-center">
          {links.map((link, index) =>
            link.name === "resume" || link.name === "contact" || link.name === "work" ? (
              <SheetTrigger asChild key={index}>
                <ScrollLink
                  to={link.path}
                  smooth={true}
                  duration={800}
                  offset={-20}
                  className="text-xl capitalize hover:text-accent transition-all cursor-pointer"
                  activeClass="text-accent border-b-2 border-accent"
                >
                  {link.name}
                </ScrollLink>
              </SheetTrigger>
            ) : (
              <SheetTrigger asChild key={index}>
                <Link
                  href={link.path}
                  className={`${
                    link.path === pathname &&
                    "text-accent border-b-2 border-accent"
                  } text-xl capitalize hover:text-accent transition-all`}
                >
                  {link.name}
                </Link>
              </SheetTrigger>
            )
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
