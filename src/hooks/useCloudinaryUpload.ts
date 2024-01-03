import { FileWithPath } from "react-dropzone";

export type Urls = {
  pdfUrls: UrlsType[];
  jpgUrls: UrlsType[];
};

export type UrlsType = {
  name: string;
  path: string;
  pdfUrl?: string;
  jpgUrl?: string;
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
    const pdfUrls: UrlsType[] = [];
    const jpgUrls: UrlsType[] = [];
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
          const pdfUrl = data.secure_url;
          pdfUrls.push({
            name: file.name,
            path: filePath,
            pdfUrl,
          });
          const jpgUrl = await getJPGUrl(pdfUrl);
          jpgUrls.push({
            name: file.name,
            path: filePath,
            jpgUrl,
          });
        } catch (error) {
          throw new Error("Failed to upload to Cloudinary");
        }
      }),
    );
    return { pdfUrls, jpgUrls };
  };
  return { uploadFiles };
};
