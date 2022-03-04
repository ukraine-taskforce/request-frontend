export interface TextProps {
  alignment?: "center" | "left" | "right";
  variant?: "normal" | "light";
}

export const Text: React.FunctionComponent<TextProps> = ({ alignment = "left", variant = "normal", children }) => {
  return <p style={{ textAlign: alignment, opacity: variant === "light" ? 0.6 : 1 }}>{children}</p>;
};
