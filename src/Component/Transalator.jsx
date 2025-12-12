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
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6">
  <div className="bg-white/30 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-lg border border-white/40">
    <h1 className="text-4xl font-extrabold mb-6 text-white drop-shadow-lg text-center">
       Smart Translator
    </h1>

    <textarea
      className="border border-gray-300 rounded-xl p-4 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
      rows="4"
      placeholder="Enter text in English..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    />

    <select
      className="border border-gray-300 rounded-xl p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
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
      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-md transition transform hover:scale-105 disabled:opacity-50"
    >
      {loading ? "🔄 Translating..." : "✨ Translate"}
    </button>

    {translated && (
      <div className="mt-6 p-5 bg-white/60 backdrop-blur-md rounded-xl shadow-md border border-white/40">
        <h2 className="text-lg font-bold mb-2 text-indigo-800"> Translated Text:</h2>
        <p className="text-gray-900 font-medium">{translated}</p>
      </div>
    )}
  </div>
</div>

  );
}
