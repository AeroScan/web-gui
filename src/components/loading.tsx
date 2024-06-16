/* REACT */
import { FC } from "react";

/* COMPONENTS */
import { Spin } from "antd";

// Props interface
interface LoadingProps {
  text: string;
}

const Loading: FC<LoadingProps> = ({ text }) => (
  <div className="flex flex-col items-center justify-center gap-12 fixed top-0 left-0 z-[100] w-screen h-screen bg-black bg-opacity-90">
    <Spin size="large" />
    <h1 className="text-white font-semibold text-xl">{text}...</h1>
  </div>
);

export default Loading;
