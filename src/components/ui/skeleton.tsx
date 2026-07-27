interface SkeletonProps {
  className?: string;
}

export default function Skeleton({
  className = '',
}: SkeletonProps): React.JSX.Element {
  return (
    <div
      className={`animate-pulse rounded-full bg-surface ${className}`}
      aria-hidden='true'
    />
  );
}
