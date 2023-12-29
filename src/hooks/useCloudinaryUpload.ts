import { FileWithPath } from "react-dropzone";

export type Urls = {
  pdfUrls: string[];
  jpgUrls: string[];
};

export const useCloudinaryUpload = () => {
  const getUploadUrl = async (filePath: string): Promise<string> => {
    const response = await fetch(
      `/api/upload/url?filePath=${filePath}&publicId=main`,
      {
        method: "POST",
        body: JSON.stringify({ filePath }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data.url;
    } else {
      throw new Error("Failed to upload to Cloudinary");
    }
  };

  const getJPGUrl = async (pdfUrl: string): Promise<string> => {
    const response = await fetch(`/api/upload/jpg`, {
      method: "POST",
      body: JSON.stringify({ pdfUrl }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.secureUrl;
    } else {
      throw new Error("Failed to upload to Cloudinary");
    }
  };

  const uploadFiles = async (files: FileWithPath[]): Promise<Urls> => {
    const pdfUrls: string[] = [];
    const jpgUrls: string[] = [];
    await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const filePath = file.path ?? "";

        try {
          const url = await getUploadUrl(filePath);
          const response = await fetch(url, {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          pdfUrls.push(data.secure_url);
          const jpgUrl = await getJPGUrl(data.secure_url);
          jpgUrls.push(jpgUrl);
        } catch (error) {
          throw new Error("Failed to upload to Cloudinary");
        }
      }),
    );
    return { pdfUrls, jpgUrls };
  };
  return { uploadFiles };
};
