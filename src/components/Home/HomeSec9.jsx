import React, { useState } from 'react';
import { updateText, updateBgImage, updateFooter } from '../../api/updateContent';

const HomeSec9 = ({ data }) => {
  // console.log("HomeSec9 data:", data);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // State to store the editable fields
  const [description, setDescription] = useState(data?.description || '');
  const [bgImages, setBgImages] = useState(data?.bgImages || []);
  const [footer, setFooter] = useState(data?.footer && data?.footer.length > 0 ? data?.footer[0] : {});

  // Function to handle the Save button for updating description
  const handleSaveDescription = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Update the description using the API
      const result = await updateText('home', 'home-sec9', null, null, description);
      console.log('Description updated successfully:', result);
    } catch (error) {
      console.error('Failed to update description:', error);
      setSubmitError('Failed to update description');
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
        const result = await updateBgImage('home', 'home-sec9', bgImageFile, 0);
        console.log('Background image updated:', result);
      }
    } catch (error) {
      console.error('Failed to update background image:', error);
      setSubmitError('Failed to update background image');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle updating footer
  const handleSaveFooter = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await updateFooter(
        'home', 
        'home-sec9', 
        0, // footerIndex
        footer.year,
        footer.companyName,
        footer.poweredByText,
        footer.poweredByName,
        footer.poweredByLink
      );
      console.log('Footer updated successfully:', result);
    } catch (error) {
      console.error('Failed to update footer:', error);
      setSubmitError('Failed to update footer');
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

  // Handle footer field change
  const handleFooterChange = (e, field) => {
    const value = e.target.value;

    const updatedFooter = { ...footer };
    updatedFooter[field] = value;
    setFooter(updatedFooter);
  };

  return (
    <div className="home-sec9">
      {/* Description Section */}
      <div className="description-section text-center mb-4">
        <h4>Description:</h4>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
          placeholder="Description"
          rows="4"
          style={{ fontSize: '16px', textAlign: 'center', width: '100%', maxWidth: '800px' }}
        />
        <br />
        <button
          className="btn btn-primary mt-2"
          onClick={handleSaveDescription}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : (
            'Save Description'
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

      {/* Footer Section */}
      <div className="footer-section mb-4">
        <h4 className="text-center mb-4">Footer:</h4>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="footer-form p-4" style={{ border: '2px solid #eee', borderRadius: '10px' }}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Year:</label>
                  <input
                    type="text"
                    value={footer.year || ''}
                    onChange={(e) => handleFooterChange(e, 'year')}
                    disabled={isSubmitting}
                    placeholder="Year"
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Company Name:</label>
                  <input
                    type="text"
                    value={footer.companyName || ''}
                    onChange={(e) => handleFooterChange(e, 'companyName')}
                    disabled={isSubmitting}
                    placeholder="Company Name"
                    className="form-control"
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label>Powered By Text:</label>
                  <input
                    type="text"
                    value={footer.poweredByText || ''}
                    onChange={(e) => handleFooterChange(e, 'poweredByText')}
                    disabled={isSubmitting}
                    placeholder="Powered by text"
                    className="form-control"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Powered By Name:</label>
                  <input
                    type="text"
                    value={footer.poweredByName || ''}
                    onChange={(e) => handleFooterChange(e, 'poweredByName')}
                    disabled={isSubmitting}
                    placeholder="Powered by name"
                    className="form-control"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Powered By Link:</label>
                  <input
                    type="url"
                    value={footer.poweredByLink || ''}
                    onChange={(e) => handleFooterChange(e, 'poweredByLink')}
                    disabled={isSubmitting}
                    placeholder="https://example.com"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  className="btn btn-primary"
                  onClick={handleSaveFooter}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    'Save Footer'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error message if any */}
      {submitError && <div className="alert alert-danger">{submitError}</div>}
    </div>
  );
};

export default HomeSec9;