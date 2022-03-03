export interface CardProps {}

export const Card: React.FunctionComponent<CardProps> = ({ children }) => {
  return <div>{children}</div>;
};
