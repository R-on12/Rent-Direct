import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, Maximize2, Minimize2, Move, Compass, Eye } from 'lucide-react';

interface Room {
  name: string;
  imageUrl: string;
}

interface Virtual360ViewerProps {
  rooms?: Room[];
  defaultImageUrl?: string;
  title?: string;
}

export const Virtual360Viewer: React.FC<Virtual360ViewerProps> = ({
  rooms = [],
  defaultImageUrl,
  title = '360° Virtual Tour'
}) => {
  const activeRooms = rooms.length > 0 ? rooms : [
    { name: 'Main Area', imageUrl: defaultImageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80' }
  ];

  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ yaw: 0, pitch: 0 });
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentRoom = activeRooms[currentRoomIndex];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;

    setRotation((prev) => ({
      yaw: (prev.yaw + deltaX * 0.3) % 360,
      pitch: Math.max(-45, Math.min(45, prev.pitch - deltaY * 0.2))
    }));

    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - startPos.x;
    const deltaY = e.touches[0].clientY - startPos.y;

    setRotation((prev) => ({
      yaw: (prev.yaw + deltaX * 0.4) % 360,
      pitch: Math.max(-45, Math.min(45, prev.pitch - deltaY * 0.3))
    }));

    setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const resetView = () => {
    setRotation({ yaw: 0, pitch: 0 });
    setZoom(1);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen w-screen' : 'h-[420px] w-full'
      }`}
    >
      {/* 360 Panorama Viewport */}
      <div
        className="relative w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-75 ease-out"
          style={{
            backgroundImage: `url(${currentRoom.imageUrl})`,
            transform: `scale(${zoom}) translate(${rotation.yaw * 1.5}px, ${rotation.pitch * 2}px)`,
            filter: 'brightness(0.95)'
          }}
        />

        {/* Dynamic Lens Overlay & Depth Vignette */}
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.8)_100%)]" />

        {/* Drag Hint Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 hover:opacity-0 transition-opacity">
          <div className="bg-black/60 text-white px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 backdrop-blur-sm border border-white/10">
            <Move className="w-4 h-4 animate-pulse" />
            Click & Drag to Look Around (360°)
          </div>
        </div>

        {/* Top Info Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-white/15 text-xs font-medium">
            <Compass className="w-4 h-4 text-emerald-400 animate-spin-slow" />
            <span>360° Virtual Tour: <strong className="text-emerald-300">{currentRoom.name}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetView}
              className="p-2 bg-black/70 hover:bg-black/90 text-white rounded-full border border-white/15 backdrop-blur-md transition-all text-xs"
              title="Reset Angle"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-black/70 hover:bg-black/90 text-white rounded-full border border-white/15 backdrop-blur-md transition-all text-xs"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Bottom Controls Bar */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col md:flex-row items-center justify-between gap-3 pointer-events-auto">
          {/* Room Selector Pills */}
          {activeRooms.length > 1 && (
            <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/15 overflow-x-auto max-w-full">
              {activeRooms.map((room, index) => (
                <button
                  key={room.name}
                  onClick={() => setCurrentRoomIndex(index)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    currentRoomIndex === index
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  {room.name}
                </button>
              ))}
            </div>
          )}

          {/* Zoom Controls */}
          <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-xs text-white">
            <span className="text-neutral-400 font-mono">Zoom:</span>
            <button
              onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
              className="px-2 py-0.5 rounded hover:bg-white/20 text-sm font-bold"
            >
              -
            </button>
            <span className="font-mono text-emerald-400">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))}
              className="px-2 py-0.5 rounded hover:bg-white/20 text-sm font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
