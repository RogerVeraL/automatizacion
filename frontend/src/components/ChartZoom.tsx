"use client";

import { useEffect, useId, useState } from "react";
import { Maximize2, X } from "lucide-react";
import { ReactNode } from "react";

type ChartZoomProps = {
  title?: string;
  children: ReactNode;
  triggerLabel?: string;
  triggerClassName?: string;
  showTrigger?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const ChartZoom = ({
  title = "Vista ampliada",
  children,
  triggerLabel = "Maximizar",
  triggerClassName = "",
  showTrigger = true,
  onOpenChange,
}: ChartZoomProps) => {
  const [open, setOpen] = useState(false);
  const labelId = useId();

  const handleOpen = () => {
    setOpen(true);
    onOpenChange?.(true);
  };
  const handleClose = () => {
    setOpen(false);
    onOpenChange?.(false);
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        onOpenChange?.(false);
      }
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  return (
    <div className="relative">
      {showTrigger && (
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          aria-label="Abrir vista ampliada de la gráfica"
          className={`inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors ${triggerClassName}`}
        >
          <Maximize2 className="w-4 h-4" />
          <span className="hidden sm:inline">{triggerLabel}</span>
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelId}
          className="fixed inset-0 z-50"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" onClick={handleClose} />

          {/* Modal content */}
          <div className="absolute inset-0 flex items-center justify-center p-0">
            <div
              className="relative w-[95vw] max-w-7xl h-[85vh] bg-white rounded-none border border-gray-200 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
                <h2
                  id={labelId}
                  className="text-base sm:text-lg font-semibold text-gray-900"
                >
                  {title}
                </h2>
                <button
                  onClick={handleClose}
                  aria-label="Cerrar vista ampliada"
                  className="rounded-md p-2 hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Body: chart area */}
              <div className="h-[calc(85vh-52px)] p-3 sm:p-5 bg-white">
                <div className="w-full h-full rounded-none bg-white to-transparent border-none p-2 sm:p-4">
                  <div className="w-full h-full">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartZoom;
