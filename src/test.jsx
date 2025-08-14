export default function Test() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">🎉 Tailwind is Working!</h1>
        <p className="text-slate-600">If you see this styled card, Tailwind CSS is properly configured.</p>
        <button className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors">
          Test Button
        </button>
      </div>
    </div>
  );
}
