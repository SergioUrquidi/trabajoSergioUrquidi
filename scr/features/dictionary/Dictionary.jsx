import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectError } from '../../features/dictionary/dictionarySlice';
import AddWordModal from './components/AddWordModal';
import RemoveWordModal from './components/RemoveWordModal';
import TranslateModal from './components/TranslateModal';
import WordList from './components/WordList';
import './Dictionary.css';

const Dictionary = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showTranslateModal, setShowTranslateModal] = useState(false);
  const error = useSelector(selectError);

  return (
    <div className="dictionary-container">
      <h1 className="dictionary-title">Dictionary Translator</h1>
      
      {error && <div className="dictionary-error">{error}</div>}
      
      <div className="dictionary-buttons">
        <button 
          className="dictionary-button"
          onClick={() => setShowAddModal(true)}
        >
          Add Word
        </button>
        
        <button 
          className="dictionary-button"
          onClick={() => setShowRemoveModal(true)}
        >
          Remove Word
        </button>
        
        <button 
          className="dictionary-button"
          onClick={() => setShowTranslateModal(true)}
        >
          Translate
        </button>
      </div>

      <WordList />

      {showAddModal && (
        <AddWordModal onClose={() => setShowAddModal(false)} />
      )}
      
      {showRemoveModal && (
        <RemoveWordModal onClose={() => setShowRemoveModal(false)} />
      )}
      
      {showTranslateModal && (
        <TranslateModal onClose={() => setShowTranslateModal(false)} />
      )}
    </div>
  );
};

export default Dictionary;