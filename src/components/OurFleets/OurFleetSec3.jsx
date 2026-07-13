import React, { useState } from 'react';
import { updateText, updateBgImage, updateCarImage, updateButton, deleteCarImage } from '../../api/updateContent';

const OurFleetSec3 = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [bgImages, setBgImages] = useState(data.bgImages);
  const [carImages, setCarImages] = useState(data.carImages);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New car form state inside modal
  const [newCar, setNewCar] = useState({
    title: '',
    subtitle: '',
    rating: '',
    file: undefined,
    url: '',
    buttons: [{ text: '', href: '' }],
  });

  // ------------------ Existing handlers ------------------

  const handleSaveText = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await updateText('our-fleets', 'our-fleets-sec3', title, null, description);
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
        const result = await updateBgImage('our-fleets', 'our-fleets-sec3', bgImageFile, 0);
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
          !data.carImages[i] || // if new car (no original data)
          carTitle !== data.carImages[i]?.title ||
          carSubtitle !== data.carImages[i]?.subtitle ||
          carRating !== data.carImages[i]?.rating;

        if (hasFileChange || hasTextChange) {
          const result = await updateCarImage(
            'our-fleets',
            'our-fleets-sec3',
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

  const handleAddNewCar = async () => {
    if (!newCar.title.trim()) {
      setSubmitError('Please provide a car title.');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Call the API to upload new car and get result
      const result = await updateCarImage(
        'our-fleets',
        'our-fleets-sec3',
        newCar.file,
        carImages.length, // new index at the end
        newCar.title,
        newCar.subtitle,
        newCar.rating
      );

      // Assume the API returns the saved car data including URL, etc
      const savedCar = {
        ...newCar,
        url: result.url || newCar.url,  // URL from server if any
        file: undefined, // clear file from local state since uploaded
        buttons: newCar.buttons || [],
      };

      // Add new car to local state
      setCarImages(prev => [...prev, savedCar]);

      setIsModalOpen(false);
      setNewCar({
        title: '',
        subtitle: '',
        rating: '',
        file: undefined,
        url: '',
        buttons: [{ text: '', href: '' }],
      });

      setSubmitError(null);
    } catch (error) {
      console.error('Failed to save new car:', error);
      setSubmitError('Failed to save new car');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCar = async (carIndex) => {
    if (isSubmitting) return;

    // Confirm deletion
    if (!window.confirm('Are you sure you want to delete this car?')) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Call the delete API
      const result = await deleteCarImage(
        'our-fleets',
        'our-fleets-sec3',
        carIndex
      );

      if (result.success) {
        // Remove the car from local state
        setCarImages(prev => prev.filter((_, index) => index !== carIndex));
        console.log('Car deleted successfully:', result);
      } else {
        throw new Error(result.message || 'Failed to delete car');
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      setSubmitError('Failed to delete car');
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
        'our-fleets',
        'our-fleets-sec3',
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

  const handleBgImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedBgImages = [...bgImages];
    if (!updatedBgImages[0]) {
      updatedBgImages[0] = {};
    }

    // Create a preview URL for the image
    const previewUrl = URL.createObjectURL(file);

    updatedBgImages[0].file = file;
    updatedBgImages[0].url = previewUrl;

    setBgImages(updatedBgImages);
  };

  const handleCarImageFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedCarImages = [...carImages];
    updatedCarImages[index] = { ...updatedCarImages[index], file };

    // Create a preview URL for the image so it updates on UI
    updatedCarImages[index].url = URL.createObjectURL(file);

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
    if (!updatedCarImages[carIndex].buttons) {
      updatedCarImages[carIndex].buttons = [];
    }
    if (!updatedCarImages[carIndex].buttons[buttonIndex]) {
      updatedCarImages[carIndex].buttons[buttonIndex] = {};
    }
    updatedCarImages[carIndex].buttons[buttonIndex][field] = value;
    setCarImages(updatedCarImages);
  };

  const openAddCarModal = () => {
    setNewCar({
      title: '',
      subtitle: '',
      rating: '',
      file: undefined,
      url: '',
      buttons: [{ text: '', href: '' }],
    });
    setIsModalOpen(true);
  };

  const closeAddCarModal = () => {
    setIsModalOpen(false);
  };

  const handleNewCarChange = (e, field) => {
    const value = e.target.value;
    setNewCar(prev => ({ ...prev, [field]: value }));
  };

  const handleNewCarFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setNewCar(prev => ({ ...prev, file, url: previewUrl }));
  };

  return (
    <div className="our-fleets-sec3 container" style={{ borderBottom: '1px solid #ccc', padding: '0 0 50px 0' }}>
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
        <h4>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
            style={{ fontSize: '20px', textAlign: 'center' }}
          />
        </h4>
        <button className="btn btn-primary" onClick={handleSaveText} disabled={isSubmitting}>
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
            <img src={bgImages[0].url} alt="Background" style={{ maxHeight: '200px' }} />
          </div>
        )}
        <input type="file" onChange={handleBgImageFileChange} disabled={isSubmitting} style={{ marginTop: '10px' }} />
        <button className="btn btn-primary ml-2" onClick={handleSaveBgImage} disabled={isSubmitting}>
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
        <div className="row">
          {carImages && carImages.length > 0 ? (
            carImages.map((car, carIndex) => (
              <div key={carIndex} className="col-lg-4">
                <div
                  className="car-item mb-4"
                  style={{ textAlign: 'center', border: '1px solid #ccc', padding: '20px', margin: '10px', position: 'relative' }}
                >
                  {/* Delete Button */}
                  <button
                    className="btn btn-danger btn-sm"
                    style={{ position: 'absolute', top: '5px', right: '5px' }}
                    onClick={() => handleDeleteCar(carIndex)}
                    disabled={isSubmitting}
                    title="Delete Car"
                  >
                    ×
                  </button>

                  <input
                    type="text"
                    value={car.title}
                    onChange={(e) => handleCarChange(e, carIndex, 'title')}
                    disabled={isSubmitting}
                    placeholder="Car Title"
                    style={{ marginBottom: '10px', textAlign: 'center' }}
                  />
                  <input
                    type="text"
                    value={car.subtitle}
                    onChange={(e) => handleCarChange(e, carIndex, 'subtitle')}
                    disabled={isSubmitting}
                    placeholder="Car Subtitle"
                    style={{ marginBottom: '10px', textAlign: 'center' }}
                  />
                  <input
                    type="text"
                    value={car.rating}
                    onChange={(e) => handleCarChange(e, carIndex, 'rating')}
                    disabled={isSubmitting}
                    placeholder="Car Rating"
                    style={{ marginBottom: '10px', textAlign: 'center' }}
                  />
                  {car.url && (
                    <img
                      src={car.url}
                      alt={car.title}
                      style={{ width: '80px', height: 'auto', marginBottom: '10px' }}
                    />
                  )}
                  <input
                    type="file"
                    onChange={(e) => handleCarImageFileChange(e, carIndex)}
                    disabled={isSubmitting}
                    style={{ marginBottom: '10px' }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No cars available.</p>
          )}
        </div>
      </div>

      {/* Add Car and Save Buttons */}
      <div className="d-flex justify-content-center mt-2 mb-4">
        <button className="btn btn-secondary me-2" onClick={openAddCarModal} disabled={isSubmitting}>
          Add Car
        </button>
        <button className="btn btn-primary ml-2" onClick={handleSaveCarImages} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : (
            'Save Car Changes'
          )}
        </button>
      </div>

      {/* ✅ Only Show Car 0, Button 0 */}
      {carImages?.[0]?.buttons?.[0] && (
        <div className="text-center my-5">
          <h5>Car Button</h5>
          <div className="card mx-auto shadow-sm" style={{ maxWidth: 420 }}>
            <div className="card-body">
              <input
                type="text"
                value={carImages[0].buttons[0].text || ''}
                onChange={(e) => handleButtonTextChange(e, 0, 0, 'text')}
                disabled={isSubmitting}
                placeholder="Button Text"
                className="form-control mb-2 text-center"
              />
              <input
                type="text"
                value={carImages[0].buttons[0].href || ''}
                onChange={(e) => handleButtonTextChange(e, 0, 0, 'href')}
                disabled={isSubmitting}
                placeholder="Button Link"
                className="form-control mb-3 text-center"
              />
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

      {/* Error message */}
      {submitError && <div className="alert alert-danger">{submitError}</div>}

      {/* Add Car Modal */}
      {isModalOpen && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Car</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeAddCarModal} />
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Car Title"
                  value={newCar.title}
                  onChange={(e) => handleNewCarChange(e, 'title')}
                  disabled={isSubmitting}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Car Subtitle"
                  value={newCar.subtitle}
                  onChange={(e) => handleNewCarChange(e, 'subtitle')}
                  disabled={isSubmitting}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Car Rating"
                  value={newCar.rating}
                  onChange={(e) => handleNewCarChange(e, 'rating')}
                  disabled={isSubmitting}
                />
                {newCar.url && (
                  <img
                    src={newCar.url}
                    alt="New Car Preview"
                    style={{ width: '100%', maxHeight: 200, objectFit: 'contain', marginBottom: 10 }}
                  />
                )}
                <input
                  type="file"
                  className="form-control mb-3"
                  onChange={handleNewCarFileChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeAddCarModal} disabled={isSubmitting}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary ml-2"
                  onClick={handleAddNewCar}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    'Save Car'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurFleetSec3;