import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWord, selectWords } from '../../../features/dictionary/dictionarySlice';

const AddWordModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const words = useSelector(selectWords);
  const [formData, setFormData] = useState({
    spanish: '',
    english: '',
    portuguese: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verificar si la palabra ya existe en cualquier idioma
    const wordExists = words.some(word => 
      word.es === formData.spanish.toLowerCase() ||
      word.en === formData.english.toLowerCase() ||
      word.pt === formData.portuguese.toLowerCase()
    );

    if (wordExists) {
      setError('One or more words already exist in the dictionary');
      return;
    }

    dispatch(addWord(formData));
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Limpiar error cuando se modifica algún campo
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Add New Word</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        
        {error && (
          <div className="dictionary-error">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Spanish:</label>
            <input
              type="text"
              name="spanish"
              value={formData.spanish}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="Enter word in Spanish"
            />
          </div>

          <div className="form-group">
            <label className="form-label">English:</label>
            <input
              type="text"
              name="english"
              value={formData.english}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="Enter word in English"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Portuguese:</label>
            <input
              type="text"
              name="portuguese"
              value={formData.portuguese}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="Enter word in Portuguese"
            />
          </div>

          <button type="submit" className="form-submit">
            Add Word
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWordModal;