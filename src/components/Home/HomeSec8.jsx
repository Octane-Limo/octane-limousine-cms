import React, { useState } from 'react';
import { updateText, updateBgImage, updateIcon, updateButtonInRoot } from '../../api/updateContent';

const HomeSec8 = ({ data }) => {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // State to store the editable fields
  const [title, setTitle] = useState(data?.title || '');
  const [subtitle, setSubtitle] = useState(data?.subtitle || '');
  const [description, setDescription] = useState(data?.description || '');
  const [bgImages, setBgImages] = useState(data?.bgImages || []);
  const [icons, setIcons] = useState(data?.icons || []);
  const [buttons, setButtons] = useState(data?.buttons || []);

  // Function to handle the Save button for updating text fields
  const handleSaveText = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Update the text fields using the API
      const result = await updateText('home', 'home-sec8', title, subtitle, description);
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
        const result = await updateBgImage('home', 'home-sec8', bgImageFile, 0);
        console.log('Background image updated:', result);
      }
    } catch (error) {
      console.error('Failed to update background image:', error);
      setSubmitError('Failed to update background image');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle updating icons
  const handleSaveIcon = async (iconIndex) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const icon = icons[iconIndex];
      const iconFile = icon?.file;
      
      const result = await updateIcon(
        'home', 
        'home-sec8', 
        iconFile,
        iconIndex,
        icon.title
      );
      console.log('Icon updated successfully:', result);
    } catch (error) {
      console.error('Failed to update icon:', error);
      setSubmitError('Failed to update icon');
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
        'home-sec8',
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

  // Handle icon file change
  // const handleIconFileChange = (e, iconIndex) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const updatedIcons = [...icons];
  //   if (!updatedIcons[iconIndex]) {
  //     updatedIcons[iconIndex] = {};
  //   }
  //   updatedIcons[iconIndex].file = file;
  //   setIcons(updatedIcons);
  // };

  // Handle icon title change
  const handleIconChange = (e, iconIndex, field) => {
    const value = e.target.value;

    const updatedIcons = [...icons];
    if (!updatedIcons[iconIndex]) {
      updatedIcons[iconIndex] = {};
    }
    updatedIcons[iconIndex][field] = value;
    setIcons(updatedIcons);
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
    <div className="home-sec8 container my-4" style={{borderBottom: '1px solid #ccc', padding: '0 0 50px 0'}}>
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
            placeholder="Description"
            rows="3"
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

      {/* Icons */}
      <div className="icons-container mb-5">
        <h4 className="text-center mb-4">Contact Icons:</h4>
        <div className="row">
          {icons && icons.length > 0 ? (
            icons.map((icon, iconIndex) => (
              <div key={iconIndex} className="col-md-4 mb-4">
                <div className="icon-item text-center p-3" style={{ border: '1px solid #ddd', borderRadius: '8px', height: '100%' }}>
                  <h6>Icon #{iconIndex + 1}</h6>
                  
                  {/* Icon Image */}
                  {/* <div className="icon-image mb-3">
                    {icon.icon && (
                      <img
                        src={icon.icon}
                        alt={`Icon ${iconIndex + 1}`}
                        style={{ width: '50px', height: '50px', objectFit: 'contain', marginBottom: '10px' }}
                      />
                    )}
                    <input
                      type="file"
                      onChange={(e) => handleIconFileChange(e, iconIndex)}
                      disabled={isSubmitting}
                      style={{ marginBottom: '10px', width: '100%' }}
                    />
                  </div> */}

                  {/* Icon Title */}
                  <div className="icon-title mb-3">
                    <textarea
                      value={icon.title || ''}
                      onChange={(e) => handleIconChange(e, iconIndex, 'title')}
                      disabled={isSubmitting}
                      placeholder="Icon Text/Description"
                      rows="3"
                      style={{ width: '100%', textAlign: 'center' }}
                    />
                  </div>

                  {/* Save Button */}
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleSaveIcon(iconIndex)}
                    disabled={isSubmitting}
                  >
                    Save Icon
                  </button>

                  {/* Preview */}
                  {/* <div className="preview-section mt-3 p-2" style={{ border: '1px dashed #ccc', borderRadius: '5px' }}>
                    <h6>Preview:</h6>
                    {icon.icon && (
                      <img
                        src={icon.icon}
                        alt="Icon preview"
                        style={{ width: '30px', height: '30px', marginBottom: '5px' }}
                      />
                    )}
                    <p style={{ fontSize: '14px', margin: 0 }}>{icon.title}</p>
                  </div> */}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No icons available.</p>
          )}
        </div>
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

      {/* Preview Section */}
      {/* <div className="preview-section text-center mt-4 p-3" style={{ border: '2px dashed #ccc', borderRadius: '10px' }}>
        <h4>Full Section Preview:</h4>
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
        
        <div className="row justify-content-center mt-3">
          {icons.map((icon, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="d-flex flex-column align-items-center">
                {icon.icon && (
                  <img
                    src={icon.icon}
                    alt={`Icon ${index + 1}`}
                    style={{ width: '40px', height: '40px', marginBottom: '10px' }}
                  />
                )}
                <p style={{ fontSize: '14px' }}>{icon.title}</p>
              </div>
            </div>
          ))}
        </div>
        
        {buttons[0] && (
          <button className="btn btn-primary mt-3">
            {buttons[0].text}
          </button>
        )}
      </div> */}

      {/* Error message if any */}
      {submitError && <div className="alert alert-danger">{submitError}</div>}
    </div>
  );
};

export default HomeSec8;