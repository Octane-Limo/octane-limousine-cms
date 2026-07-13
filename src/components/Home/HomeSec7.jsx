import React, { useState } from 'react';
import { updateText, updateTestimonial, updateCarImageInTestimonials } from '../../api/updateContent';

const HomeSec7 = ({ data }) => {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // State to store the editable fields
  const [title, setTitle] = useState(data?.title || '');
  const [subtitle, setSubtitle] = useState(data?.subtitle || '');
  const [testimonials, setTestimonials] = useState(data?.testimonials || []);

  // Function to handle the Save button for updating text fields
  const handleSaveText = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Update the title and subtitle using the API
      const result = await updateText('home', 'home-sec7', title, subtitle, null);
      console.log('Text updated successfully:', result);
    } catch (error) {
      console.error('Failed to update text:', error);
      setSubmitError('Failed to update text');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle updating testimonial
  const handleSaveTestimonial = async (testimonialIndex) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const testimonial = testimonials[testimonialIndex];
      const avatarFile = testimonial?.avatarFile;
      
      const result = await updateTestimonial(
        'home', 
        'home-sec7', 
        testimonialIndex,
        testimonial.customerName,
        testimonial.profession,
        testimonial.feedback,
        testimonial.rating,
        avatarFile
      );
      console.log('Testimonial updated successfully:', result);
    } catch (error) {
      console.error('Failed to update testimonial:', error);
      setSubmitError('Failed to update testimonial');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle updating car image in testimonial
  const handleSaveCarImage = async (testimonialIndex) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const testimonial = testimonials[testimonialIndex];
      const carImageFile = testimonial?.carImages?.[0]?.file;
      
      if (carImageFile) {
        const result = await updateCarImageInTestimonials(
          'home', 
          'home-sec7', 
          carImageFile, 
          0,
          testimonialIndex
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

  // Handle testimonial field change
  const handleTestimonialChange = (e, testimonialIndex, field) => {
    const value = e.target.value;

    const updatedTestimonials = [...testimonials];
    if (!updatedTestimonials[testimonialIndex]) {
      updatedTestimonials[testimonialIndex] = {};
    }
    updatedTestimonials[testimonialIndex][field] = value;
    setTestimonials(updatedTestimonials);
  };

  // Handle avatar file change
  // const handleAvatarFileChange = (e, testimonialIndex) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const updatedTestimonials = [...testimonials];
  //   if (!updatedTestimonials[testimonialIndex]) {
  //     updatedTestimonials[testimonialIndex] = {};
  //   }
  //   updatedTestimonials[testimonialIndex].avatarFile = file;
  //   setTestimonials(updatedTestimonials);
  // };

  
  const handleAvatarFileChange = (e, testimonialIndex) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedTestimonials = [...testimonials];
    if (updatedTestimonials[testimonialIndex]?.avatarPreview) {
      URL.revokeObjectURL(updatedTestimonials[testimonialIndex].avatarPreview);
    }

    updatedTestimonials[testimonialIndex] = {
      ...updatedTestimonials[testimonialIndex],
      avatarFile: file,
      avatarPreview: URL.createObjectURL(file),
    };

    setTestimonials(updatedTestimonials);
  };

  // Handle car image file change
  const handleCarImageFileChange = (e, testimonialIndex) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    const updatedTestimonials = [...testimonials];
    
    if (!updatedTestimonials[testimonialIndex]) {
      updatedTestimonials[testimonialIndex] = {};
    }
    if (!updatedTestimonials[testimonialIndex].carImages) {
      updatedTestimonials[testimonialIndex].carImages = [];
    }
    if (!updatedTestimonials[testimonialIndex].carImages[0]) {
      updatedTestimonials[testimonialIndex].carImages[0] = {};
    }

    updatedTestimonials[testimonialIndex].carImages[0].file = file;
    updatedTestimonials[testimonialIndex].carImages[0].url = previewUrl; // ✅ Store preview

    setTestimonials(updatedTestimonials);
  };

  // Handle rating change with stars
  const handleRatingChange = (testimonialIndex, newRating) => {
    const updatedTestimonials = [...testimonials];
    if (!updatedTestimonials[testimonialIndex]) {
      updatedTestimonials[testimonialIndex] = {};
    }
    updatedTestimonials[testimonialIndex].rating = newRating;
    setTestimonials(updatedTestimonials);
  };

  return (
    <div className="home-sec7 container my-4" style={{borderBottom: '1px solid #ccc', padding: '0 0 50px 0'}}>
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

      {/* Testimonials */}
      <div className="testimonials-container">
        <h4 className="text-center mb-4">Testimonials:</h4>
        {testimonials && testimonials.length > 0 ? (
          testimonials.map((testimonial, testimonialIndex) => (
            <div key={testimonialIndex} className="testimonial-item mb-5 p-4" style={{ border: '2px solid #eee', borderRadius: '10px' }}>
              <h5>Testimonial #{testimonialIndex + 1}</h5>
              
              {/* Avatar */}
              <div className="avatar-section text-center mb-3">
                <h6>Avatar:</h6>
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatarPreview || testimonial.avatar}
                    alt={`${testimonial.customerName} avatar`}
                    style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }}
                  />
                )}
                <input
                  type="file"
                  onChange={(e) => handleAvatarFileChange(e, testimonialIndex)}
                  disabled={isSubmitting}
                  style={{ marginBottom: '10px' }}
                />
              </div>

              {/* Testimonial Details */}
              <div className="testimonial-details mb-3">
                <input
                  type="text"
                  value={testimonial.customerName || ''}
                  onChange={(e) => handleTestimonialChange(e, testimonialIndex, 'customerName')}
                  disabled={isSubmitting}
                  placeholder="Customer Name"
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="text"
                  value={testimonial.profession || ''}
                  onChange={(e) => handleTestimonialChange(e, testimonialIndex, 'profession')}
                  disabled={isSubmitting}
                  placeholder="Profession"
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                <textarea
                  value={testimonial.feedback || ''}
                  onChange={(e) => handleTestimonialChange(e, testimonialIndex, 'feedback')}
                  disabled={isSubmitting}
                  placeholder="Feedback"
                  rows="4"
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                
                {/* Rating */}
                <div className="rating-section mb-3">
                  <h6>Rating:</h6>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => !isSubmitting && handleRatingChange(testimonialIndex, star)}
                      style={{
                        cursor: isSubmitting ? 'default' : 'pointer',
                        color: star <= (testimonial.rating || 0) ? '#ffc107' : '#e4e5e9',
                        fontSize: '24px'
                      }}
                    >
                      ★
                    </span>
                  ))}
                  <span style={{ marginLeft: '10px' }}>({testimonial.rating || 0}/5)</span>
                </div>
              </div>

              {/* Background Image */}
              <div className="car-image-section text-center mb-3">
                <h6>Background Image:</h6>
                {testimonial.carImages?.[0]?.url && (
                  <img
                    src={testimonial.carImages[0].url}
                    alt={testimonial.carImages[0].alt || 'Car'}
                    style={{ maxHeight: '100px', marginBottom: '10px' }}
                  />
                )}
                <input
                  type="file"
                  onChange={(e) => handleCarImageFileChange(e, testimonialIndex)}
                  disabled={isSubmitting}
                  style={{ marginBottom: '10px' }}
                />
              </div>

              {/* Save Buttons */}
              <div className="text-center">
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleSaveTestimonial(testimonialIndex)}
                  disabled={isSubmitting}
                >
                  Save Testimonial
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleSaveCarImage(testimonialIndex)}
                  disabled={isSubmitting}
                >
                  Save Car Image
                </button>
              </div>

              {/* Preview */}
              {/* <div className="preview-section mt-3 p-3" style={{ border: '1px dashed #ccc', borderRadius: '5px' }}>
                <h6>Preview:</h6>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt="Avatar preview"
                      style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                    />
                  )}
                  <div>
                    <strong>{testimonial.customerName}</strong>
                    <br />
                    <em>{testimonial.profession}</em>
                  </div>
                </div>
                <p style={{ fontStyle: 'italic' }}>"{testimonial.feedback}"</p>
                <div>Rating: {'★'.repeat(testimonial.rating || 0)}{'☆'.repeat(5 - (testimonial.rating || 0))}</div>
                {testimonial.carImages?.[0]?.url && (
                  <img
                    src={testimonial.carImages[0].url}
                    alt="Car preview"
                    style={{ maxHeight: '60px', marginTop: '10px' }}
                  />
                )}
              </div> */}
            </div>
          ))
        ) : (
          <p>No testimonials available.</p>
        )}
      </div>

      {/* Error message if any */}
      {submitError && <div className="alert alert-danger">{submitError}</div>}
    </div>
  );
};

export default HomeSec7;