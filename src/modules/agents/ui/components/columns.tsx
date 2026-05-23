// "use client"

// import { ColumnDef } from "@tanstack/react-table"
// import { AgentGetOne } from "../../types"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { CornerDownRightIcon, MoreVerticalIcon, PencilIcon, Trash2Icon, VideoIcon } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { EditAgentDialog } from "./agent-dialog"
// import { useState } from "react"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


// export const columns: ColumnDef<AgentGetOne>[] = [
//   {
//     accessorKey: "name",
//     header: "Agent Name",
//     cell: ({ row }) => {
//       const avatarFallback = row.original.name ? row.original.name.substring(0, 2).toUpperCase() : "AG"
//       return (
//         < div className="flex flex-col gap-y-1" >
//           <div className="flex items-center gap-x-2">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src="" alt={row.original.name || "Agent Avatar"} />
//               <AvatarFallback>{avatarFallback}</AvatarFallback>
//             </Avatar>
//             <span className="font-semibold capitalize">{row.original.name}</span>
//           </div>
//           <div className="flex items-center gap-x-1.5">
//             <CornerDownRightIcon className="size-3 text-muted-foreground" />
//             <span className="text-sm text-muted-foreground max-w-50 truncate capitalize">{row.original.instructions}</span>
//           </div>
//         </div>
//       )
//     }
//   },
//   {
//     accessorKey: "meetingCount",
//     header: "Meetings",
//     cell: ({ row }) => (
//       <Badge
//         className="flex items-center gap-x-2 [&>svg]:size-4"
//         variant={"outline"}
//       >
//         <VideoIcon className="text-blue-700" />
//         {row.original.meetingCount} {row.original.meetingCount === 1 ? "meeting" : "meetings"}
//       </Badge>
//     )
//   }, {
//     header: "Options",
//     cell: ({ row }) => {
//       const [isDialogOpen, setIsDialogOpen] = useState(false);
//       return (<>
//         <DropdownMenu modal={false}>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost">
//               <MoreVerticalIcon />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem>
//               <PencilIcon className="size-4 text-black" />
//               Edit
//             </DropdownMenuItem>
//             <DropdownMenuItem >
//               <Trash2Icon className="size-4 text-black" />
//               Delete
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </>
//       )
//     }
//   }
// ]


"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AgentGetOne } from "../../types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CornerDownRightIcon, PencilIcon, Trash2Icon, VideoIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EditAgentDialog } from "./agent-dialog"
import { useState } from "react"


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
    cell: ({ row }) => (
      <Badge
        className="flex items-center gap-x-2 [&>svg]:size-4"
        variant={"outline"}
      >
        <VideoIcon className="text-blue-700" />
        {row.original.meetingCount} {row.original.meetingCount === 1 ? "meeting" : "meetings"}
      </Badge>
    )
  }, {
    header: "Options",
    cell: ({ row }) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      return (<>
        <EditAgentDialog initialValues={row.original} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        <div className="flex items-center justify-end gap-x-2">
          <Button variant={"outline"} onClick={() => setIsDialogOpen(prev => !prev)}>
            <PencilIcon />
          </Button>
          <Button variant={"destructive"}>
            <Trash2Icon />
          </Button>
        </div>
      </>
      )
    }
  }
]

