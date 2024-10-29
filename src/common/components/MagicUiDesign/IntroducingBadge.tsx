import { Badge } from "../../../magicUi/ui/badge"
import { Compass } from "lucide-react"

export default function IntroducingBadge() {
    return (
        <Badge
            variant="secondary"
            className="text-base bg-teal-100 text-teal-700 px-3 py-1 rounded-full mb-4"
        >
            <Compass className="stroke-white-500 mr-2" size={16} />
            <span className="font-bold">Introducing</span>
        </Badge>
    )
}
