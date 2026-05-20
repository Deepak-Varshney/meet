"use client";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Drawer, DrawerContent, DrawerDescription, DrawerTrigger, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import { useRouter } from "next/navigation";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const DashboardUserButton = () => {
    const router = useRouter();
    const isMobile = useIsMobile();

    const { data, isPending } = authClient.useSession();
    if (isPending || !data?.user) {
        return null;
    }
    const initials = data.user.name
        ?.split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "U";
    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger asChild
                    className="w-full"
                >
                    <Button
                        variant="ghost"
                        className="w-full justify-start h-auto p-3 rounded-lg"
                    >
                        <div className="flex items-center gap-3 w-full overflow-hidden">
                            <Avatar className="h-10 w-10 shrink-0">
                                <AvatarImage
                                    src={data.user.image || ""}
                                    alt={data.user.name}
                                />
                                <AvatarFallback>
                                    {initials}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col items-start overflow-hidden">
                                <span className="truncate text-sm font-medium">
                                    {data.user.name}
                                </span>

                                <span className="truncate text-xs text-muted-foreground">
                                    {data.user.email}
                                </span>

                            </div>
                            <ChevronDownIcon className="size-5" />
                        </div>
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{data.user.name}</DrawerTitle>
                        <DrawerDescription>{data.user.email}</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button variant="destructive" onClick={() =>
                            authClient.signOut({
                                fetchOptions: {
                                    onSuccess: () => {
                                        router.push("/sign-in");
                                    },
                                },
                            })
                        }>
                            Logout<LogOutIcon className="size-4" />
                        </Button>
                        <Button variant={"outline"}>
                            Billing
                            <CreditCardIcon className="size-4" />
                        </Button>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer >
        )
    }



    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
                className="w-full"
            >
                <Button
                    variant="ghost"
                    className="w-full justify-start h-auto p-3 rounded-lg"
                >
                    <div className="flex items-center gap-3 w-full overflow-hidden">
                        <Avatar className="h-10 w-10 shrink-0">
                            <AvatarImage
                                src={data.user.image || ""}
                                alt={data.user.name}
                            />
                            <AvatarFallback>
                                {initials}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col items-start overflow-hidden">
                            <span className="truncate text-sm font-medium">
                                {data.user.name}
                            </span>

                            <span className="truncate text-xs text-muted-foreground">
                                {data.user.email}
                            </span>
                        </div>
                        <ChevronDownIcon className="size-5" />

                    </div>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                side="right"
                className="w-44"
            >
                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        My Account
                    </DropdownMenuLabel>

                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() =>
                            authClient.signOut({
                                fetchOptions: {
                                    onSuccess: () => {
                                        router.push("/sign-in");
                                    },
                                },
                            })
                        }
                    >
                        Logout
                        <LogOutIcon className="size-4 ml-auto" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};