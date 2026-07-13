import React, { useState } from 'react';
import { updateText, updateBgImage, updateCarImageInBG, updateButtonInRoot } from '../../api/updateContent';

const HomeSec6 = ({ data }) => {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // State to store the editable fields
  const [title, setTitle] = useState(data?.title || '');
  const [subtitle, setSubtitle] = useState(data?.subtitle || '');
  const [description, setDescription] = useState(data?.description || '');
  const [bgImages, setBgImages] = useState(data?.bgImages || []);
  const [buttons, setButtons] = useState(data?.buttons || []);

  // Function to handle the Save button for updating text fields
  const handleSaveText = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Update the text fields using the API
      const result = await updateText('home', 'home-sec6', title, subtitle, description);
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
        const result = await updateBgImage('home', 'home-sec6', bgImageFile, 0);
        console.log('Background image updated:', result);
      }
    } catch (error) {
      console.error('Failed to update background image:', error);
      setSubmitError('Failed to update background image');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle updating car image in the background image
  const handleSaveCarImage = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const bgImage = bgImages[0];
      const carImageFile = bgImage?.carImages?.[0]?.file;
      
      if (carImageFile) {
        const result = await updateCarImageInBG(
          'home', 
          'home-sec6', 
          carImageFile,
          'bgImages',
          0, // carImageIndex
          0, // bgImageIndex
          null, // title
          null, // subtitle
          null // rating
        );
        console.log('Car image updated:', result);
      }
    } catch (error) {
      console.error('Failed to update car image:', error);
      setSubmitError('Failed to update car image');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle updating button
  const handleSaveButton = async (buttonIndex, buttonText, buttonHref) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      console.log("Updating button:", { buttonIndex, buttonText, buttonHref });
      
      const result = await updateButtonInRoot(
        'home', 
        'home-sec6', 
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

  // Handle file change for car image (within bgImage)
  const handleCarImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    const updatedBgImages = [...bgImages];
    if (!updatedBgImages[0]) {
      updatedBgImages[0] = {};
    }
    if (!updatedBgImages[0].carImages) {
      updatedBgImages[0].carImages = [];
    }
    if (!updatedBgImages[0].carImages[0]) {
      updatedBgImages[0].carImages[0] = {};
    }
    updatedBgImages[0].carImages[0].file = file;
    updatedBgImages[0].carImages[0].url = previewUrl;
    setBgImages(updatedBgImages);
  };

  // Handle button text change
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
    <div className="home-sec6 container my-4" style={{borderBottom: '1px solid #ccc', padding: '0 0 50px 0'}}>
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
          <input
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

      {/* Car Image (within Background Image) */}
      <div className="car-image text-center mb-5">
        <h5>Car Image:</h5>
        {bgImages[0]?.carImages?.[0]?.url && (
          <div>
            <img
              src={bgImages[0].carImages[0].url}
              alt={bgImages[0].carImages[0].alt || 'Car'}
              style={{ maxHeight: '150px', marginBottom: '10px' }}
            />
          </div>
        )}
        <input
          type="file"
          onChange={handleCarImageFileChange}
          disabled={isSubmitting}
          style={{ marginBottom: '10px' }}
        />
        <button
          className="btn btn-primary ml-2"
          onClick={handleSaveCarImage}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : (
            'Save Car Image'
          )}
        </button>
      </div>

      {/* Button */}
      <div className="button-section text-center mb-4">
        <h5>Button:</h5>
        <div style={{ marginBottom: '15px', padding: '10px', border: '1px solid #eee', display: 'inline-block' }}>
          <input
            type="text"
            value={buttons[0]?.text || ''}
            onChange={(e) => handleButtonChange(e, 0, 'text')}
            disabled={isSubmitting}
            placeholder="Button Text"
            style={{ marginBottom: '5px', textAlign: 'center', width: '200px' }}
          />
          <br />
          <input
            type="text"
            value={buttons[0]?.href || ''}
            onChange={(e) => handleButtonChange(e, 0, 'href')}
            disabled={isSubmitting}
            placeholder="Button Link"
            style={{ marginBottom: '5px', textAlign: 'center', width: '200px' }}
          />
          <br />
          <button
            className="btn btn-sm btn-success"
            onClick={() => handleSaveButton(0, buttons[0]?.text, buttons[0]?.href)}
            disabled={isSubmitting}
          >
            Save Button
          </button>
        </div>
      </div>

      {/* Error message if any */}
      {submitError && <div className="alert alert-danger">{submitError}</div>}

      {/* Preview Section */}
      {/* <div className="preview-section text-center mt-4 p-3" style={{ border: '2px dashed #ccc' }}>
        <h4>Preview:</h4>
        <h2>{title}</h2>
        <h4>{subtitle}</h4>
        <p>{description}</p>
        {bgImages[0]?.url && (
          <img
            src={bgImages[0].url}
            alt="Background Preview"
            style={{ maxHeight: '100px', margin: '10px' }}
          />
        )}
        {bgImages[0]?.carImages?.[0]?.url && (
          <img
            src={bgImages[0].carImages[0].url}
            alt="Car Preview"
            style={{ maxHeight: '80px', margin: '10px' }}
          />
        )}
        {buttons[0] && (
          <button className="btn btn-primary" style={{ margin: '10px' }}>
            {buttons[0].text}
          </button>
        )}
      </div> */}
    </div>
  );
};

export default HomeSec6;