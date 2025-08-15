import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);
  const [targetLang, setTargetLang] = useState("hi"); // default Hindi

  const translateText = async () => {
    if (!text) return;
    setLoading(true);

    const formData = new URLSearchParams();
    formData.append("source_language", "en"); // From English
    formData.append("target_language", targetLang);
    formData.append("text", text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "x-rapidapi-key": "ae32641a53msh64ed58dc529ca96p1bfdc7jsna85e9efd4516",
        "x-rapidapi-host": "text-translator2.p.rapidapi.com",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: formData,
    };

    try {
      const response = await axios.request(options);
      setTranslated(response.data.data.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslated("Error translating text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">🌍 Text Translator</h1>

      <textarea
        className="border border-gray-300 rounded-lg p-3 w-full max-w-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows="4"
        placeholder="Enter text in English..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value)}
      >
        <option value="hi">Hindi</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="ta">Tamil</option>
        <option value="te">Telugu</option>
        <option value="mr">Marathi</option>
        <option value="kn">Kannada</option>
      </select>

      <button
        onClick={translateText}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      {translated && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2">Translated Text:</h2>
          <p className="text-gray-800">{translated}</p>
        </div>
      )}
    </div>
  );
}
