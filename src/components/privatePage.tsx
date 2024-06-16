/* REACT */
import { FC, HTMLAttributes } from "react";
import { Navigate } from "react-router";

// Props interface
interface PrivatePageProps extends HTMLAttributes<HTMLDivElement> {}

const PrivatePage: FC<PrivatePageProps> = ({ children, ...props }) => {
  return localStorage.getItem("authEmail") ? (
    <div {...props}>{children}</div>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivatePage;
