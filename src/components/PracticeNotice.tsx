import { PRACTICE_NOTICE } from "@/lib/site";

type PracticeNoticeProps = {
  className?: string;
};

export default function PracticeNotice({ className = "" }: PracticeNoticeProps) {
  return (
    <p
      role="note"
      className={`bg-notice px-4 py-3 text-sm text-notice-ink ${className}`.trim()}
    >
      {PRACTICE_NOTICE}
    </p>
  );
}
