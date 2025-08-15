import React, { useRef, useState, useCallback } from 'react';

export function DraggableCardContainer({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
}

export function DraggableCardBody({ children, className = "" }) {
  const cardRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleStart = useCallback((clientX, clientY) => {
    setIsDragging(true);
    const rect = cardRef.current.getBoundingClientRect();
    setDragOffset({
      x: clientX - rect.left - transform.x,
      y: clientY - rect.top - transform.y
    });
  }, [transform]);

  const handleMove = useCallback((clientX, clientY) => {
    if (!isDragging) return;
    
    requestAnimationFrame(() => {
      setTransform({
        x: clientX - dragOffset.x,
        y: clientY - dragOffset.y
      });
    });
  }, [isDragging, dragOffset]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    const handleMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  return (
    <div
      ref={cardRef}
      className={`cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging ? 1000 : 10,
        willChange: isDragging ? 'transform' : 'auto'
      }}
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        handleStart(touch.clientX, touch.clientY);
      }}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
        {children}
      </div>
    </div>
  );
}
