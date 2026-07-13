import React, { useState } from 'react';
import { updateText, updateBgImage, updateCarImage } from '../../api/updateContent';

const ServicesSec1 = ({ data }) => {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // State to store the editable fields
  const [title, setTitle] = useState(data.title);
  const [subtitle, setSubtitle] = useState(data.subtitle);
  const [description, setDescription] = useState(data.description);
  const [bgImages, setBgImages] = useState(data.bgImages);
  const [carImages, setCarImages] = useState(data.carImages);
  // Function to handle the Save button for updating text fields (title and subtitle)
  const handleSaveText = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Update the title and subtitle using the API
      const result = await updateText('services', 'services-sec1', title, null, description);
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
        const result = await updateBgImage('services', 'services-sec1', bgImageFile, 0);
        console.log('Background image updated:', result);
      }
    } catch (error) {
      console.error('Failed to update background image:', error);
      setSubmitError('Failed to update background image');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle the Save button for updating car images
  const handleSaveCarImages = async () => {
  if (isSubmitting) return;

  setIsSubmitting(true);
  setSubmitError(null);

  try {
    for (let i = 0; i < carImages.length; i++) {
      const car = carImages[i];
      const carFile = car.file;
      const carTitle = car.title;
      const carSubtitle = car.subtitle;
      const carRating = car.rating;

      // Check if we need to update (either file changed or text fields changed)
      const hasFileChange = carFile !== undefined;
      const hasTextChange = carTitle !== data.carImages[i].title || 
                           carSubtitle !== data.carImages[i].subtitle || 
                           carRating !== data.carImages[i].rating;

      if (hasFileChange || hasTextChange) {
        console.log("Update car image: ", { carFile, carTitle, carSubtitle, carRating });
        
        // Only pass the file if it exists
        const result = await updateCarImage(
          'services', 
          'services-sec1', 
          carFile, // This will be undefined if no file was selected
          i, 
          carTitle, 
          carSubtitle, 
          carRating
        );
        console.log('Car image updated:', result);
      }
    }

    console.log('All car images updated successfully!');
  } catch (error) {
    console.error('Error updating car images:', error);
    setSubmitError('Failed to update car images');
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
    updatedBgImages[0] = { 
      ...updatedBgImages[0], 
      file,
      url: previewUrl,
    };

    setBgImages(updatedBgImages);
  };

  // Handle file change for car images
  const handleCarImageFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    const updatedCarImages = [...carImages];
    updatedCarImages[index] = { 
      ...updatedCarImages[index], 
      file,
      url: previewUrl,
    };
    
    setCarImages(updatedCarImages);
  };

  return (
    <div className="services-sec1 container" style={{borderBottom: '1px solid #ccc', padding: '0 0 50px 0'}}>
      {/* Section Header */}
      <div className="section-header text-center mb-4">
        <h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            style={{ fontSize: '24px', textAlign: 'center' }}
          />
        </h2>
        <h2>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            disabled={isSubmitting}
            style={{ fontSize: '24px', textAlign: 'center' }}
          />
        </h2>
        <h4>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
            style={{ fontSize: '20px', textAlign: 'center' }}
          />
        </h4>
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
        {bgImages[0]?.url && (
          <div>
            <img
              src={bgImages[0].url}
              alt="Background"
              style={{ maxHeight: '200px' }}
            />
          </div>
        )}
        <input
          type="file"
          onChange={handleBgImageFileChange}
          disabled={isSubmitting}
          style={{ marginTop: '10px' }}
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

      {/* Car Images */}
      <div className="car-images">
        {carImages && carImages.length > 0 ? (
          carImages.map((car, carIndex) => (
            <div key={carIndex} className="car-item mb-4" style={{ textAlign: 'center', border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
              <img
                src={car.url}
                alt={car.title}
                style={{ width: '80px', height: 'auto', marginBottom: '10px' }}
              />
              <input
                type="file"
                onChange={(e) => handleCarImageFileChange(e, carIndex)}
                disabled={isSubmitting}
                style={{ marginBottom: '10px' }}
              />

            </div>
          ))
        ) : (
          <p>No cars available.</p>
        )}
      </div>

      {/* Error message if any */}
      {submitError && <div className="alert alert-danger">{submitError}</div>}

      {/* Save Buttons */}
      <div className="d-flex justify-content-center mt-2 mb-4">
        <button
          className="btn btn-primary ml-2"
          onClick={handleSaveCarImages}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : (
            'Save Car Image Changes'
          )}
        </button>
      </div>
    </div>
  );
};

export default ServicesSec1;