import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Helper to get full image URL - handles both relative and absolute URLs
export const getImageUrl = (url) => {
  if (!url) return null;
  // If already a full URL, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // Convert old /uploads/ paths to /api/uploads/ for ingress compatibility
  if (url.startsWith('/uploads/')) {
    url = '/api' + url;
  }
  // Prepend the backend URL for relative paths
  return `${process.env.REACT_APP_BACKEND_URL}${url}`;
};

export const getLevelColor = (level) => {
  const colors = {
    1: 'text-zinc-400',
    2: 'text-emerald-500',
    3: 'text-blue-500',
    4: 'text-purple-500',
    5: 'text-amber-500'
  };
  return colors[level] || 'text-zinc-400';
};

export const getRiskColor = (risk) => {
  const colors = {
    'LOW': 'text-emerald-500 border-emerald-500',
    'MEDIUM': 'text-amber-500 border-amber-500',
    'HIGH': 'text-red-500 border-red-500'
  };
  return colors[risk] || 'text-zinc-400 border-zinc-400';
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
