"use client";
import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
const markers = Array.from({ length: 83 }, (_, i) => i);
export default function Ruller() {
  const [leftMargin, setLeftMargin] = useState(56);
  const [rightMargin, setRightMargin] = useState(56);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };
  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector("#ruler-container");
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(816, relativeX));

        if (isDraggingLeft) {
          const maxLeftPosition = 816 - rightMargin - 100;
          const newPosition = Math.min(rawPosition, maxLeftPosition);
          setLeftMargin(newPosition);
          //   TODO: collaboration
        }
        if (isDraggingRight) {
          const maxRightPosition = 816 - leftMargin - 100;
          const newPosition = Math.max(816 - rawPosition, 0);

          const constrainedRightPosition = Math.min(
            newPosition,
            maxRightPosition
          );
          setRightMargin(constrainedRightPosition);
        }
      }
    }
  };

  const handleLeftDoubleClick = () => {
    setLeftMargin(56);
  };
  const handleRightDoubleClick = () => {
    setRightMargin(56);
  };

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {}}
      className="h-6 border-b border-gray-300 flex items-end relative select-none print:hidden"
    >
      <div
        id="ruler-container"
        className="max-w-[816px] w-full h-full relative mx-auto"
      >
        <Marker
          isLeft={true}
          position={leftMargin}
          isDragging={isDraggingLeft}
          onDoubleClick={handleLeftDoubleClick}
          onMouseDown={handleLeftMouseDown}
        />
        <Marker
          isLeft={false}
          position={rightMargin}
          isDragging={isDraggingRight}
          onDoubleClick={handleRightDoubleClick}
          onMouseDown={handleRightMouseDown}
        />
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((mark) => {
              const position = (mark * 816) / 82;

              return (
                <div
                  key={mark}
                  className="absolute bottom-0"
                  style={{ left: `${position}px` }}
                >
                  {mark % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500" />
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                        {mark / 10 + 1}
                      </span>
                    </>
                  )}
                  {mark % 5 === 0 && mark % 10 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1.5 bg-neutral-500" />
                  )}
                  {mark % 5 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Marker = ({
  isDragging,
  isLeft,
  onDoubleClick,
  onMouseDown,
  position,
}: MarkerProps) => {
  return (
    <div
      className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
      style={{
        [isLeft ? "left" : "right"]: `${position}px`,
      }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className="absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2" />
      <div
        className="absolute left-1/2 top-4 transform -translate-x-1/2 h-screen w-[1px] bg-blue-500 scale-x-50"
        style={{
          display: isDragging ? "block" : "none",
        }}
      />
    </div>
  );
};
