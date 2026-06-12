"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";

type Props = {
  imageSrc: string;
  originalFile: File;
  onCropComplete: (croppedFile: File) => void;
  onCancel: () => void;
};

export default function ImageCropperModal({ imageSrc, originalFile, onCropComplete, onCancel }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropCompleteHandler = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels, originalFile.name);
      if (croppedFile) {
        onCropComplete(croppedFile);
      } else {
        throw new Error("Failed to crop image.");
      }
    } catch (e) {
      console.error(e);
      alert("Error cropping image");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-2xl flex flex-col h-[80vh] shadow-2xl">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="font-semibold text-lg">Crop Photo</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-red-500 font-bold p-2">✕</button>
        </div>
        
        <div className="relative flex-1 bg-gray-900">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={3 / 2}
            onCropChange={setCrop}
            onCropComplete={onCropCompleteHandler}
            onZoomChange={setZoom}
          />
        </div>

        <div className="p-4 bg-gray-50 flex flex-col sm:flex-row items-center gap-4 border-t">
          <div className="flex-1 w-full flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Zoom</label>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={onCancel}
              className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isProcessing}
              className="flex-1 sm:flex-none px-6 py-2 bg-purple text-white rounded-lg text-sm font-medium hover:bg-purple/90 disabled:opacity-50"
            >
              {isProcessing ? "Cropping..." : "Save Crop"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
