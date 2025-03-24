import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Loader from "./Notifications/Loader";
import { updateProfileService } from "../Redux/APIs/userServices";
import uploadImageService from "../Redux/APIs/ImageUploadService";
export default function Uploder({ setImageUrl }) {
  const [loading, setLoading] = useState(false);

  //upload file
  const onDrop = useCallback(
    async (acceptedFilees) => {
      const file = new FormData();
      file.append("file", acceptedFilees[0]);
      const data = await uploadImageService(file, setLoading);
      setImageUrl(data);
      // console.log(data);

      // console.log(acceptedFilees[0]);
    },
    [setImageUrl]
  );
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: false,
      onDrop,
    });
  return (
    <div className="w-full text-center gap-6">
      {loading ? (
        <div className="px-6 w-full py-8 border-border border-dashed bg-dry rounded-md">
          <Loader />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="px-6 pt-5 pb-6 border-2 border-border border-dashed bg-main rounded-md cursor-pointer "
        >
          <input {...getInputProps()} />
          <span className="mx-auto flex-colo text-subMain text-3xl">
            <FiUploadCloud />
          </span>
          <p className="text-sm mt-2">Drag your image here</p>
          <em className="text-xs text-border">
            {isDragActive
              ? "Drop it like it's hot"
              : isDragReject
              ? "Unsupported file type..."
              : "only .jpg and p.ng files will be accepted"}
          </em>
        </div>
      )}
    </div>
  );
}
