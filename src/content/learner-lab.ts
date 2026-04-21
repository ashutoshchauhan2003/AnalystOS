export type LabStationId =
  | "hub"
  | "kpi-wall"
  | "path-station"
  | "project-lab"
  | "activity-terminal"
  | "recommendation-console"
  | "progress-station";

export type LabStation = {
  id: LabStationId;
  label: string;
  shortLabel: string;
  title: string;
  description: string;
  position: [number, number, number];
  target: [number, number, number];
  camera: [number, number, number];
  accent: "cyan" | "blue";
  detailTitle: string;
  detailEyebrow: string;
  detailLines: string[];
  overlayKpis: { label: string; value: string }[];
  overlayNotes: string[];
};

export const labStations: LabStation[] = [
  {
    id: "hub",
    label: "Central Hub",
    shortLabel: "Hub",
    title: "Simulation Room",
    description: "Return to the central analyst chamber overview.",
    position: [0, 0, 0],
    target: [0, 1.6, 0],
    camera: [0, 4.2, 13.5],
    accent: "cyan",
    detailEyebrow: "Mission Control",
    detailTitle: "Analyst simulation room",
    detailLines: [
      "A guided 3D lab built around stations instead of flat dashboard sections.",
      "Use station navigation or keyboard shortcuts to travel between work surfaces.",
      "The environment is optimized for focused inspection, not game-like wandering.",
    ],
    overlayKpis: [
      { label: "Mode", value: "Hybrid Lab" },
      { label: "Stations", value: "6 Active" },
      { label: "Interaction", value: "Guided" },
    ],
    overlayNotes: [
      "The room acts as a spatial shell while the main interface richness lives in the HUD.",
      "Focus stations with keyboard, navigator, or scene markers.",
    ],
  },
  {
    id: "kpi-wall",
    label: "KPI Command Wall",
    shortLabel: "KPI Wall",
    title: "Metrics as a spatial control surface.",
    description: "Inspect current learning signal, streaks, and readiness metrics.",
    position: [-7.5, 0, -3.5],
    target: [-7.2, 2.2, -3.5],
    camera: [-3.1, 3.6, 5.2],
    accent: "cyan",
    detailEyebrow: "Command Wall",
    detailTitle: "Live performance signal",
    detailLines: [
      "Path completion: 68%",
      "Lab streak: 14 days",
      "Recruiter visibility score: 91",
    ],
    overlayKpis: [
      { label: "Completion", value: "68%" },
      { label: "Streak", value: "14d" },
      { label: "Signal", value: "91" },
    ],
    overlayNotes: [
      "Current performance remains strongest in stakeholder communication and structured reasoning.",
      "Use this wall to validate whether project work is improving visible hiring signal.",
    ],
  },
  {
    id: "path-station",
    label: "Active Learning Path Station",
    shortLabel: "Path",
    title: "Track movement across the analyst curriculum.",
    description: "Review modules, sequence, and what is unlocked next.",
    position: [-3.8, 0, 7.2],
    target: [-3.8, 1.8, 7.2],
    camera: [-0.4, 3.2, 11.8],
    accent: "blue",
    detailEyebrow: "Learning Path",
    detailTitle: "Business Analyst Systems Track",
    detailLines: [
      "Current focus: SQL for Decision Work",
      "Track progress: 68% complete",
      "Next unlock: Executive Narrative",
    ],
    overlayKpis: [
      { label: "Track", value: "BA Systems" },
      { label: "Progress", value: "68%" },
      { label: "Next", value: "Narrative" },
    ],
    overlayNotes: [
      "The path station is where sequencing and skill progression are reviewed before choosing the next work block.",
      "Move here when deciding what to study next, not when actively executing project work.",
    ],
  },
  {
    id: "project-lab",
    label: "Project Lab Station",
    shortLabel: "Project Lab",
    title: "A suspended workbench for active simulations and portfolio projects.",
    description: "Step toward the lab surface used for applied analyst work.",
    position: [6.8, 0, 6.3],
    target: [6.8, 1.7, 6.3],
    camera: [3.2, 3.4, 10.9],
    accent: "cyan",
    detailEyebrow: "Project Lab",
    detailTitle: "Churn retention simulation",
    detailLines: [
      "Current run: final insight framing",
      "Submission state: draft under refinement",
      "Portfolio unlock: publishable case study snapshot",
    ],
    overlayKpis: [
      { label: "Run State", value: "Active" },
      { label: "Draft", value: "Refining" },
      { label: "Output", value: "Case Study" },
    ],
    overlayNotes: [
      "This is the operational workbench station where analysis execution turns into deliverables.",
      "Open the lab surface when you need hands-on working space instead of room-level navigation.",
    ],
  },
  {
    id: "activity-terminal",
    label: "Recent Activity Feed Terminal",
    shortLabel: "Activity",
    title: "Review the latest actions and signal changes in the lab.",
    description: "A terminal surface that tracks what moved recently.",
    position: [8.4, 0, -2.6],
    target: [8.4, 1.8, -2.6],
    camera: [4.8, 3.2, 4.4],
    accent: "blue",
    detailEyebrow: "Activity Feed",
    detailTitle: "Latest signal updates",
    detailLines: [
      "Workbook revision submitted 18 minutes ago",
      "SQL checkpoint unlocked yesterday",
      "Case study draft reviewed 2 days ago",
    ],
    overlayKpis: [
      { label: "Latest", value: "18m ago" },
      { label: "Signals", value: "3 Recent" },
      { label: "State", value: "Synced" },
    ],
    overlayNotes: [
      "Use the terminal to reconstruct momentum and understand what changed across the workspace.",
      "This station supports orientation before re-entering execution or review.",
    ],
  },
  {
    id: "recommendation-console",
    label: "Recommendation Console",
    shortLabel: "Recommendations",
    title: "The system suggests the next best analyst action.",
    description: "Move to the console for targeted momentum guidance.",
    position: [2.6, 0, -8.2],
    target: [2.6, 1.8, -8.2],
    camera: [1.2, 3.4, -2.4],
    accent: "cyan",
    detailEyebrow: "Recommendation Console",
    detailTitle: "Best next action",
    detailLines: [
      "Finish the churn retention lab",
      "Estimated focus session: 42 minutes",
      "Unlocks portfolio visibility boost",
    ],
    overlayKpis: [
      { label: "Next Step", value: "42 min" },
      { label: "Priority", value: "High" },
      { label: "Impact", value: "Visibility" },
    ],
    overlayNotes: [
      "The recommendation console is the shortest path back into meaningful progress.",
      "Use it when you want the system to reduce decision fatigue and suggest the best next action.",
    ],
  },
  {
    id: "progress-station",
    label: "Progress Station",
    shortLabel: "Progress",
    title: "A radial station for multi-layer progress and trajectory.",
    description: "Inspect lessons, labs, and publication readiness.",
    position: [-8.4, 0, -9],
    target: [-8.4, 1.8, -9],
    camera: [-4.1, 3.8, -3],
    accent: "blue",
    detailEyebrow: "Progress Station",
    detailTitle: "Trajectory and completion view",
    detailLines: [
      "Lessons completed: 23 / 34",
      "Labs completed: 11 / 16",
      "Published pieces: 3 / 5",
    ],
    overlayKpis: [
      { label: "Lessons", value: "23/34" },
      { label: "Labs", value: "11/16" },
      { label: "Published", value: "3/5" },
    ],
    overlayNotes: [
      "This station gives a slower strategic view of progress instead of short-term activity.",
      "Use it to measure trajectory and identify whether work is turning into visible proof.",
    ],
  },
];
