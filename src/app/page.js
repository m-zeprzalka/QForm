import AliMatrixForm from "@/components/AliMatrixForm";
import SubmissionCounter from "@/components/SubmissionCounter";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AliMatrix</h1>
          <p className="mt-2 text-lg text-gray-600">
            Przejrzysty system alimentacyjny w Polsce
          </p>
        </div>

        <div className="mb-8">
          <SubmissionCounter />
        </div>

        <AliMatrixForm />

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>&copy; 2025 AliMatrix. Wszystkie prawa zastrzeżone.</p>
        </footer>
      </div>
    </main>
  );
}
