import React, { useState, useEffect } from 'react';
import { updateText, updateBgImage } from '../../api/updateContent';

const TestimonialSec1 = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [title, setTitle] = useState(data.title);
  const [subtitle, setSubtitle] = useState(data.subtitle);
  const [bgImages, setBgImages] = useState(data.bgImages);

  // Preview URL for the newly chosen image
  const [previewUrl, setPreviewUrl] = useState(data.bgImages[0]?.url || '');

  // Whenever user selects a new file, create a preview URL
  useEffect(() => {
    if (bgImages[0]?.file) {
      const objectUrl = URL.createObjectURL(bgImages[0].file);
      setPreviewUrl(objectUrl);

      // Cleanup object URL on unmount or change
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(data.bgImages[0]?.url || '');
    }
  }, [bgImages, data.bgImages]);

  const handleSaveText = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await updateText('testimonials', 'testimonials-sec1', title, subtitle, null);
      console.log('Text updated successfully:', result);
    } catch (error) {
      console.error('Failed to update text:', error);
      setSubmitError('Failed to update text');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveBgImage = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const bgImageFile = bgImages[0]?.file;
      if (bgImageFile) {
        const result = await updateBgImage('testimonials', 'testimonials-sec1', bgImageFile, 0);
        console.log('Background image updated:', result);
      }
    } catch (error) {
      console.error('Failed to update background image:', error);
      setSubmitError('Failed to update background image');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBgImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedBgImages = [...bgImages];
    updatedBgImages[0] = { ...updatedBgImages[0], file };
    setBgImages(updatedBgImages);
  };

  return (
    <div
      className="testimonials-sec1 container"
      style={{
        borderBottom: '1px solid #ccc',
        padding: '40px 20px 50px 20px',
        maxWidth: '600px',
        margin: 'auto',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Section Header */}
      <div className="section-header text-center mb-5">
        <h2 style={{ marginBottom: '15px' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            placeholder="Enter Title"
            style={{
              width: '100%',
              padding: '12px 15px',
              fontSize: '24px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
              textAlign: 'center',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#007bff')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />
        </h2>
        <h3 style={{ marginBottom: '25px' }}>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            disabled={isSubmitting}
            placeholder="Enter Subtitle"
            rows={3}
            style={{
              width: '100%',
              padding: '12px 15px',
              fontSize: '18px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
              resize: 'vertical',
              transition: 'border-color 0.3s',
              textAlign: 'center',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#007bff')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />
        </h3>
        <button
          className="btn btn-primary"
          onClick={handleSaveText}
          disabled={isSubmitting}
          style={{ padding: '10px 30px', fontSize: '16px', borderRadius: '6px' }}
        >
          {isSubmitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Saving...
            </>
          ) : (
            'Save Text Changes'
          )}
        </button>
      </div>

      {/* Background Image Section */}
      <div className="bg-image text-center mb-5">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Background Preview"
            style={{
              maxHeight: '250px',
              maxWidth: '100%',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              marginBottom: '15px',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              height: '200px',
              border: '2px dashed #ccc',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#888',
              fontSize: '16px',
              marginBottom: '15px',
            }}
          >
            No background image
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleBgImageFileChange}
          disabled={isSubmitting}
          style={{
            display: 'block',
            margin: '0 auto 15px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
        />
        <button
          className="btn btn-primary"
          onClick={handleSaveBgImage}
          disabled={isSubmitting || !bgImages[0]?.file}
          style={{ padding: '10px 30px', fontSize: '16px', borderRadius: '6px' }}
        >
          {isSubmitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Saving...
            </>
          ) : (
            'Save Background Image'
          )}
        </button>
      </div>

      {/* Error message if any */}
      {submitError && (
        <div
          className="alert alert-danger"
          style={{ maxWidth: '400px', margin: '0 auto', marginTop: '15px' }}
        >
          {submitError}
        </div>
      )}
    </div>
  );
};

export default TestimonialSec1;