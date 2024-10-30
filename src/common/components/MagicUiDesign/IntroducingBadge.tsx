import { Badge } from "../../../magicUi/ui/badge";
import { Compass } from "lucide-react";

export default function IntroducingBadge() {
  return (
    <Badge
      variant="secondary"
      className="introducingBadge text-base bg-teal-100 text-teal-700 px-3 py-1 rounded-full mb-4"
    >
      <Compass
        className="introducingBadgeSvg stroke-white-500 mr-2"
        size={16}
      />
      <span className="introducingBadgeText font-bold">Introducing</span>
    </Badge>
  );
}
