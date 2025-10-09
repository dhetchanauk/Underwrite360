import type React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle2, AlertCircle, XCircle, Clock } from "lucide-react"

interface StatusChipProps {
  status: "Eligible" | "Conditional" | "Refer" | "Decline" | "Pending"
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  let bgColor = ""
  let textColor = ""
  let icon: React.ReactNode = null

  switch (status) {
    case "Eligible":
      bgColor = "bg-green-100"
      textColor = "text-green-700"
      icon = <CheckCircle2 className="w-4 h-4 mr-1" />
      break
    case "Conditional":
      bgColor = "bg-orange-100"
      textColor = "text-orange-700"
      icon = <AlertCircle className="w-4 h-4 mr-1" />
      break
    case "Refer":
      bgColor = "bg-yellow-100"
      textColor = "text-yellow-700"
      icon = <AlertCircle className="w-4 h-4 mr-1" />
      break
    case "Decline":
      bgColor = "bg-red-100"
      textColor = "text-red-700"
      icon = <XCircle className="w-4 h-4 mr-1" />
      break
    case "Pending":
      bgColor = "bg-gray-100"
      textColor = "text-gray-700"
      icon = <Clock className="w-4 h-4 mr-1" />
      break
    default:
      bgColor = "bg-gray-100"
      textColor = "text-gray-700"
      break
  }

  return (
    <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-sm font-medium", bgColor, textColor)}>
      {icon}
      {status}
    </span>
  )
}

export default StatusChip
