/* REACT */
import { FC, RefObject, ChangeEvent } from "react";

// Props interface
interface UploadButtonProps {
  className?: string;
  handleUpload: (file: File) => void;
  inputRef: RefObject<HTMLInputElement>;
}

const UploadButton: FC<UploadButtonProps> = ({
  inputRef,
  className,
  handleUpload,
}) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleUpload(files[0]);
    }
  };

  return (
    <input
      type="file"
      ref={inputRef}
      name="uploadButton"
      className={className}
      style={{ display: "none" }}
      onChange={handleFileChange}
      accept=".ptx, .las, .laz, .pcd, .ply, .obj, .e57"
    />
  );
};

export default UploadButton;
