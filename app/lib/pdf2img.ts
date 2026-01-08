export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  isLoading = true;
  try {
    // For pdfjs-dist v5.x, use the build/pdf path
    // @ts-expect-error - pdfjs-dist/build/pdf.mjs module path
    loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
      // Set the worker source to use local file
      if (lib && lib.GlobalWorkerOptions) {
        lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      }
      pdfjsLib = lib;
      isLoading = false;
      return lib;
    }).catch((err) => {
      isLoading = false;
      loadPromise = null;
      const errorMsg = err?.message || err?.toString() || "Unknown error";
      console.error("PDF.js load error:", errorMsg);
      throw new Error(`Failed to load PDF.js library: ${errorMsg}`);
    });

    return loadPromise;
  } catch (err) {
    isLoading = false;
    loadPromise = null;
    throw err;
  }
}

export async function convertPdfToImage(
  file: File
): Promise<PdfConversionResult> {
  try {
    const lib = await loadPdfJs();

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 4 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      return {
        imageUrl: "",
        file: null,
        error: "Failed to get canvas context",
      };
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    await page.render({ canvasContext: context, viewport }).promise;

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Create a File from the blob with the same name as the pdf
            const originalName = file.name.replace(/\.pdf$/i, "");
            const imageFile = new File([blob], `${originalName}.png`, {
              type: "image/png",
            });

            resolve({
              imageUrl: URL.createObjectURL(blob),
              file: imageFile,
            });
          } else {
            resolve({
              imageUrl: "",
              file: null,
              error: "Failed to create image blob from canvas",
            });
          }
        },
        "image/png",
        1.0
      ); // Set quality to maximum (1.0)
    });
  } catch (err: any) {
    const errorMessage = err?.message || err?.toString() || "Unknown error";
    console.error("PDF conversion error:", errorMessage, err);
    return {
      imageUrl: "",
      file: null,
      error: errorMessage,
    };
  }
}