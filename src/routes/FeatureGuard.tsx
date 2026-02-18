import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function FeatureGuard({ featureKey, children }: { featureKey: string; children: React.ReactNode }) {
  const { user, loading, isFeatureEnabled } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (!isFeatureEnabled(featureKey)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Fitur Tidak Tersedia</h1>
          <p className="text-gray-600">
            Fitur ini belum diaktifkan untuk akun Anda.
          </p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
