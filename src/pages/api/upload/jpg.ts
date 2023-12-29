import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { pdfUrl } = req.body;
    const result = await cloudinary.uploader.upload(pdfUrl, {
      resource_type: "image",
      format: "jpg",
      page: 1,
    });
    res.status(200).json({ secureUrl: result.secure_url });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
