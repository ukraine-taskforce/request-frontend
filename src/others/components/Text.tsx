export interface TextProps {
  alignment?: "center" | "left"  | "right"
}

export const Text: React.FunctionComponent<TextProps> = ({ alignment = "left", children }) => {
  return <p style={{ textAlign: alignment }}>{children}</p>;
};
