type Props = {
  children: React.ReactNode;
};

const AminityItem = ({ children }: Props) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

export default AminityItem;
