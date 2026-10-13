import path from "node:path";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { PDFParse } from "pdf-parse";

const TWO_MB = 2 * 1024 * 1024;

export const UPLOADS_DIR = fileURLToPath(
  new URL("../uploads/", import.meta.url),
);

const IMAGE_TYPES = {
  jpeg: { mimeType: "image/jpeg", extension: "jpg" },
  png: { mimeType: "image/png", extension: "png" },
  webp: { mimeType: "image/webp", extension: "webp" },
};

export function badRequest(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

export function slugify(value) {
  return (
    String(value || "student")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50) || "student"
  );
}

export function studentFolderName(studentName, studentId) {
  const lastFiveIdCharacters = String(studentId).slice(-5).toLowerCase();
  return `${slugify(studentName)}-${lastFiveIdCharacters}`;
}

export function makeUploadName(prefix, studentName, studentId, extension) {
  const studentKey = studentFolderName(studentName, studentId);
  const uniquePart = randomUUID().slice(0, 8);

  return `${slugify(prefix)}-${studentKey}-${uniquePart}.${extension}`;
}

export async function validateUpload(file, { imagesOnly = false } = {}) {
  const buffer = file?.buffer;

  if (!buffer?.length) {
    throw badRequest("Uploaded file is empty or unreadable.");
  }

  if (buffer.length > TWO_MB) {
    throw badRequest("Each file must be 2 MB or smaller.");
  }

  const isPdf = buffer.subarray(0, 5).toString("ascii") === "%PDF-";

  if (isPdf) {
    if (imagesOnly) {
      throw badRequest("Profile photo must be a JPG, PNG or WEBP image.");
    }

    const parser = new PDFParse({ data: new Uint8Array(buffer) });

    try {
      // pdf-parse v2 method is lowercase: getText()
      const extracted = await parser.getText();
      const text = String(extracted?.text || "").replace(/\s/g, "");

      if (text.length < 3) {
        throw badRequest(
          "PDF opened, but it has no extractable text. Scanned PDFs need OCR; upload an image or text-readable PDF.",
        );
      }

      return {
        buffer,
        size: buffer.length,
        mimeType: "application/pdf",
        extension: "pdf",
      };
    } catch (error) {
      if (error.statusCode === 400) throw error;
      throw badRequest("PDF could not be opened or read.");
    } finally {
      await parser.destroy().catch(() => {});
    }
  }

  try {
    const image = sharp(buffer, {
      failOn: "error",
      limitInputPixels: 40_000_000,
    });

    const metadata = await image.metadata();
    const detectedType = IMAGE_TYPES[metadata.format];

    if (!detectedType || !metadata.width || !metadata.height) {
      throw new Error("Unsupported image.");
    }

    await sharp(buffer, {
      failOn: "error",
      limitInputPixels: 40_000_000,
    }).toBuffer();

    return {
      buffer,
      size: buffer.length,
      mimeType: detectedType.mimeType,
      extension: detectedType.extension,
    };
  } catch {
    throw badRequest("File is not a readable JPG, PNG or WEBP image.");
  }
}

export async function storeUpload(folderName, fileName, buffer) {
  const uploadRoot = path.resolve(UPLOADS_DIR);
  const absoluteFolder = path.resolve(uploadRoot, folderName);
  const relativeFolder = path.relative(uploadRoot, absoluteFolder);

  // Upload folder ko uploads directory ke andar hi restrict karta hai.
  if (
    !relativeFolder ||
    relativeFolder.startsWith("..") ||
    path.isAbsolute(relativeFolder)
  ) {
    throw new Error("Invalid upload folder.");
  }

  const safeFileName = path.basename(fileName);

  if (!safeFileName || safeFileName !== fileName) {
    throw new Error("Invalid upload filename.");
  }

  await mkdir(absoluteFolder, { recursive: true });

  const absolutePath = path.join(absoluteFolder, safeFileName);
  await writeFile(absolutePath, buffer, { flag: "wx" });

  return {
    fileName: safeFileName,
    filePath: path.posix.join(
      ...relativeFolder.split(path.sep),
      safeFileName,
    ),
    absolutePath,
  };
}
export async function removeUpload(absolutePath) {
  if (!absolutePath) return;

  try {
    await unlink(absolutePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Could not remove upload:", error.message);
    }
  }
}