interface MetaItemProps {
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  isBlock?: boolean;
  isBold?: boolean;
}
const MetaItem = ({ label, icon, content, isBlock, isBold }: MetaItemProps) => {
  return (
    <div className="flex items-center gap-x-2">
      {!isBlock && icon}
      <div className={`flex ${isBlock && "flex-col"} gap-x-2`}>
        <p className={`flex ${isBold && "font-semibold gap-x-2"} `}>
          {isBlock && icon} {label}
        </p>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default MetaItem;
