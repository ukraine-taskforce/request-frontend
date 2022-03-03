export interface SpacerProps {
  size?: number
  horizontal?: boolean
}

export const Spacer: React.FunctionComponent<SpacerProps> = ({ size = 8, horizontal = false }) => {
  return <div style={{ display: "flex", [horizontal ? "width" : "height"]: `${size}px`}} />;
};
