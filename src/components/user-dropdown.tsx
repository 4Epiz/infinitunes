"use client";

import Image from "next/image";
import Link from "next/link";
import { Cog, LogOut, Monitor, Moon, Sun, SunMoon, User2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

import type { User } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type UserDropdownProps = {
  user?: User;
};

export function UserDropdown({ user }: UserDropdownProps) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <Avatar className="border shadow-sm">
          <AvatarImage
            src={user?.image ?? undefined}
            alt={user?.name ?? "Guest User"}
          />
          <AvatarFallback asChild>
            <Image
              src="/images/placeholder/user.jpg"
              alt={user?.name ?? "Guest User"}
              fill
              className="dark:invert"
            />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="end"
        className="w-[150px] max-w-[250px]"
      >
        <DropdownMenuLabel className="flex flex-col">
          <span className="truncate">{user?.name ?? "Guest User"}</span>
          <span className="truncate text-sm font-normal text-muted-foreground">
            {user?.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem disabled={user === undefined} asChild>
          <Link href="/me">
            <User2 size={16} className="mr-2" />
            My Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Cog size={16} className="mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <SunMoon size={16} className="mr-2" />
            Theme
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun size={16} className="mr-2" />
                Light
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon size={16} className="mr-2" />
                Dark
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor size={16} className="mr-2" />
                System
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        {user && (
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut size={16} className="mr-2" />
            Log Out
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
