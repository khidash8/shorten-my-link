import { BoltIcon, ChevronDownIcon, House, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutButton from "@/features/auth/components/sign-out-button";
import {
  dashboardPath,
  homePath,
  userPath,
} from "@/features/constants/path-constants";
import { cloneElement, ReactElement, useMemo } from "react";
import Link from "next/link";
import { AuthSession } from "@/features/auth/auth-types";

type iAPeProps = {
  session: AuthSession | null;
};

type iDropMenuList = {
  href: string;
  label: string;
  icon: ReactElement<{ className: string }>;
};

export default function UserMenu({ session }: iAPeProps) {
  const dropMenuList: iDropMenuList[] = useMemo(() => {
    return [
      {
        href: homePath(),
        label: "Home",
        icon: <House />,
      },
      {
        href: dashboardPath(),
        label: "Dashboard",
        icon: <BoltIcon />,
      },
      {
        href: userPath(),
        label: "My Links",
        icon: <UserIcon />,
      },
    ];
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src={session?.user?.image || ""} alt="Profile image" />
            <AvatarFallback>
              {session?.user?.name[0]?.toUpperCase() ||
                session?.user?.email[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <ChevronDownIcon
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 max-w-64 min-w-48">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {session?.user?.name || "User"}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {session?.user?.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {dropMenuList.map((item) => (
            <DropdownMenuItem
              key={item.label}
              className={"cursor-pointer"}
              asChild
            >
              <Link href={item.href}>
                {cloneElement(item.icon, { className: "size-4 opacity-60" })}
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem className={"p-0"}>
          {session ? <SignOutButton /> : null}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
