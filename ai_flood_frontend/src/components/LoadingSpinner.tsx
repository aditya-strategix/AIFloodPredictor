export function LoadingSpinner({ size = 48 }: { size?: number }) {
  return (
    <div 
      className="animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" 
      style={{ width: size, height: size }}
    />
  );
}