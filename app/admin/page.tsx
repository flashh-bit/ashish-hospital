"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import ImageCropperModal from "@/components/ImageCropperModal";

type GalleryItem = { filename: string; title: string; uploadedAt: string };
type ReviewItem = {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  approved?: boolean;
};

// ── Upload queue item: file + editable title
type UploadQueueItem = { file: File; title: string; preview: string };

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [fileError, setFileError] = useState("");

  // Upload queue state
  const [uploadQueue, setUploadQueue] = useState<UploadQueueItem[]>([]);
  const [pendingCropQueue, setPendingCropQueue] = useState<{file: File, url: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check auth and fetch data on mount
  const fetchData = useCallback(async () => {
    try {
      const [galRes, revRes] = await Promise.all([
        fetch("/api/admin/gallery-list"),
        fetch("/api/admin/reviews-list"),
      ]);

      if (galRes.status === 401 || revRes.status === 401) {
        setAuthenticated(false);
        return;
      }

      setAuthenticated(true);

      if (galRes.ok) {
        const galData = await galRes.json();
        setGallery(galData);
      }
      if (revRes.ok) {
        const revData = await revRes.json();
        setReviews(revData);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        fetchData();
      } else {
        setAuthError("Incorrect password");
      }
    } catch {
      setAuthError("Something went wrong. Try again.");
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
  };

  // File selection — builds preview queue with editable titles
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setFileError("");

    const newItems: { file: File; url: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split(".").pop()?.toLowerCase();

      if (!ext || !["jpg", "jpeg", "png", "webp"].includes(ext)) {
        setFileError(`Invalid file type: ${file.name}. Only jpg, jpeg, png, webp allowed.`);
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        setFileError(`File too large: ${file.name}. Maximum 5MB per file.`);
        continue;
      }

      const url = URL.createObjectURL(file);
      newItems.push({ file, url });
    }

    if (newItems.length > 0) {
      setPendingCropQueue((prev) => [...prev, ...newItems]);
    }
    e.target.value = "";
  };

  // Remove item from queue before uploading
  const removeFromQueue = (idx: number) => {
    setUploadQueue((prev) => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  // Update title in queue
  const updateQueueTitle = (idx: number, title: string) => {
    setUploadQueue((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, title } : item))
    );
  };

  // Upload handler — sends all queued files with their titles
  const handleUpload = async () => {
    if (uploadQueue.length === 0) return;

    setUploadStatus("Uploading...");

    const formData = new FormData();
    uploadQueue.forEach((item) => {
      formData.append("files", item.file);
      formData.append("titles", item.title.trim() || "Gallery Image");
    });

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setUploadStatus("Done!");
        setUploadQueue([]);
        setTimeout(() => setUploadStatus(""), 3000);
        fetchData();
      } else {
        setUploadStatus("Upload failed.");
      }
    } catch {
      setUploadStatus("Upload failed.");
    }
  };

  // Delete gallery image
  const handleDeleteImage = async (filename: string) => {
    try {
      await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename }),
      });
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Approve review
  const handleApproveReview = async (id: string) => {
    try {
      await fetch("/api/admin/approve-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchData();
    } catch (err) {
      console.error("Approve review error:", err);
    }
  };

  // Delete review
  const handleDeleteReview = async (id: string) => {
    try {
      await fetch("/api/admin/delete-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchData();
    } catch (err) {
      console.error("Delete review error:", err);
    }
  };

  const pendingReviews = reviews.filter((r) => r.approved === false);
  const approvedReviews = reviews.filter((r) => r.approved !== false);

  // ==================== LOGIN SCREEN ====================
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold text-dark">
              Ashish Hospital
            </h1>
            <p className="text-muted text-sm mt-1">Admin Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple"
                placeholder="Enter admin password"
                id="input-admin-password"
              />
              {authError && (
                <p className="text-red-500 text-xs mt-1">{authError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-purple text-white py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
              id="btn-admin-login"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==================== MAIN DASHBOARD ====================

  const handleCropComplete = (croppedFile: File) => {
    const currentCrop = pendingCropQueue[0];
    
    const defaultTitle = currentCrop.file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
    const preview = URL.createObjectURL(croppedFile);
    
    setUploadQueue((prev) => [...prev, { file: croppedFile, title: defaultTitle, preview }]);
    
    // Move to next item
    setPendingCropQueue((prev) => prev.slice(1));
  };

  const handleCropCancel = () => {
    // Skip current item
    setPendingCropQueue((prev) => prev.slice(1));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* CROPPER MODAL */}
      {pendingCropQueue.length > 0 && (
        <ImageCropperModal
          imageSrc={pendingCropQueue[0].url}
          originalFile={pendingCropQueue[0].file}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}

      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="font-heading text-xl font-bold text-dark">
          Admin Panel
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
          id="btn-admin-logout"
        >
          Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-12">

        {/* ===== GALLERY MANAGEMENT ===== */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl font-bold text-dark">
              Gallery Management
            </h2>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-purple text-white px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            >
              + Add Photos
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="input-gallery-upload"
            />
          </div>

          {fileError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
              {fileError}
            </div>
          )}

          {/* Upload Queue — preview + title editing */}
          {uploadQueue.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-dark text-sm mb-4">
                Ready to Upload ({uploadQueue.length} photo{uploadQueue.length > 1 ? "s" : ""})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                {uploadQueue.map((item, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200">
                    <div className="relative h-36 bg-gray-100">
                      <Image
                        src={item.preview}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() => removeFromQueue(idx)}
                        className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="p-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateQueueTitle(idx, e.target.value)}
                        placeholder="Image title..."
                        className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple/50 focus:border-purple"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleUpload}
                  className="bg-purple text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Upload All
                </button>
                <button
                  onClick={() => setUploadQueue([])}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                  Clear All
                </button>
                {uploadStatus && (
                  <span className={`text-sm font-medium ${uploadStatus === "Done!" ? "text-green-600" : uploadStatus === "Upload failed." ? "text-red-500" : "text-blue-600"}`}>
                    {uploadStatus}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Existing gallery grid */}
          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div
                  key={item.filename}
                  className="relative group rounded-xl overflow-hidden border border-gray-200 bg-white"
                >
                  <div className="relative h-40">
                    <Image
                      src={`/gallery/${item.filename}`}
                      alt={item.title || item.filename}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => handleDeleteImage(item.filename)}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                        Delete
                      </span>
                    </button>
                  </div>
                  {item.title && (
                    <div className="px-3 py-2">
                      <p className="text-xs font-medium text-dark truncate">{item.title}</p>
                      <p className="text-xs text-muted mt-0.5">
                        {new Date(item.uploadedAt).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted text-center py-8">
              No photos uploaded yet.
            </p>
          )}
        </section>

        {/* ===== PENDING REVIEWS ===== */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-heading text-2xl font-bold text-dark">
              Pending Approval
            </h2>
            {pendingReviews.length > 0 && (
              <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2.5 py-1 rounded-full">
                {pendingReviews.length} new
              </span>
            )}
          </div>

          {pendingReviews.length > 0 ? (
            <div className="space-y-4">
              {pendingReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-xl p-6 border border-orange-200 flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-dark text-sm">
                        {review.name}
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-sm ${
                              star <= review.rating ? "text-yellow-400" : "text-gray-200"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-orange-500 font-medium bg-orange-50 px-2 py-0.5 rounded-full">
                        Awaiting Approval
                      </span>
                    </div>
                    <p className="text-sm text-muted">{review.text}</p>
                    <p className="text-xs text-muted mt-2">
                      {new Date(review.date).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleApproveReview(review.id)}
                      className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-100 transition-colors"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted text-center py-8 bg-white rounded-xl border border-gray-200">
              No reviews awaiting approval.
            </p>
          )}
        </section>

        {/* ===== APPROVED REVIEWS ===== */}
        <section>
          <h2 className="font-heading text-2xl font-bold text-dark mb-6">
            Live Reviews ({approvedReviews.length})
          </h2>

          {approvedReviews.length > 0 ? (
            <div className="space-y-4">
              {approvedReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-xl p-6 border border-gray-200 flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-dark text-sm">
                        {review.name}
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-sm ${
                              star <= review.rating ? "text-yellow-400" : "text-gray-200"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                        Live
                      </span>
                    </div>
                    <p className="text-sm text-muted">{review.text}</p>
                    <p className="text-xs text-muted mt-2">
                      {new Date(review.date).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors flex-shrink-0"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted text-center py-8">No approved reviews yet.</p>
          )}
        </section>

      </div>
    </div>
  );
}
