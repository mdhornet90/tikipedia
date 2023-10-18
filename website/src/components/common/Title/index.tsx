import styles from "./Title.module.css";

type Alignment = "left" | "right";
type Size = "small" | "medium" | "large" | "extraLarge";

interface TitleProps {
  title: string;
  size: Size;
  alignment?: Alignment;
}

export default function Title({ title, size, alignment }: TitleProps) {
  const className = ["title", size, alignment]
    .filter((e) => !!e)
    .map((s) => styles[s as string])
    .join(" ");
  return <span className={className}>{title}</span>;
}
