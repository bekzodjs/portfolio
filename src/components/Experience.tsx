import { timeline } from "@/data/site";
import { Timeline } from "./Timeline";

export function Experience() {
  const items = timeline.filter((t) => t.kind === "Work");
  return <Timeline id="experience" title="Experience" items={items} />;
}
