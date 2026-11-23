
import { ImageKit, toFile } from "@imagekit/nodejs";

import {
  requireAdmin,
  authErrorResponse,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

function isValidImage(
  bytes: Buffer,
  mime: string
) {
  if (mime === "image/jpeg") {
    return (
      bytes.length >= 3 &&
      bytes[0] === 0xff &&
      bytes[1] === 0xd8 &&
      bytes[2] === 0xff
    );
  }

  if (mime === "image/png") {
    return (
      bytes.length >= 8 &&
      bytes.subarray(0, 8).equals(
        Buffer.from([
          137, 80, 78, 71, 13, 10, 26, 10,
        ])
      )
    );
  }

  if (mime === "image/webp") {
    return (
      bytes.length >= 12 &&
      bytes.toString("ascii", 0, 4) === "RIFF" &&
      bytes.toString("ascii", 8, 12) === "WEBP"
    );
  }

  if (mime === "image/avif") {
    return (
      bytes.length >= 12 &&
      bytes.toString("ascii", 4, 8) === "ftyp" &&
      bytes.subarray(8, 32).includes(
        Buffer.from("avif")
      )
    );
  }

  return false;
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request);
  } catch (error) {
    return authErrorResponse(error);
  }

  const privateKey =
    process.env.IMAGEKIT_PRIVATE_KEY;

  if (!privateKey) {
    return Response.json(
      {
        success: false,
        message: "ImageKit is not configured.",
      },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json(
        {
          success: false,
          message: "No image selected.",
        },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return Response.json(
        {
          success: false,
          message: "Unsupported image format.",
        },
        { status: 400 }
      );
    }

    if (
      file.size === 0 ||
      file.size > MAX_FILE_SIZE
    ) {
      return Response.json(
        {
          success: false,
          message: "Image must be under 10 MB.",
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    if (!isValidImage(buffer, file.type)) {
      return Response.json(
        {
          success: false,
          message: "Invalid image file.",
        },
        { status: 400 }
      );
    }

    const imagekit = new ImageKit({ privateKey });

    const safeName = file.name
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .slice(0, 120);

    const uploadable = await toFile(
      buffer,
      safeName,
      { type: file.type }
    );

    const result = await imagekit.files.upload({
      file: uploadable,
      fileName: safeName,
      folder: "/alfateh/blogs",
      useUniqueFileName: true,
    });

    return Response.json({
      success: true,
      url: result.url,
      fileId: result.fileId,
    });
  } catch (error) {
    console.error("Image upload error:", error);

    return Response.json(
      {
        success: false,
        message: "Image upload failed.",
      },
      { status: 500 }
    );
  }
}
