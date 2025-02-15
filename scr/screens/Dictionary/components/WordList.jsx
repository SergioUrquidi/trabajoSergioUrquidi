import React from 'react';
import { useSelector } from 'react-redux';
import { selectWords } from '../../../features/dictionary/dictionarySlice';

const WordList = () => {
  const words = useSelector(selectWords);

  if (words.length === 0) {
    return (
      <div className="word-list-empty">
        No words in dictionary yet. Click "Add Word" to start.
      </div>
    );
  }

  return (
    <div className="word-list">
      <h3 className="word-list-title">Dictionary Contents</h3>
      <div className="word-list-container">
        <table className="word-table">
          <thead>
            <tr>
              <th>Spanish</th>
              <th>English</th>
              <th>Portuguese</th>
            </tr>
          </thead>
          <tbody>
            {words.map((word, index) => (
              <tr key={index}>
                <td>{word.es}</td>
                <td>{word.en}</td>
                <td>{word.pt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WordList;