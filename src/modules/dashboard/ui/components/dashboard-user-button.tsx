
import { authClient } from "@/lib/auth-client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { LogOutIcon } from "lucide-react"





export const DashboardUserButton = () => {
    const { data, isPending } = authClient.useSession();
    if (isPending || !data?.user) {
        return null;
    }
    const router = useRouter();
    const initials =
        data.user.name
            ?.split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U"
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
                                src={data?.user?.image || ""}
                                alt={data.user.name}
                            />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col items-start overflow-hidden">
                            <span className="truncate text-sm font-medium">
                                {data.user.name}
                            </span>

                            <span className="truncate text-xs text-muted-foreground">
                                {data.user.email}
                            </span>
                        </div>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-44">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => authClient.signOut({
                        fetchOptions: {
                            onSuccess: () => router.push("/sign-in")
                        }
                    })}>Logout
                    <LogOutIcon className="size-4"/>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}