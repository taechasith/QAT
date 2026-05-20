import type { ContentType } from "@/lib/data/content";

type Guide = {
  label: string;
  hint: string;
  extraFields: string[];
};

const guides: Record<ContentType, Guide> = {
  event: {
    label: "Event",
    hint: "A workshop, talk, exhibition opening, or any time-bound gathering.",
    extraFields: ["Start date", "End date", "Location", "External registration URL"],
  },
  project: {
    label: "Project",
    hint: "A research project, collaborative initiative, or ongoing QAT program.",
    extraFields: ["External project URL", "Project collaborators (in body)"],
  },
  game: {
    label: "Game",
    hint: "An interactive quantum learning experience or creative digital game.",
    extraFields: ["External play URL"],
  },
  course: {
    label: "Course",
    hint: "A structured learning program. Include level, schedule, and enrollment link.",
    extraFields: ["External enrollment URL", "Start date (course begins)"],
  },
  exhibition: {
    label: "Exhibition",
    hint: "A past or upcoming exhibition, installation, or public art event.",
    extraFields: ["Start date", "End date", "Location / Venue"],
  },
  research_article: {
    label: "Research / Article",
    hint: "A paper, essay, or editorial from QAT collaborators or scientists.",
    extraFields: ["External DOI or publication URL", "Author names (in body)"],
  },
  news: {
    label: "News",
    hint: "An announcement, press release, or update about QAT or its partners.",
    extraFields: ["Related event or project (mention in body)"],
  },
  talk: {
    label: "Talk",
    hint: "A lecture, panel discussion, or conversation at the intersection of quantum science and culture.",
    extraFields: ["Speaker name(s) (in body)", "External recording URL", "Start date"],
  },
  experiment: {
    label: "Experiment",
    hint: "An interactive or conceptual experiment exploring quantum phenomena through art and design.",
    extraFields: ["External demo URL", "Tools / materials used (in body)"],
  },
  video: {
    label: "Video",
    hint: "A documentary, artistic, or educational video work produced under the QAT initiative.",
    extraFields: ["External video URL (YouTube, Vimeo, etc.)"],
  },
};

type CategoryGuideProps = {
  contentType: ContentType;
};

export function CategoryGuide({ contentType }: CategoryGuideProps) {
  const guide = guides[contentType];

  return (
    <div className="rounded-lg border border-violet-200/15 bg-violet-200/5 px-4 py-3 text-sm">
      <p className="font-semibold text-violet-200">{guide.label}</p>
      <p className="mt-1 text-slate-300">{guide.hint}</p>
      {guide.extraFields.length > 0 ? (
        <ul className="mt-2 list-disc pl-4 text-xs text-slate-400 space-y-0.5">
          {guide.extraFields.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
