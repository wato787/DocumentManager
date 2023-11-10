import React, { useEffect, useState } from "react";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";

const PdfToImage = () => {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    const pdfUrl = "/demo.pdf";

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
          // Convert canvas to an image URL
          const imgData = canvas.toDataURL("image/png");

          // Set the image URL using useState
          setImgSrc(imgData);
        });
      });
    });
  }, []);

  return <img src={imgSrc} alt="PDF Page 1" />;
};

export default PdfToImage;
