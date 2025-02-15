import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { translateWord } from '../../../features/dictionary/dictionarySlice';

const TranslateModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    word: '',
    fromLang: 'es',
    toLang: 'en'
  });
  const [translation, setTranslation] = useState('');
  
  // Mover useSelector fuera del handler
  const translate = useSelector(state => (word, fromLang, toLang) => 
    translateWord(state, word, fromLang, toLang)
  );

  const handleTranslate = (e) => {
    e.preventDefault();
    const result = translate(formData.word, formData.fromLang, formData.toLang);
    
    if (result) {
      setTranslation(result);
    } else {
      setTranslation('Word not found in dictionary');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar la traducción cuando se cambia algún campo
    setTranslation('');
  };

  const languages = [
    { value: 'es', label: 'Spanish' },
    { value: 'en', label: 'English' },
    { value: 'pt', label: 'Portuguese' }
  ];

  // Evitar seleccionar el mismo idioma de origen y destino
  const availableTargetLanguages = languages.filter(
    lang => lang.value !== formData.fromLang
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Translate Word</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleTranslate} className="modal-form">
          <div className="form-group">
            <label className="form-label">Word to translate:</label>
            <input
              type="text"
              name="word"
              value={formData.word}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="Enter word to translate"
            />
          </div>

          <div className="form-group">
            <label className="form-label">From:</label>
            <select
              name="fromLang"
              value={formData.fromLang}
              onChange={handleChange}
              className="form-input"
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">To:</label>
            <select
              name="toLang"
              value={formData.toLang}
              onChange={handleChange}
              className="form-input"
            >
              {availableTargetLanguages.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="form-submit">
            Translate
          </button>

          {translation && (
            <div className="form-group">
              <label className="form-label">Translation:</label>
              <textarea
                className="form-textarea"
                value={translation}
                readOnly
                rows={3}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TranslateModal;