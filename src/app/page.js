import AliMatrixForm from "@/components/AliMatrixForm";
import SubmissionCounter from "@/components/SubmissionCounter";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AliMatrix</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Przejrzysty system alimentacyjny w Polsce - oparte na rzeczywistych
            danych i analizach
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-10">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Zaproszenie do udziału w AliMatrix
            </h2>
            <p className="text-gray-700 mb-4">
              Rozwód, rozstanie i ustalanie wysokości alimentów na dzieci to
              sytuacje, które mogą budzić niepewność i wiele pytań.{" "}
              <strong>AliMatrix</strong> to niezależna platforma, która pomaga
              Ci lepiej zrozumieć Twoją sytuację -- na podstawie rzeczywistych
              danych i obiektywnych analiz.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-green-500 font-bold text-lg mb-2">✓</div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Spersonalizowany raport
                </h3>
                <p className="text-sm text-gray-600">
                  Otrzymasz raport, który pomoże Ci ocenić, jak Twoja sytuacja
                  wygląda na tle podobnych przypadków.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-green-500 font-bold text-lg mb-2">✓</div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Wspierasz innych
                </h3>
                <p className="text-sm text-gray-600">
                  Twoje dane (przetwarzane w sposób anonimowy) pomogą tworzyć
                  coraz dokładniejsze analizy.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-green-500 font-bold text-lg mb-2">✓</div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Masz kontrolę
                </h3>
                <p className="text-sm text-gray-600">
                  Twoje dane pozostaną poufne, a raporty nie będą ujawniały
                  indywidualnych historii.
                </p>
              </div>
            </div>

            <p className="text-gray-700">
              <strong>AliMatrix jest w pełni niezależny</strong> -- nie jest
              powiązany z żadnym innym komercyjnym przedsięwzięciem ani
              organizacją. Nie opowiada się po żadnej ze stron dyskusji -- jego
              celem jest{" "}
              <strong>rzetelna obiektywizacja kwestii alimentów</strong>, oparta
              na rzeczywistych danych.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <SubmissionCounter />
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Przygotuj się do wypełnienia formularza
          </h2>
          <p className="text-gray-700 mb-4">
            Wierzymy, że dokładność w zbieraniu danych jest kluczowa dla
            stworzenia precyzyjnych i wiarygodnych raportów. Prosimy, zabezpiecz
            sobie
            <strong> około 60 minut</strong> na wypełnienie formularza.
          </p>
          <p className="text-gray-700">
            Formularz składa się z kilku sekcji, które obejmują następujące
            obszary:
          </p>
          <ol className="mt-2 space-y-1 text-gray-700 list-decimal pl-5">
            <li>
              <strong>Informacje o dzieciach</strong> na które ustalane są
              alimenty.
            </li>
            <li>
              <strong>Harmonogram opieki</strong> nad dzieckiem i podział czasu
              między rodzicami.
            </li>
            <li>
              <strong>Dochody i koszty życia rodziców</strong> oraz wydatki
              związane z wychowaniem dzieci.
            </li>
            <li>
              <strong>Informacje o postępowaniu sądowym</strong> dotyczące
              statusu sprawy.
            </li>
            <li>
              <strong>Dane użytkownika</strong> dla bardziej miarodajnej
              analizy.
            </li>
          </ol>
        </div>

        <AliMatrixForm />

        <footer className="mt-12 text-center text-gray-500 text-sm py-6">
          <p>&copy; 2025 AliMatrix. Wszystkie prawa zastrzeżone.</p>
          <p className="mt-2">
            Działamy zgodnie z RODO i dbamy o bezpieczeństwo Twoich danych.
          </p>
        </footer>
      </div>
    </main>
  );
}
