import { v2 as cloudinary } from "cloudinary";
import type { NextApiRequest, NextApiResponse } from "next";
import { HttpStatus } from "~/utils/HttpStatus";

export type RequestUploadUrlResponse = {
  url: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RequestUploadUrlResponse>,
): Promise<void> => {
  const {
    query: { filePath, publicId },
  } = req;

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ?? "";
  const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET ?? "";

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  const folder = "pdf/" + filePath;
  const timestamp = new Date().getTime();
  let url;
  if (!publicId) {
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET ?? "",
    );
    url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload?upload_preset=&api_key=${apiKey}&timestamp=${timestamp}&signature=${signature}&folder=${folder}`;
  } else {
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        public_id: publicId,
        overwrite: true,
        unique_filename: false,
        use_filename: false,
        invalidate: true,
        folder,
      },
      process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET ?? "",
    );
    url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload?public_id=${publicId}&upload_preset=&api_key=${apiKey}&timestamp=${timestamp}&overwrite=true&unique_filename=false&use_filename=false&invalidate=true&signature=${signature}&folder=${folder}`;
  }

  res.status(HttpStatus.OK).json({ url });
};

export default handler;
