import type { Project } from "@/data/site";

const INK = "#020c10";
const COAL = "#0a2129";
const PANEL = "#123039";
const BONE = "#eaf7f8";
const TURQ = "#35e0d2";
const LAPIS = "#1aa3c4";
const SAFFRON = "#b5f5ff";

function Bar({
  x,
  y,
  w,
  h = 8,
  fill = BONE,
  o = 1,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  fill?: string;
  o?: number;
}) {
  return (
    <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} opacity={o} />
  );
}

function BrowserChrome() {
  return (
    <>
      <rect
        x="40"
        y="36"
        width="560"
        height="384"
        rx="14"
        fill={COAL}
        stroke={BONE}
        strokeOpacity="0.12"
      />
      <circle cx="62" cy="56" r="4" fill={BONE} opacity="0.25" />
      <circle cx="76" cy="56" r="4" fill={BONE} opacity="0.25" />
      <circle cx="90" cy="56" r="4" fill={BONE} opacity="0.25" />
      <rect
        x="220"
        y="48"
        width="200"
        height="16"
        rx="8"
        fill={BONE}
        opacity="0.07"
      />
      <line
        x1="40"
        y1="76"
        x2="600"
        y2="76"
        stroke={BONE}
        strokeOpacity="0.1"
      />
    </>
  );
}

function SitePreview() {
  return (
    <>
      <BrowserChrome />
      <Bar x={68} y={126} w={190} h={16} />
      <Bar x={68} y={152} w={140} h={16} />
      <Bar x={68} y={186} w={170} h={6} o={0.35} />
      <Bar x={68} y={200} w={130} h={6} o={0.35} />
      <rect x="68" y="226" width="96" height="30" rx="15" fill={TURQ} />
      {/* curtains */}
      <g>
        {Array.from({ length: 9 }, (_, i) => (
          <rect
            key={i}
            x={330 + i * 27}
            y={104}
            width={22}
            height={170}
            rx={11}
            fill={i % 2 ? LAPIS : TURQ}
            opacity={0.35 + (i % 3) * 0.2}
          />
        ))}
        <rect x="322" y="98" width="258" height="8" rx="4" fill={SAFFRON} />
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={68 + i * 172}
            y={304}
            width={160}
            height={92}
            rx={12}
            fill={PANEL}
          />
          <circle
            cx={92 + i * 172}
            cy={330}
            r={10}
            fill={[TURQ, SAFFRON, LAPIS][i]}
          />
          <Bar x={82 + i * 172} y={354} w={90} h={7} o={0.8} />
          <Bar x={82 + i * 172} y={370} w={60} h={6} o={0.3} />
        </g>
      ))}
    </>
  );
}

function BotPreview() {
  return (
    <g transform="translate(34 6) scale(0.895)">
      <rect
        x="215"
        y="20"
        width="210"
        height="420"
        rx="30"
        fill={COAL}
        stroke={BONE}
        strokeOpacity="0.14"
      />
      <rect
        x="290"
        y="32"
        width="60"
        height="8"
        rx="4"
        fill={BONE}
        opacity="0.15"
      />
      {/* chat */}
      <rect x="232" y="66" width="120" height="30" rx="14" fill={PANEL} />
      <Bar x={246} y={78} w={80} h={6} o={0.6} />
      <rect x="298" y="106" width="110" height="30" rx="14" fill={LAPIS} />
      <Bar x={312} y={118} w={70} h={6} o={0.9} />
      <rect x="232" y="146" width="96" height="30" rx="14" fill={PANEL} />
      <Bar x={246} y={158} w={56} h={6} o={0.6} />
      {/* mini app sheet */}
      <rect x="223" y="196" width="194" height="236" rx="22" fill={PANEL} />
      <rect
        x="296"
        y="206"
        width="48"
        height="5"
        rx="2.5"
        fill={BONE}
        opacity="0.2"
      />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x={237 + (i % 2) * 86}
            y={226 + Math.floor(i / 2) * 78}
            width={78}
            height={68}
            rx={12}
            fill={INK}
          />
          <path
            d={`M${276 + (i % 2) * 86} ${240 + Math.floor(i / 2) * 78} l5 11 12 1 -9 8 3 12 -11 -7 -11 7 3 -12 -9 -8 12 -1z`}
            fill={[SAFFRON, TURQ, LAPIS, SAFFRON][i]}
            transform={`scale(0.72)`}
            style={{
              transformOrigin: `${276 + (i % 2) * 86}px ${256 + Math.floor(i / 2) * 78}px`,
            }}
          />
          <Bar
            x={247 + (i % 2) * 86}
            y={280 + Math.floor(i / 2) * 78}
            w={40}
            h={5}
            o={0.5}
          />
        </g>
      ))}
      <rect x="237" y="388" width="166" height="32" rx="16" fill={TURQ} />
      <Bar x={290} y={401} w={60} h={6} fill={INK} o={0.8} />
    </g>
  );
}

function DashboardPreview() {
  const bars = [54, 86, 40, 112, 72, 128, 94];
  return (
    <>
      <BrowserChrome />
      <rect x="41" y="77" width="118" height="342" fill={INK} opacity="0.5" />
      <rect x="56" y="96" width="24" height="24" rx="6" fill={SAFFRON} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Bar
          key={i}
          x={56}
          y={146 + i * 28}
          w={i === 1 ? 84 : 64}
          h={8}
          fill={i === 1 ? TURQ : BONE}
          o={i === 1 ? 1 : 0.25}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={178 + i * 138}
            y={96}
            width={126}
            height={62}
            rx={10}
            fill={PANEL}
          />
          <Bar x={190 + i * 138} y={110} w={50} h={6} o={0.35} />
          <Bar
            x={190 + i * 138}
            y={128}
            w={72}
            h={14}
            fill={[BONE, TURQ, SAFFRON][i]}
          />
        </g>
      ))}
      <rect x="178" y="172" width="264" height="150" rx="10" fill={PANEL} />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={196 + i * 34}
          y={306 - h}
          width={20}
          height={h}
          rx={5}
          fill={i === 5 ? TURQ : LAPIS}
          opacity={i === 5 ? 1 : 0.75}
        />
      ))}
      <rect x="454" y="172" width="126" height="150" rx="10" fill={PANEL} />
      <circle
        cx="517"
        cy="240"
        r="38"
        fill="none"
        stroke={BONE}
        strokeOpacity="0.12"
        strokeWidth="12"
      />
      <circle
        cx="517"
        cy="240"
        r="38"
        fill="none"
        stroke={SAFFRON}
        strokeWidth="12"
        strokeDasharray="150 239"
        strokeLinecap="round"
        transform="rotate(-90 517 240)"
      />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <line
            x1="178"
            y1={348 + i * 24}
            x2="580"
            y2={348 + i * 24}
            stroke={BONE}
            strokeOpacity="0.08"
          />
          <Bar x={178} y={356 + i * 24} w={110 - i * 14} h={6} o={0.5} />
          <Bar x={360} y={356 + i * 24} w={50} h={6} o={0.25} />
          <Bar
            x={530}
            y={356 + i * 24}
            w={50}
            h={6}
            fill={i === 1 ? SAFFRON : TURQ}
            o={0.9}
          />
        </g>
      ))}
    </>
  );
}

/** Drawn stand-in for a project screenshot. Set `image` on the project to use a real one. */
export function ProjectPreview({
  kind,
  label,
}: {
  kind: Project["preview"];
  /** Accessible description, e.g. "Preview of Ombor". */
  label: string;
}) {
  return (
    <svg
      viewBox="0 0 640 420"
      className="h-full w-full"
      role="img"
      aria-label={label}
    >
      {kind === "site" ? (
        <SitePreview />
      ) : kind === "bot" ? (
        <BotPreview />
      ) : (
        <DashboardPreview />
      )}
    </svg>
  );
}
