import { useState, useCallback } from "react";
import { UploadFile, UploadProps } from "antd/es/upload/interface";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { message } from "antd";
// import { UploadChangeParam } from "antd/es/upload/interface";
import { useMutation } from "@tanstack/react-query";
import { uploadFilesVehicle } from "@/common/services/upload.service";
import { RcFile } from "antd/es/upload/interface";
interface UseImageUploadResult {
  fileList: UploadFile[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  previewOpen: boolean;
  setPreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  previewImage: string;
  setPreviewImage: React.Dispatch<React.SetStateAction<string>>;
  isPending: boolean;
  uploadProps: UploadProps;
  // uploadFiles: (files: File[]) => Promise<string[]>;
}

// const useImageUpload = (): UseImageUploadResult => {
//   const [fileList, setFileList] = useState<UploadFile[]>([]);
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");

//   const { mutateAsync, isPending } = useMutation({
//     mutationFn: uploadFilesVehicle,
//     onSuccess: () => {
//       message.success("Files uploaded successfully");
//     },
//     onError: (error: any) => {
//       message.error(`File upload failed: ${error.message}`);
//     },
//   });

//   const getBase64 = useCallback((file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = (error) => reject(error);
//     });
//   }, []);

//   const handleCustomRequest = useCallback(
//     async (options: UploadRequestOption) => {
//       const { file, onSuccess, onError } = options;
//       try {
//         const fileObj = file as File;
//         console.log("Uploading file:", fileObj);
//         const base64 = await getBase64(fileObj);
//         setFileList((prev) => [
//           ...prev,
//           {
//             uid: `file-${Date.now()}-${Math.random()}`,
//             name: fileObj.name,
//             status: "done",
//             url: base64,
//             thumbUrl: base64,
//             originFileObj: fileObj,
//           } as UploadFile<any>,
//         ]);
//         onSuccess?.({}, file);
//       } catch (error) {
//         onError?.(error as Error);
//       }
//     },
//     [getBase64]
//   );

//   const uploadProps: UploadProps = {
//     customRequest: handleCustomRequest,
//     onChange: ({ fileList: newFileList }) => {
//       setFileList(newFileList);
//     },
//     onPreview: async (file: UploadFile) => {
//       if (!file.url && !file.preview) {
//         file.preview = await getBase64(file.originFileObj as File);
//       }
//       setPreviewImage(file.url || (file.preview as string));
//       setPreviewOpen(true);
//     },
//     fileList,
//     listType: "picture-card",
//     accept: "image/*",
//     multiple: true,
//     maxCount: 5,
//     disabled: isPending,
//   };

//   return {
//     fileList,
//     setFileList,
//     previewOpen,
//     setPreviewOpen,
//     previewImage,
//     setPreviewImage,
//     isPending,
//     uploadProps,
//   };
// };

const useImageUpload = (): UseImageUploadResult => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const getBase64 = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }, []);

  const handleCustomRequest = useCallback(
    async (options: UploadRequestOption) => {
      const { file, onSuccess, onError } = options;
      const fileObj = file as RcFile;
      try {
        const base64 = await getBase64(fileObj);

        const newFile: UploadFile = {
          uid: fileObj.uid,
          name: fileObj.name,
          status: "done",
          url: base64,
          originFileObj: fileObj,
        };

        setFileList((prev) => [...prev, newFile]);
        onSuccess?.({}, file);
      } catch (error) {
        onError?.(error as Error);
      }
    },
    [getBase64]
  );

  const uploadProps: UploadProps = {
    customRequest: handleCustomRequest,
    fileList,
    listType: "picture-card",
    accept: "image/*",
    multiple: true,
    maxCount: 5,
    onRemove: (file) => {
      setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
    },
    onPreview: async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as File);
      }
      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
    },
  };

  return {
    fileList,
    setFileList,
    previewOpen,
    setPreviewOpen,
    previewImage,
    setPreviewImage,
    isPending: false, // bạn có thể bỏ mutation nếu không upload ngay
    uploadProps,
  };
};

export default useImageUpload;
