import { Clock, Construction } from "lucide-react";

interface InProgressPageProps {
  title: string;
}

const InProgressPage = ({ title }: InProgressPageProps) => {
  return (
    <main className="flex-1 bg-white p-8 min-h-screen">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="w-12 h-12 text-yellow-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>

          <div className="flex items-center justify-center text-gray-600 mb-8">
            <Clock className="w-5 h-5 mr-2" />
            <span className="text-lg">Página en desarrollo</span>
          </div>

          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Esta sección está siendo desarrollada. Pronto estará disponible con
            todas las funcionalidades.
          </p>

          <div className="mt-8">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-yellow-700 font-medium">En proceso</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default InProgressPage;
