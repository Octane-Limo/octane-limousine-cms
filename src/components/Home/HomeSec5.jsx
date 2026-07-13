import React, { useState } from 'react';
import {
  updateText,
  updateBgImage,
  updateCarImage,
  updateButton,
  updateButtonInRoot,
} from '../../api/updateContent';

const HomeSec5 = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [title, setTitle] = useState(data?.title);
  const [subtitle, setSubtitle] = useState(data?.subtitle);
  const [bgImages, setBgImages] = useState(data?.bgImages || []);
  const [carImages, setCarImages] = useState(data?.carImages || []);
  const [buttons, setButtons] = useState(data?.buttons || []);

  const handleSaveText = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await updateText('home', 'home-sec5', title, subtitle, null);
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
        const result = await updateBgImage('home', 'home-sec5', bgImageFile, 0);
        console.log('Background image updated:', result);
      }
    } catch (error) {
      console.error('Failed to update background image:', error);
      setSubmitError('Failed to update background image');
    } finally {
      setIsSubmitting(false);
    }
  };

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

        const hasFileChange = carFile !== undefined;
        const hasTextChange =
          carTitle !== data.carImages[i].title ||
          carSubtitle !== data.carImages[i].subtitle ||
          carRating !== data.carImages[i].rating;

        if (hasFileChange || hasTextChange) {
          const result = await updateCarImage(
            'home',
            'home-sec5',
            carFile,
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

  const handleSaveButton = async (carIndex, buttonIndex, buttonText, buttonHref) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await updateButton(
        'home',
        'home-sec5',
        carIndex,
        buttonIndex,
        buttonText,
        buttonHref
      );
      console.log('Button updated successfully:', result);
    } catch (error) {
      console.error('Failed to update button:', error);
      setSubmitError('Failed to update button');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveButtonInRoot = async (buttonIndex, buttonText, buttonHref) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await updateButtonInRoot(
        'home',
        'home-sec5',
        buttonIndex,
        buttonText,
        buttonHref
      );
      console.log('Button updated successfully:', result);
    } catch (error) {
      console.error('Failed to update button:', error);
      setSubmitError('Failed to update button');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const handleCarChange = (e, index, field) => {
    const value = e.target.value;
    const updatedCarImages = [...carImages];
    updatedCarImages[index] = { ...updatedCarImages[index], [field]: value };
    setCarImages(updatedCarImages);
  };

  const handleButtonTextChange = (e, carIndex, buttonIndex, field) => {
    const value = e.target.value;
    const updatedCarImages = [...carImages];
    if (!updatedCarImages[carIndex].buttons[buttonIndex]) {
      updatedCarImages[carIndex].buttons[buttonIndex] = {};
    }
    updatedCarImages[carIndex].buttons[buttonIndex][field] = value;
    setCarImages(updatedCarImages);
  };

  const handleButtonChange = (e, buttonIndex, field) => {
    const value = e.target.value;
    const updatedButtons = [...buttons];
    if (!updatedButtons[buttonIndex]) {
      updatedButtons[buttonIndex] = {};
    }
    updatedButtons[buttonIndex][field] = value;
    setButtons(updatedButtons);
  };

  return (
    <div className="home-sec5 container border-bottom pb-5">
      {/* Section Header */}
      <div className="section-header text-center mb-4">
        <h2 className="mb-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            className="form-control form-control-lg text-center fw-semibold"
            placeholder="Section Title"
            aria-label="Section title"
          />
        </h2>
        <h4 className="mb-3">
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            disabled={isSubmitting}
            className="form-control text-center"
            placeholder="Section Subtitle"
            aria-label="Section subtitle"
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
          <div className="d-flex justify-content-center mb-3">
            <div className="card shadow-sm" style={{ maxWidth: 640 }}>
              {/* <div className="ratio ratio-16x9"> */}
                <img
                  src={bgImages[0]?.url}
                  alt="Background"
                  className="object-fit-cover rounded-top"
                />
              {/* </div> */}
            </div>
          </div>
        )}

        <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
          <input
            type="file"
            onChange={handleBgImageFileChange}
            disabled={isSubmitting}
            className="form-control"
            aria-label="Choose background image"
            style={{ maxWidth: 320 }}
          />
          <button
            className="btn btn-outline-primary"
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
      </div>

      {/* Car Images */}
      <div className="car-images">
        {carImages && carImages.length > 0 ? (
          <div className="row g-4">
            {carImages.map((car, carIndex) => (
              <div key={carIndex} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="ratio ratio-4x3">
                    <img
                      src={car.url}
                      alt={car.title}
                      className="object-fit-cover rounded-top"
                    />
                  </div>
                  <div className="card-body">
                    <div className="mb-2">
                      <input
                        type="text"
                        value={car.title}
                        onChange={(e) => handleCarChange(e, carIndex, 'title')}
                        disabled={isSubmitting}
                        placeholder="Car Title"
                        className="form-control text-center fw-semibold"
                        aria-label={`Car ${carIndex + 1} title`}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        value={car.subtitle}
                        onChange={(e) => handleCarChange(e, carIndex, 'subtitle')}
                        disabled={isSubmitting}
                        placeholder="Car Subtitle"
                        className="form-control text-center"
                        aria-label={`Car ${carIndex + 1} subtitle`}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={car.rating}
                        onChange={(e) => handleCarChange(e, carIndex, 'rating')}
                        disabled={isSubmitting}
                        placeholder="Rating"
                        className="form-control text-center"
                        aria-label={`Car ${carIndex + 1} rating`}
                      />
                    </div>
                    <input
                      type="file"
                      onChange={(e) => handleCarImageFileChange(e, carIndex)}
                      disabled={isSubmitting}
                      className="form-control mb-2"
                      aria-label={`Upload image for car ${carIndex + 1}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No cars available</p>
        )}
        <div className="text-center mt-4">
          <button
            className="btn btn-primary"
            onClick={handleSaveCarImages}
            disabled={isSubmitting}
          >
            Save Car Changes
          </button>
        </div>
      </div>

      {/* ✅ Show Only One Car Button (Car 0, Button 0) */}
      {carImages?.[0]?.buttons?.[0] && (
        <div className="car-button-section text-center my-5">
          <h5 className="mb-3">Car Button (Car 1)</h5>
          <div className="card mx-auto shadow-sm" style={{ maxWidth: 420 }}>
            <div className="card-body">
              <div className="mb-2">
                <input
                  type="text"
                  value={carImages[0].buttons[0].text || ''}
                  onChange={(e) => handleButtonTextChange(e, 0, 0, 'text')}
                  disabled={isSubmitting}
                  placeholder="Car Button Text"
                  className="form-control text-center"
                  aria-label="Car button text"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={carImages[0].buttons[0].href || ''}
                  onChange={(e) => handleButtonTextChange(e, 0, 0, 'href')}
                  disabled={isSubmitting}
                  placeholder="Car Button Link"
                  className="form-control text-center"
                  aria-label="Car button link"
                />
              </div>
              <button
                className="btn btn-success w-100"
                onClick={() =>
                  handleSaveButton(
                    0,
                    0,
                    carImages[0].buttons[0].text,
                    carImages[0].buttons[0].href
                  )
                }
                disabled={isSubmitting}
              >
                Save Car Button
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {submitError && (
        <div className="alert alert-danger" role="alert">
          {submitError}
        </div>
      )}

      {/* Root Button Section */}
      <div className="root-button-section text-center mt-5">
        <h5 className="mb-3">Root Buttons</h5>
        {buttons.map((btn, idx) => (
          <div key={idx} className="card mx-auto shadow-sm mb-4" style={{ maxWidth: 420 }}>
            <div className="card-body">
              <input
                type="text"
                value={btn.text || ''}
                onChange={(e) => handleButtonChange(e, idx, 'text')}
                disabled={isSubmitting}
                placeholder="Button Text"
                className="form-control mb-2 text-center"
              />
              <input
                type="text"
                value={btn.href || ''}
                onChange={(e) => handleButtonChange(e, idx, 'href')}
                disabled={isSubmitting}
                placeholder="Button Link"
                className="form-control mb-3 text-center"
              />
              <button
                className="btn btn-outline-success w-100"
                onClick={() => handleSaveButtonInRoot(idx, btn.text, btn.href)}
                disabled={isSubmitting}
              >
                Save Root Button
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSec5;