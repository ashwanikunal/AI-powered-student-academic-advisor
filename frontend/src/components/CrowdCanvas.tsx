"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

interface CrowdCanvasProps {
  src?: string;
  rows?: number;
  cols?: number;
}

const CrowdCanvas = ({ src = "/images/peeps/all-peeps.svg", rows = 15, cols = 7 }: CrowdCanvasProps) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = {
      src,
      rows,
      cols,
    };

    // UTILS
    const randomRange = (min: number, max: number) =>
      min + Math.random() * (max - min);
    const randomIndex = (array: any[]) => randomRange(0, array.length) | 0;
    const removeFromArray = (array: any[], i: number) => array.splice(i, 1)[0];
    const removeItemFromArray = (array: any[], item: any) =>
      removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array: any[]) =>
      removeFromArray(array, randomIndex(array));
    const getRandomFromArray = (array: any[]) => array[randomIndex(array) | 0];

    // TWEEN FACTORIES
    const resetPeep = ({ stage, peep }: { stage: any; peep: any }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const layerOffset = (peep.archetypeIndex % 4) * 35 - 30;
      const startY = stage.height - peep.height + layerOffset;

      let startX: number;
      let endX: number;

      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return {
        startX,
        startY,
        endX,
      };
    };

    const normalWalk = ({ peep, props }: { peep: any; props: any }) => {
      const { startX, startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5));
      tl.to(
        peep,
        {
          duration: xDuration,
          x: endX,
          ease: "none",
        },
        0,
      );
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: xDuration / yDuration,
          yoyo: true,
          y: startY - 10,
        },
        0,
      );

      return tl;
    };

    const walks = [normalWalk];

    // TYPES
    type Peep = {
      image: HTMLImageElement | null;
      rect: number[];
      width: number;
      height: number;
      drawArgs: any[];
      x: number;
      y: number;
      anchorY: number;
      scaleX: number;
      walk: any;
      archetypeIndex: number;
      setRect: (rect: number[]) => void;
      render: (ctx: CanvasRenderingContext2D) => void;
    };

    // Helper to draw authentic black-and-white OpenPeeps vector characters
    const drawOpenPeepsVector = (ctx: CanvasRenderingContext2D, width: number, height: number, archetype: number) => {
      ctx.save();
      const cx = width / 2;
      const headRadius = width * 0.35;
      const headCy = height * 0.35;

      const isDarkShirt = (archetype % 2 === 0);
      ctx.fillStyle = isDarkShirt ? "#000000" : "#ffffff";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // 1. Shoulders & Torso / Clothes
      ctx.beginPath();
      ctx.moveTo(cx - width * 0.48, height);
      ctx.lineTo(cx - width * 0.4, height * 0.62);
      ctx.quadraticCurveTo(cx - width * 0.25, height * 0.54, cx, height * 0.54);
      ctx.quadraticCurveTo(cx + width * 0.25, height * 0.54, cx + width * 0.4, height * 0.62);
      ctx.lineTo(cx + width * 0.48, height);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Clothes detail lines
      ctx.strokeStyle = isDarkShirt ? "#ffffff" : "#000000";
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (archetype % 3 === 0) {
        // V-Neck collar
        ctx.moveTo(cx - width * 0.14, height * 0.54);
        ctx.lineTo(cx, height * 0.7);
        ctx.lineTo(cx + width * 0.14, height * 0.54);
      } else if (archetype % 3 === 1) {
        // Hoodie zipper
        ctx.moveTo(cx, height * 0.54);
        ctx.lineTo(cx, height);
      } else {
        // Jacket lapels
        ctx.moveTo(cx - width * 0.18, height * 0.54);
        ctx.lineTo(cx - width * 0.08, height * 0.75);
        ctx.moveTo(cx + width * 0.18, height * 0.54);
        ctx.lineTo(cx + width * 0.08, height * 0.75);
      }
      ctx.stroke();

      // 2. Neck
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.rect(cx - width * 0.1, headCy + headRadius * 0.5, width * 0.2, height * 0.15);
      ctx.fill();
      ctx.stroke();

      // 3. Head Outline
      ctx.beginPath();
      ctx.arc(cx, headCy, headRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 4. Hairstyles & Headwear (OpenPeeps Signature archetypes)
      ctx.fillStyle = "#000000";
      switch (archetype % 10) {
        case 0:
          // Big Afro Hair
          ctx.beginPath();
          ctx.arc(cx - headRadius * 0.6, headCy - headRadius * 0.3, headRadius * 0.65, 0, Math.PI * 2);
          ctx.arc(cx, headCy - headRadius * 0.75, headRadius * 0.8, 0, Math.PI * 2);
          ctx.arc(cx + headRadius * 0.6, headCy - headRadius * 0.3, headRadius * 0.65, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 1:
          // Beanie Hat
          ctx.beginPath();
          ctx.arc(cx, headCy - headRadius * 0.2, headRadius * 1.08, Math.PI, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(cx - headRadius * 1.1, headCy - headRadius * 0.35, headRadius * 2.2, height * 0.09);
          ctx.strokeRect(cx - headRadius * 1.1, headCy - headRadius * 0.35, headRadius * 2.2, height * 0.09);
          break;

        case 2:
          // Cap / Flat top
          ctx.beginPath();
          ctx.rect(cx - headRadius * 1.05, headCy - headRadius * 1.1, headRadius * 2.1, headRadius * 0.85);
          ctx.fill();
          ctx.stroke();
          // Visor
          ctx.beginPath();
          ctx.moveTo(cx - headRadius * 1.25, headCy - headRadius * 0.25);
          ctx.lineTo(cx - headRadius * 0.3, headCy - headRadius * 0.25);
          ctx.stroke();
          break;

        case 3:
          // Long Wavy Hair
          ctx.beginPath();
          ctx.arc(cx, headCy - headRadius * 0.1, headRadius * 1.15, Math.PI * 0.8, Math.PI * 2.2);
          ctx.rect(cx - headRadius * 1.15, headCy - headRadius * 0.1, headRadius * 0.5, height * 0.45);
          ctx.rect(cx + headRadius * 0.65, headCy - headRadius * 0.1, headRadius * 0.5, height * 0.45);
          ctx.fill();
          break;

        case 4:
          // Spiky Hair
          ctx.beginPath();
          ctx.moveTo(cx - headRadius * 1.05, headCy - headRadius * 0.3);
          for (let i = -4; i <= 4; i++) {
            const angle = (i * Math.PI) / 8 - Math.PI / 2;
            const spikeX = cx + Math.cos(angle) * (headRadius * 1.35);
            const spikeY = headCy + Math.sin(angle) * (headRadius * 1.35);
            ctx.lineTo(spikeX, spikeY);
          }
          ctx.closePath();
          ctx.fill();
          break;

        case 5:
          // Bob Cut
          ctx.beginPath();
          ctx.arc(cx, headCy - headRadius * 0.1, headRadius * 1.15, Math.PI * 0.75, Math.PI * 2.25);
          ctx.lineTo(cx + headRadius * 1.15, headCy + headRadius * 0.4);
          ctx.lineTo(cx - headRadius * 1.15, headCy + headRadius * 0.4);
          ctx.fill();
          break;

        case 6:
          // Headphones + Short Hair
          ctx.beginPath();
          ctx.arc(cx, headCy - headRadius * 0.3, headRadius * 1.05, Math.PI, Math.PI * 2);
          ctx.fill();
          // Headphones headband
          ctx.lineWidth = 4.5;
          ctx.beginPath();
          ctx.arc(cx, headCy - headRadius * 0.1, headRadius * 1.25, Math.PI * 1.1, Math.PI * 1.9);
          ctx.stroke();
          // Ear cups
          ctx.fillStyle = "#000000";
          ctx.fillRect(cx - headRadius * 1.35, headCy - headRadius * 0.3, width * 0.12, height * 0.14);
          ctx.fillRect(cx + headRadius * 1.23, headCy - headRadius * 0.3, width * 0.12, height * 0.14);
          break;

        case 7:
          // Mustache & Glasses (Bald)
          ctx.beginPath();
          ctx.ellipse(cx - headRadius * 0.22, headCy + headRadius * 0.3, headRadius * 0.28, headRadius * 0.14, -0.15, 0, Math.PI * 2);
          ctx.ellipse(cx + headRadius * 0.22, headCy + headRadius * 0.3, headRadius * 0.28, headRadius * 0.14, 0.15, 0, Math.PI * 2);
          ctx.fill();
          break;

        default:
          // Side Part Hair
          ctx.beginPath();
          ctx.arc(cx, headCy - headRadius * 0.25, headRadius * 1.08, Math.PI * 0.95, Math.PI * 2.1);
          ctx.fill();
          break;
      }

      // 5. Eyes & Glasses
      ctx.fillStyle = "#000000";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2.5;

      if (archetype % 2 === 0) {
        // Round Glasses
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(cx - headRadius * 0.35, headCy - headRadius * 0.05, headRadius * 0.3, 0, Math.PI * 2);
        ctx.arc(cx + headRadius * 0.35, headCy - headRadius * 0.05, headRadius * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx - headRadius * 0.05, headCy - headRadius * 0.05);
        ctx.lineTo(cx + headRadius * 0.05, headCy - headRadius * 0.05);
        ctx.stroke();

        // Eye pupils inside glasses
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(cx - headRadius * 0.35, headCy - headRadius * 0.05, 3, 0, Math.PI * 2);
        ctx.arc(cx + headRadius * 0.35, headCy - headRadius * 0.05, 3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Dot Eyes
        ctx.beginPath();
        ctx.arc(cx - headRadius * 0.35, headCy - headRadius * 0.05, 3.5, 0, Math.PI * 2);
        ctx.arc(cx + headRadius * 0.35, headCy - headRadius * 0.05, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 6. Nose
      ctx.beginPath();
      ctx.arc(cx, headCy + headRadius * 0.12, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // 7. Smile Mouth Expression
      ctx.beginPath();
      ctx.arc(cx, headCy + headRadius * 0.32, headRadius * 0.22, 0.1, Math.PI - 0.1);
      ctx.stroke();

      ctx.restore();
    };


    // FACTORY FUNCTIONS
    const createPeep = ({
      image,
      rect,
      index = 0,
    }: {
      image: HTMLImageElement | null;
      rect: number[];
      index?: number;
    }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        drawArgs: [],
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        archetypeIndex: index,
        setRect: (rect: number[]) => {
          peep.rect = rect;
          peep.width = rect[2] || 60;
          peep.height = rect[3] || 120;
          if (peep.image) {
            peep.drawArgs = [peep.image, ...rect, 0, 0, peep.width, peep.height];
          }
        },
        render: (ctx: CanvasRenderingContext2D) => {
          ctx.save();
          ctx.translate(peep.x, peep.y);
          ctx.scale(peep.scaleX, 1);
          if (peep.image && peep.image.complete && peep.image.naturalWidth > 0 && !peep.image.src.includes('.svg')) {

            ctx.drawImage(
              peep.image,
              peep.rect[0],
              peep.rect[1],
              peep.rect[2],
              peep.rect[3],
              0,
              0,
              peep.width,
              peep.height
            );
          } else {
            // Draw OpenPeeps vector line art matching the user's reference illustration
            drawOpenPeepsVector(ctx, peep.width, peep.height, peep.archetypeIndex);
          }
          ctx.restore();
        },
      };

      peep.setRect(rect);
      return peep;
    };

    // MAIN
    const img = document.createElement("img");
    const stage = {
      width: 0,
      height: 0,
    };

    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    const createPeepsFromProcedural = () => {
      for (let i = 0; i < 45; i++) {
        allPeeps.push(
          createPeep({
            image: null,
            rect: [0, 0, 75, 140],
            index: i,
          })
        );
      }
    };


    const createPeeps = () => {
      const { rows, cols } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [
              (i % rows) * rectWidth,
              ((i / rows) | 0) * rectHeight,
              rectWidth,
              rectHeight,
            ],
            index: i,
          }),
        );
      }
    };

    const initCrowd = () => {
      while (availablePeeps.length) {
        const p = addPeepToCrowd();
        if (p && p.walk) {
          p.walk.progress(Math.random());
        }
      }
    };

    const addPeepToCrowd = () => {
      if (availablePeeps.length === 0) return null;
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({
          peep,
          stage,
        }),
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;

      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      return peep;
    };

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

      crowd.forEach((peep) => {
        peep.render(ctx);
      });

      ctx.restore();
    };

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      stage.width = rect.width || canvas.clientWidth || window.innerWidth;
      stage.height = rect.height || canvas.clientHeight || Math.round(window.innerHeight * 0.9);
      canvas.width = stage.width * (window.devicePixelRatio || 1);
      canvas.height = stage.height * (window.devicePixelRatio || 1);


      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
      render();
    };

    const init = () => {
      allPeeps.length = 0;
      availablePeeps.length = 0;
      crowd.length = 0;
      createPeepsFromProcedural();
      resize();
      render();
      gsap.ticker.add(render);
    };


    init();


    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
    };
  }, [src, rows, cols]);

  return (
    <canvas ref={canvasRef} className="absolute bottom-0 h-[90vh] w-full pointer-events-none z-10" />
  );
};


const Skiper39 = () => {
  return (
    <div className="relative min-h-screen h-screen w-full bg-white text-black overflow-hidden">
      <div className="top-22 absolute left-1/2 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black z-20">
        <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-[''] font-mono">
          Croud Canvas
        </span>
      </div>
      <div className="absolute bottom-0 h-full w-screen z-10">
        <CrowdCanvas src="/images/peeps/all-peeps.svg" rows={15} cols={7} />
      </div>
    </div>
  );
};


export { CrowdCanvas, Skiper39 };
export default CrowdCanvas;
