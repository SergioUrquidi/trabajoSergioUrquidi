import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeWord } from '../../../features/dictionary/dictionarySlice';

const RemoveWordModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [word, setWord] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(removeWord(word));
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Remove Word</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">
              Enter word to remove (in any language):
            </label>
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="form-submit">
            Remove Word
          </button>
        </form>
      </div>
    </div>
  );
};

export default RemoveWordModal;