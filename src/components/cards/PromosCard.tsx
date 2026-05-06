'use client';

import { useState } from 'react';
import { Play, X } from 'lucide-react';
import data from '../../utils/data.json'


const promoVideos = data.promos;

export function PromoVideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<null | {
    title: string;
    video: string;
  }>(null);

  return (
    <div className="w-full px-6 py-12 text-white">
      

      {/* VIDEO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {promoVideos.map((item) => (
          <button
            key={item.id}
            onClick={() =>
              setSelectedVideo({
                title: item.title,
                video: item.video,
              })
            }
            className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 text-left"
          >
            {/* THUMBNAIL */}
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition" />

            {/* PLAY BUTTON */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/20 group-hover:scale-110 transition">
                <Play className="h-7 w-7 fill-white text-white ml-1" />
              </div>
            </div>

            {/* TITLE */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-lg font-medium text-white">
                {item.title}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {/* VIDEO MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 hover:bg-black transition"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            {/* VIDEO */}
            <video
              src={selectedVideo.video}
              controls
              autoPlay
              className="w-full max-h-[85vh] bg-black"
            />

            {/* TITLE */}
            <div className="p-5 border-t border-zinc-800">
              <h2 className="text-xl font-semibold text-white">
                {selectedVideo.title}
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

