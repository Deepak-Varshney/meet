"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AgentGetOne } from "../../types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CornerDownRightIcon, VideoIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"


export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => {
      const avatarFallback = row.original.name ? row.original.name.substring(0, 2).toUpperCase() : "AG"
      return (
        < div className="flex flex-col gap-y-1" >
          <div className="flex items-center gap-x-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" alt={row.original.name || "Agent Avatar"} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <span className="font-semibold capitalize">{row.original.name}</span>
          </div>
          <div className="flex items-center gap-x-1.5">
            <CornerDownRightIcon className="size-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground max-w-50 truncate capitalize">{row.original.instructions}</span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: () => (
      <Badge
        className="flex items-center gap-x-2 [&>svg]:size-4"
        variant={"outline"}
      >
        <VideoIcon className="text-blue-700" />
        5 Meetings
      </Badge>
    )
  }
]