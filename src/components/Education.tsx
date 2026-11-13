import { timeline } from "@/data/site";
import { Timeline } from "./Timeline";

export function Education() {
  const items = timeline.filter((t) => t.kind === "Education");
  return <Timeline id="education" title="Education" items={items} />;
}
