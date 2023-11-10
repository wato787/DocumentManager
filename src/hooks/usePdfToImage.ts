import { useEffect, useState } from "react";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";

const usePdfToImage = (pdfUrl: string): string => {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

    const loadingTask = pdfjs.getDocument(pdfUrl);
    loadingTask.promise.then((pdf) => {
      pdf.getPage(1).then((page) => {
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context as CanvasRenderingContext2D,
          viewport: viewport,
        };

        page.render(renderContext).promise.then(() => {
          const imgData = canvas.toDataURL("image/png");
          setImgSrc(imgData);
        });
      });
    });
  }, [pdfUrl]);

  return imgSrc;
};

export default usePdfToImage;
