import { Box, Button } from "theme-ui";

export default function Pagination({
    hasMore,
    hasPrev,
    onNext,
    onPrev,
}: {
    hasMore: boolean;
    hasPrev: boolean;
    onNext: () => void;
    onPrev: () => void;
}) {
  return (
    <Box mt={"auto"} mx={"auto"}>
      <Button
        onClick={onPrev}
        variant="previous"
        disabled={!hasPrev}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M15 18l-6-6 6-6"></path>
        </svg>
        <span>Previous</span>
      </Button>

      <Button
        onClick={onNext}
        variant="next"
        disabled={!hasMore}
      >
        <span>Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M9 18l6-6-6-6"></path>
        </svg>
      </Button>
    </Box>
  );
}
