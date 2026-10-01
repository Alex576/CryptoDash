export interface PortfolioProps {
  prop?: string;
}

export function Portfolio({ prop = "default value" }: PortfolioProps) {
  return <div>Portfolio {prop}</div>;
}
