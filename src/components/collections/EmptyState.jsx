export default function EmptyState({ selectedYear, setSelectedYear }) {
  return (
    <div className="text-center py-16 my-8 bg-gray-800 rounded-xl">
      <div className="text-6xl mb-4">📚</div>
      <h3 className="text-2xl font-bold mb-2">No items found</h3>
      <p className="text-gray-400 mb-6">
        {selectedYear === 'all' 
          ? "Your collection is empty" 
          : `No items in your collection from ${selectedYear}`}
      </p>
      {selectedYear !== 'all' && (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => setSelectedYear('all')}
        >
          View All Items
        </button>
      )}
    </div>
  );
}
