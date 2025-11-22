import React, { useEffect, useRef } from 'react';

interface Props {
  className?: string;
  fullscreen?: boolean;
  opacity?: number;
}

const DitherCanvas: React.FC<Props> = ({ className, fullscreen = false, opacity = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (fullscreen) {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      } else {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      if (fullscreen) {
        canvas.width = window.innerWidth / 4; // Low res for performance + chunky retro look
        canvas.height = window.innerHeight / 4;
      } else {
        const parent = canvas.parentElement;
        if (parent) {
          canvas.width = parent.clientWidth / 2;
          canvas.height = parent.clientHeight / 2;
        }
      }
    };

    window.addEventListener('resize', resize);
    resize();

    // Ordered Dither Matrix (4x4 Bayer)
    const bayerMatrix = [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5],
    ];

    const draw = () => {
      time += 0.015;
      const width = canvas.width;
      const height = canvas.height;

      // Mouse influence scaling (adjust for canvas resolution)
      const mx = fullscreen ? mouseRef.current.x / 4 : mouseRef.current.x / 2;
      const my = fullscreen ? mouseRef.current.y / 4 : mouseRef.current.y / 2;

      // Clear
      ctx.fillStyle = fullscreen ? '#E6E5E0' : '#E6E5E0'; 
      ctx.fillRect(0, 0, width, height);

      // Generate Pattern
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          // Calculate distance to mouse
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Interaction effect: distort frequency based on mouse proximity
          const mouseFactor = Math.max(0, 150 - dist) / 150; // 0 to 1 close to mouse
          
          // Base Wave Pattern
          // Mix of sin waves moving over time
          // Distortion: Mouse adds turbulence to the coordinates
          const distortion = mouseFactor * 10;
          const xVal = x * 0.03 + time + Math.sin(y * 0.05) + (distortion * Math.sin(time * 2));
          const yVal = y * 0.03 + time + Math.cos(x * 0.05);
          
          // Plasma-ish calculation
          const value = (Math.sin(xVal) + Math.sin(yVal) + 2) * 0.5; // Range 0-2
          
          // Map to grayscale 0-255
          // We add a slight gradient based on Y for some depth
          let gray = (value * 100) + (mouseFactor * 50); 
          
          // Dithering
          const index = (y * width + x) * 4;
          const threshold = (bayerMatrix[y % 4][x % 4] / 16) * 255;

          // Determine pixel color based on threshold
          // For fullscreen background, we want it very subtle (light gray vs slightly darker gray)
          // For hero component, we want higher contrast
          
          let isDark = gray < threshold;
          
          if (fullscreen) {
             // Background Mode: Subtle texture
             if (isDark) {
                 data[index] = 200; // R
                 data[index + 1] = 200; // G
                 data[index + 2] = 195; // B
                 data[index + 3] = 255; // Alpha
             } else {
                 data[index] = 230; // R
                 data[index + 1] = 229; // G
                 data[index + 2] = 224; // B
                 data[index + 3] = 0; // Transparent (show CSS bg)
             }
          } else {
             // Component Mode: High Contrast
             if (isDark) {
                 data[index] = 26; 
                 data[index + 1] = 26; 
                 data[index + 2] = 24; 
                 data[index + 3] = 255; 
             } else {
                 data[index] = 230; 
                 data[index + 1] = 229; 
                 data[index + 2] = 224; 
                 data[index + 3] = 0; 
             }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [fullscreen]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`block image-pixelated ${className}`} 
      style={{ 
        imageRendering: 'pixelated',
        opacity: opacity 
      }}
    />
  );
};

export default DitherCanvas;