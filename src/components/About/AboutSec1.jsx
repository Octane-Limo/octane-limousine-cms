import React, { useState } from 'react';
import { updateText, updateBgImage, updateCarImageInBG } from '../../api/updateContent';

const AboutSec1 = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // State to store the editable fields
  const [title, setTitle] = useState(data.title || '');
  const [subtitle, setSubtitle] = useState(data.subtitle || '');
  const [description, setDescription] = useState(data.description || '');
  const [bgImages, setBgImages] = useState(data.bgImages || []);

  // Function to handle the Save button for updating text fields
  const handleSaveText = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Update the text fields using the API
      const result = await updateText('about', 'about-sec1', title, subtitle, description);
      console.log('Text updated successfully:', result);
    } catch (error) {
      console.error('Failed to update text:', error);
      setSubmitError('Failed to update text');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle the Save button for updating background images
  const handleSaveBgImage = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const bgImageFile = bgImages[0]?.file;
      if (bgImageFile) {
        const result = await updateBgImage('about', 'about-sec1', bgImageFile, 0);
        console.log('Background image updated:', result);
      }
    } catch (error) {
      console.error('Failed to update background image:', error);
      setSubmitError('Failed to update background image');
    } finally {
      setIsSubmitting(false);
    }
  };

const handleSaveCarImage = async (carIndex) => {
  if (isSubmitting) return;

  setIsSubmitting(true);
  setSubmitError(null);

  try {
    const bgImage = bgImages[0];
    const carImage = bgImage?.carImages?.[carIndex];

      // If there's a file, upload it
      if (carImage.file) {
        const result = await updateCarImageInBG(
          'about', 
          'about-sec1', 
          carImage.file,
          'bgImages',
          0, // bgImageIndex
          carIndex, // carImageIndex
          carImage.title || '',
          carImage.subtitle || '',
          carImage.description || ''
        );
        console.log('Car image updated:', result);
      }
  } catch (error) {
    console.error('Failed to update car image:', error);
    setSubmitError(`Failed to update car ${carIndex + 1}`);
  } finally {
    setIsSubmitting(false);
  }
};



  // Handle file change for background image
  const handleBgImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    const updatedBgImages = [...bgImages];
    if (!updatedBgImages[0]) {
      updatedBgImages[0] = {};
    }
    updatedBgImages[0].file = file;
    updatedBgImages[0].url = previewUrl;

    setBgImages(updatedBgImages);
  };

  // Handle file change for specific car image
    const handleCarImageFileChange = (e, carIndex) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedBgImages = [...bgImages];
    
    // Ensure the structure exists
    if (!updatedBgImages[0]) {
        updatedBgImages[0] = {};
    }
    if (!updatedBgImages[0].carImages) {
        updatedBgImages[0].carImages = [];
    }
    if (!updatedBgImages[0].carImages[carIndex]) {
        updatedBgImages[0].carImages[carIndex] = {};
    }
    
    // Create a preview URL for the image
    const previewUrl = URL.createObjectURL(file);
    updatedBgImages[0].carImages[carIndex].file = file;
    updatedBgImages[0].carImages[carIndex].url = previewUrl;
    
    setBgImages(updatedBgImages);
    };

  return (
    <div className="about-sec1 container my-4" style={{borderBottom: '1px solid #ccc', padding: '0 0 50px 0'}}>
      {/* Section Header */}
      <div className="section-header text-center mb-4">
        <h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            placeholder="Title"
            style={{ fontSize: '24px', textAlign: 'center', width: '100%' }}
          />
        </h2>
        <h4>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            disabled={isSubmitting}
            placeholder="Subtitle"
            style={{ fontSize: '20px', textAlign: 'center', width: '100%' }}
          />
        </h4>
        <p>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
            placeholder="Description"
            style={{ fontSize: '16px', textAlign: 'center', width: '100%' }}
          />
        </p>
        <button
          className="btn btn-primary"
          onClick={handleSaveText}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : (
            'Save Text Changes'
          )}
        </button>
      </div>

      {/* Background Image */}
      <div className="bg-image text-center mb-5">
        <h5>Background Image:</h5>
        {bgImages[0]?.url && (
          <div>
            <img
              src={bgImages[0].url}
              alt={bgImages[0].alt || 'Background'}
              style={{ maxHeight: '200px', marginBottom: '10px' }}
            />
          </div>
        )}
        <input
          type="file"
          onChange={handleBgImageFileChange}
          disabled={isSubmitting}
          style={{ marginBottom: '10px' }}
        />
        <button
          className="btn btn-primary ml-2"
          onClick={handleSaveBgImage}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : (
            'Save Background Image'
          )}
        </button>
      </div>

      {/* Car Images (within Background Image) */}
    <div className="car-images-section mb-5">
        <h5>Car Images:</h5>
        
        {bgImages[0]?.carImages?.map((car, index) => (
            <div key={index} className="car-image-item mb-4 p-3 border rounded">
            <h6>Car {index + 1}</h6>
            
            {car.url && (
                <div className="text-center mb-3">
                <img
                    src={car.url}
                    alt={car.alt || `Car ${index + 1}`}
                    style={{ maxHeight: '150px', marginBottom: '10px' }}
                    className="img-thumbnail"
                />
                </div>
            )}
            
            <div className="mb-3">
                <label className="form-label">Upload Car Image {index + 1}</label>
                <input
                type="file"
                className="form-control"
                onChange={(e) => handleCarImageFileChange(e, index)}
                disabled={isSubmitting}
                style={{ marginBottom: '10px' }}
                />
            </div>
            
            
            <button
                className="btn btn-primary"
                onClick={() => handleSaveCarImage(index)}
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                </>
                ) : (
                `Save Car ${index + 1}`
                )}
            </button>
            </div>
        ))}
    </div>

      {/* Error message if any */}
      {submitError && <div className="alert alert-danger">{submitError}</div>}
    </div>
  );
};

export default AboutSec1;