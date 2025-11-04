"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  dashboardPath,
  homePath,
  userPath,
} from "@/features/constants/path-constants";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useMemo } from "react";
import { ThemeToggle } from "@/components/theme/mode-toggle";
import { AuthSession } from "@/features/auth/auth-types";
import UserMenu from "@/features/auth/components/user-menu";
import { usePathname } from "next/navigation";
import Image from "next/image";

export interface RouteProps {
  href: string;
  label: string;
}

export default function NavbarOrigin() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();

  const routeList: RouteProps[] = useMemo(() => {
    const baseRoutes = [
      {
        href: homePath(),
        label: "Home",
      },
    ];

    if (session?.user) {
      baseRoutes.push(
        {
          href: dashboardPath(),
          label: "Dashboard",
        },
        {
          href: userPath(),
          label: "My Links",
        },
      );
    }

    return baseRoutes;
  }, [session?.user]);

  return (
    <header className="animate-header-from-top sticky top-0 z-50 border-b px-6 backdrop-blur-2xl md:px-10 lg:px-20">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link
              href={homePath()}
              className="text-primary hover:text-primary/90"
            >
              <Image src={"./Logo.svg"} alt={"logo"} width={28} height={28} />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {routeList.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      asChild
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                      active={link.href === pathname}
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-4">
          {session?.user ? (
            <div className={"flex items-center gap-2"}>
              <ThemeToggle />
              <UserMenu session={session as AuthSession} />
            </div>
          ) : (
            <div className={"flex items-center gap-2"}>
              <ThemeToggle />
              <Link
                href={"/login"}
                className={buttonVariants({
                  variant: "outline",
                  className: "cursor-pointer",
                })}
              >
                <label>Login</label>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
