import styles from './Card.module.css'; 


export interface CardProps {}

export const Card: React.FunctionComponent<CardProps> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
