import React from 'react';
import { useAppContext } from '../context/AppContext';
import { utils } from '../utils/helpers';

const JournalView = () => {
  const { journal, addJournalEntry } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.elements.entry.value;
    if (text) {
      addJournalEntry({ text });
      e.target.reset();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Mon Journal</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg border">
        <textarea name="entry" className="w-full p-3 border rounded-lg h-24" placeholder="Qu'avez-vous en tête ?"></textarea>
        <button type="submit" className="mt-2 w-full py-2 bg-purple-600 text-white rounded-lg font-bold">Ajouter au journal</button>
      </form>
      <div className="space-y-4">
        {journal.length > 0 ? journal.map(entry => (
          <div key={entry.id} className="bg-white p-4 rounded-xl shadow border-l-4 border-purple-500">
            <p className="font-semibold">{entry.text}</p>
            <p className="text-xs text-gray-500 mt-1">{utils.timeAgo(entry.date)}</p>
          </div>
        )) : (
          <p className="text-center text-gray-500 py-8">Aucune entrée dans le journal.</p>
        )}
      </div>
    </div>
  );
};

export default JournalView;