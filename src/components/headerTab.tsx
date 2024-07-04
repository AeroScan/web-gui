/* REACT */
import { FC } from "react";

/* UTILS */
import { TTabChildItem } from "../utils/types/tabs";

interface HeaderTabProps {
  items: TTabChildItem[];
}

const HeaderTab: FC<HeaderTabProps> = ({ items }) => {
  return (
    <div className="w-full h-24 flex items-center justify-center gap-8 mb-4">
      {items
        .filter((i) => i.active)
        .map(({ key, action, label, icon, ref }) => (
          <div
            key={key}
            ref={ref}
            onClick={action}
            className={"flex flex-col items-center justify-center gap-2 rounded-xl p-2 transition-all duration-300 cursor-pointer hover:bg-green hover:bg-opacity-15 active:opacity-50"}
          >
            <img
              src={icon}
              alt={`${label} Icon`}
              className="aspect-square w-12"
            />
            <span className="font-semibold text-brown">{label}</span>
          </div>
        ))}
    </div>
  );
};

export default HeaderTab;
