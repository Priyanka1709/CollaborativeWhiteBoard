import React, { useEffect, useRef } from "react";

const Board = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;

    let isDrawing = false;

    const canvas: HTMLCanvasElement | null = canvasRef.current;

    if (!canvas) {
      return console.error("Canvas not found");
    }

    const ctx = canvas.getContext("2d");

    const startDrawing = (e: { offsetX: number; offsetY: number }) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    const draw = (e: { offsetX: number; offsetY: number }) => {
      if (!isDrawing) {
        return false;
      }

      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }

      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    const endDrawing = () => {
      isDrawing = false;
    };

    // set up canvas with default styles
    if (ctx) {
      ctx.strokeStyle = "white";
      ctx.lineWidth = 5;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", endDrawing);
    canvas.addEventListener("mouseout", endDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", endDrawing);
      canvas.removeEventListener("mouseout", endDrawing);
    };
  });

  return (
    <div className="Board">
      <canvas
        ref={canvasRef}
        width={1200}
        height={700}
        style={{ backgroundColor: "black" }}
      />
    </div>
  );
};

export default Board;
