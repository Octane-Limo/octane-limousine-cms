import React, { useState, useEffect } from 'react';
import { updateTestimonial } from '../../api/updateContent';

const TestimonialSec3 = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [testimonials, setTestimonials] = useState(data.testimonials || []);

  // Cleanup object URLs on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      testimonials.forEach(t => {
        if (t.avatarPreview) {
          URL.revokeObjectURL(t.avatarPreview);
        }
      });
    };
  }, [testimonials]);

  // Handle updating testimonial
  const handleSaveTestimonial = async (testimonialIndex) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const testimonial = testimonials[testimonialIndex];
      const avatarFile = testimonial?.avatarFile;

      const result = await updateTestimonial(
        'testimonials',
        'testimonials-sec3',
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

  // Handle testimonial field changes
  const handleTestimonialChange = (e, testimonialIndex, field) => {
    const value = e.target.value;

    const updatedTestimonials = [...testimonials];
    if (!updatedTestimonials[testimonialIndex]) {
      updatedTestimonials[testimonialIndex] = {};
    }
    updatedTestimonials[testimonialIndex][field] = value;
    setTestimonials(updatedTestimonials);
  };

  // Handle avatar file change with preview
  const handleAvatarFileChange = (e, testimonialIndex) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedTestimonials = [...testimonials];

    // Revoke previous preview URL if any
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

  // Handle rating star clicks
  const handleRatingChange = (testimonialIndex, newRating) => {
    const updatedTestimonials = [...testimonials];
    if (!updatedTestimonials[testimonialIndex]) {
      updatedTestimonials[testimonialIndex] = {};
    }
    updatedTestimonials[testimonialIndex].rating = newRating;
    setTestimonials(updatedTestimonials);
  };

  return (
    <div className="testimonials-sec3 container my-4" style={{ borderBottom: '1px solid #ccc', padding: '0 0 50px 0' }}>
      {/* Testimonials */}
      <div className="testimonials-container">
        <h4 className="text-center mb-4">Testimonials:</h4>
        <div className="row">
        {testimonials && testimonials.length > 0 ? (
          testimonials.map((testimonial, testimonialIndex) => (
            <div className="col-lg-4">
            <div
              key={testimonialIndex}
              className="testimonial-item mb-5 p-4"
              style={{ border: '2px solid #eee', borderRadius: '10px', backgroundColor: '#fafafa' }}
            >
              <h5>Testimonial #{testimonialIndex + 1}</h5>

              {/* Avatar */}
              <div className="avatar-section text-center mb-3">
                <h6>Avatar:</h6>
                {(testimonial.avatarPreview || testimonial.avatar) ? (
                  <img
                    src={testimonial.avatarPreview || testimonial.avatar}
                    alt={`${testimonial.customerName || 'Customer'} avatar`}
                    style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px', border: '1px solid #ddd' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: '#ddd',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: '#666',
                      fontSize: '14px',
                      fontStyle: 'italic',
                      marginBottom: '10px',
                      border: '1px solid #ccc',
                    }}
                  >
                    No avatar
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
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
                  style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input
                  type="text"
                  value={testimonial.profession || ''}
                  onChange={(e) => handleTestimonialChange(e, testimonialIndex, 'profession')}
                  disabled={isSubmitting}
                  placeholder="Profession"
                  style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <textarea
                  value={testimonial.feedback || ''}
                  onChange={(e) => handleTestimonialChange(e, testimonialIndex, 'feedback')}
                  disabled={isSubmitting}
                  placeholder="Feedback"
                  rows="4"
                  style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
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
                        fontSize: '24px',
                        userSelect: 'none',
                      }}
                      aria-label={`${star} star`}
                    >
                      ★
                    </span>
                  ))}
                  <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>({testimonial.rating || 0}/5)</span>
                </div>
              </div>

              {/* Save Button */}
              <div className="text-center">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleSaveTestimonial(testimonialIndex)}
                  disabled={isSubmitting}
                  style={{ minWidth: '150px' }}
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
                    'Save Testimonial'
                  )}
                </button>
              </div>
            </div>
          </div>
          ))
        ) : (
          <p className="text-center">No testimonials available.</p>
        )}
        </div>
      </div>

      {/* Error message if any */}
      {submitError && <div className="alert alert-danger text-center">{submitError}</div>}
    </div>
  );
};

export default TestimonialSec3;