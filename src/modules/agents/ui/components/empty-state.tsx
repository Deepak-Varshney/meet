import { AlertCircleIcon } from "lucide-react"
import Image from "next/image"

interface Props {
    title: string,
    description: string
}

export const EmptyState = ({ title, description }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <Image src={'/empty.svg'} loading="eager" alt="Empty" height={240} width={240} />
            <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center">
                <h6 className="text-lg  font-medium">{title}</h6>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    )
}
// import { ArrowUpRightIcon } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import {
//   Empty,
//   EmptyContent,
//   EmptyDescription,
//   EmptyHeader,
//   EmptyMedia,
//   EmptyTitle,
// } from "@/components/ui/empty"

// export function EmptyState() {
//   return (
//     <Empty>
//       <EmptyHeader>
//         <EmptyMedia variant="icon">
//           {/* <IconFolderCode /> */}
//         </EmptyMedia>
//         <EmptyTitle>No Projects Yet</EmptyTitle>
//         <EmptyDescription>
//           You haven&apos;t created any agents yet. Get started by creating
//           your first agent.
//         </EmptyDescription>
//       </EmptyHeader>
//       <EmptyContent className="flex-row justify-center gap-2">
//         <Button>Create Agent</Button>
//         <Button variant="outline">Import Agent</Button>
//       </EmptyContent>
//       <Button
//         variant="link"
//         asChild
//         className="text-muted-foreground"
//         size="sm"
//       >
//         <a href="#">
//           Learn More <ArrowUpRightIcon />
//         </a>
//       </Button>
//     </Empty>
//   )
// }
