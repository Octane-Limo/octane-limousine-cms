import React, { useState, useEffect } from 'react';
import { updateBgImage,updateCarImageInBG } from '../../api/updateContent'; // Import the API function for bgImages

const HomeSec1Form = ({ data }) => {
  let sec1Data = data.sections[0]; 
  // console.log("Initial Data:", sec1Data);
  
  const [formData, setFormData] = useState({
    bgImages: []
  });
  const [activeBgImageIndex, setActiveBgImageIndex] = useState(0);
  const [activeCarIndex, setActiveCarIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Initialize form with data when component mounts or sec1Data changes
  useEffect(() => {
    if (sec1Data && sec1Data.bgImages) {
      setFormData({
        bgImages: sec1Data.bgImages.map(bgImage => ({
          ...bgImage,
          carImages: bgImage.carImages ? bgImage.carImages.map(car => ({
            ...car,
            buttons: car.buttons ? [...car.buttons] : []
          })) : []
        }))
      });
    }
  }, [sec1Data]);

  // Handle background image changes
  const handleBgImageChange = (index, field, value) => {
    const updatedBgImages = [...formData.bgImages];
    updatedBgImages[index][field] = value;
    setFormData({ ...formData, bgImages: updatedBgImages });
  };

  // Handle background image file selection
  const handleBgImageFileChange = (index, file) => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      handleBgImageChange(index, 'url', e.target.result);
      handleBgImageChange(index, 'file', file);  // Track the file for upload
    };
    reader.readAsDataURL(file);
  };

  // Handle car image changes
  const handleCarImageChange = (bgIndex, carIndex, field, value) => {
    const updatedBgImages = [...formData.bgImages];
    updatedBgImages[bgIndex].carImages[carIndex][field] = value;
    setFormData({ ...formData, bgImages: updatedBgImages });
  };

  // Handle car image file selection
  const handleCarImageFileChange = (bgIndex, carIndex, file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      handleCarImageChange(bgIndex, carIndex, 'url', e.target.result);
      handleCarImageChange(bgIndex, carIndex, 'file', file);  // Track the file for upload
    };
    reader.readAsDataURL(file);
  };

  // Add a new background image section
  const addBgImage = () => {
    const newBgImage = {
      url: '',
      alt: '',
      title: '',
      carImages: []
    };
    setFormData({
      ...formData,
      bgImages: [...formData.bgImages, newBgImage]
    });
    setActiveBgImageIndex(formData.bgImages.length);
  };

  // // Remove a background image section
  // const removeBgImage = (index) => {
  //   const updatedBgImages = [...formData.bgImages];
  //   updatedBgImages.splice(index, 1);
  //   setFormData({ ...formData, bgImages: updatedBgImages });
  //   if (activeBgImageIndex >= index) {
  //     setActiveBgImageIndex(Math.max(0, activeBgImageIndex - 1));
  //   }
  // };

  // Add a new car image to a specific background image
  const addCarImage = (bgIndex) => {
    const updatedBgImages = [...formData.bgImages];
    const newCarImage = {
      url: '',
      alt: '',
      title: '',
      subtitle: '',
      description: '',
      buttons: [{ label: 'Learn More', url: '#' }],
      file: null // Track the file separately
    };
    updatedBgImages[bgIndex].carImages.push(newCarImage);
    setFormData({ ...formData, bgImages: updatedBgImages });
    setActiveCarIndex(updatedBgImages[bgIndex].carImages.length - 1);
  };

  // Remove a car image from a specific background image
  // const removeCarImage = (bgIndex, carIndex) => {
  //   const updatedBgImages = [...formData.bgImages];
  //   updatedBgImages[bgIndex].carImages.splice(carIndex, 1);
  //   setFormData({ ...formData, bgImages: updatedBgImages });
  //   setActiveCarIndex(null);
  // };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Submit background image updates
      for (let bgIndex = 0; bgIndex < formData.bgImages.length; bgIndex++) {
        const bgImage = formData.bgImages[bgIndex];
        const initialBgImage = sec1Data.bgImages[bgIndex];

        // If background image file has changed, call the updateBgImage API
        if (bgImage.file && bgImage.file !== initialBgImage.file) {
          const bgImageResponse = await updateBgImage('home', 'home-sec1', bgImage.file, bgIndex);
          console.log('Background image updated:', bgImageResponse);
        }

        // Submit car image updates
        for (let carIndex = 0; carIndex < bgImage.carImages.length; carIndex++) {
          const car = bgImage.carImages[carIndex];
          // const initialCar = initialBgImage.carImages[carIndex];

          // If car image file has changed, call the updateCarImage API
          // if (car.file && car.file !== initialCar.file) {
            const carImageResponse = await updateCarImageInBG(
              'home', 
              'home-sec1',
              car.file, 
              'bgImages',  // location is bgImages
              bgIndex, 
              carIndex, 
              car.title, 
              car.subtitle,
              car.description
            );
            console.log('Car image updated:', carImageResponse);
        // }
      }

      // Notify parent component about successful save
      // if (onSave) {
      //   onSave(formData);
      // }

      console.log('Content updated successfully');
    } 
    } catch (error) {
      console.error('Error updating content:', error);
      setSubmitError(error.message || 'Failed to update content');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData.bgImages.length) {
    return (
      <div className="container my-4">
        <div className="alert alert-info">No section data available</div>
        <button className="btn btn-primary me-2" onClick={addBgImage}>
          Add Background Image Section
        </button>
        {/* <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button> */}
      </div>
    );
  }

  return (
    // <div className="container my-4" style={{borderBottom: '1px solid #ccc', padding: '0 0 50px 0'}}>
    //   <h2>Edit Home Section 1 Content</h2>
      
    //   {/* Show error message if any */}
    //   {submitError && (
    //     <div className="alert alert-danger" role="alert">
    //       {submitError}
    //     </div>
    //   )}

    //   {/* Navigation between background images */}
    //   <div className="d-flex mb-3 overflow-auto">
    //     {formData.bgImages.map((bgImage, index) => (
    //       <button
    //         key={index}
    //         type="button"
    //         className={`btn ${activeBgImageIndex === index ? 'btn-primary' : 'btn-outline-primary'} me-2`}
    //         onClick={() => setActiveBgImageIndex(index)}
    //       >
    //         Background {index + 1}
    //       </button>
    //     ))}
    //     <button
    //       type="button"
    //       className="btn btn-success me-2"
    //       onClick={addBgImage}
    //     >
    //       <i className="bi bi-plus"></i> Add BG
    //     </button>
    //   </div>

    //   {formData.bgImages.map((bgImage, bgIndex) => (
    //     <div key={bgIndex} className={activeBgImageIndex === bgIndex ? '' : 'd-none'}>
    //       <div className="card mb-4">
    //         <div className="card-header d-flex justify-content-between align-items-center">
    //           <h5>Background Image {bgIndex + 1}</h5>
    //         </div>
    //         <div className="card-body">
    //           {/* Image Preview */}
    //           {bgImage.url && (
    //             <div className="mb-3">
    //               <label className="form-label">Preview</label>
    //               <div>
    //                 <img 
    //                   src={bgImage.url} 
    //                   alt="Preview" 
    //                   className="img-thumbnail" 
    //                   style={{ maxHeight: '200px' }}
    //                 />
    //               </div>
    //             </div>
    //           )}
              
    //           <div className="mb-3">
    //             <label className="form-label">Upload Image</label>
    //             <input
    //               type="file"
    //               className="form-control"
    //               accept="image/*"
    //               onChange={(e) => handleBgImageFileChange(bgIndex, e.target.files[0])}
    //             />
    //           </div>

    //           {/* Car Images Section */}
    //           <h6 className="mt-4 mb-3">Featured Vehicles</h6>
              
    //           {/* Navigation between car images */}
    //           <div className="d-flex mb-3 overflow-auto">
    //             {bgImage.carImages && bgImage.carImages.map((car, index) => (
    //               <button
    //                 key={index}
    //                 type="button"
    //                 className={`btn ${activeCarIndex === index ? 'btn-info' : 'btn-outline-info'} me-2`}
    //                 onClick={() => setActiveCarIndex(index)}
    //               >
    //                 Car {index + 1}
    //               </button>
    //             ))}
    //             <button
    //               type="button"
    //               className="btn btn-success"
    //               onClick={() => addCarImage(bgIndex)}
    //             >
    //               <i className="bi bi-plus"></i> Add Car
    //             </button>
    //           </div>
              
    //           {/* Car Images Forms */}
    //           {bgImage.carImages && bgImage.carImages.map((car, carIndex) => (
    //             <div key={carIndex} className={activeCarIndex === carIndex ? 'card mb-3' : 'd-none'}>
    //               <div className="card-header d-flex justify-content-between align-items-center">
    //                 <h6>Car {carIndex + 1}</h6>
    //                 {/* <button
    //                   type="button"
    //                   className="btn btn-sm btn-danger"
    //                   onClick={() => removeCarImage(bgIndex, carIndex)}
    //                 >
    //                   Remove This Car
    //                 </button> */}
    //               </div>
    //               <div className="card-body">
    //                 {/* Car Image Preview */}
    //                 {car.url && (
    //                   <div className="mb-3">
    //                     <label className="form-label">Preview</label>
    //                     <div>
    //                       <img 
    //                         src={car.url} 
    //                         alt="Preview" 
    //                         className="img-thumbnail" 
    //                         style={{ maxHeight: '200px' }}
    //                       />
    //                     </div>
    //                   </div>
    //                 )}
                    
    //                 <div className="mb-3">
    //                   <label className="form-label">Upload Car Image</label>
    //                   <input
    //                     type="file"
    //                     className="form-control"
    //                     accept="image/*"
    //                     onChange={(e) => handleCarImageFileChange(bgIndex, carIndex, e.target.files[0])}
    //                   />
    //                 </div>
                    
    //                 <div className="mb-3">
    //                   <label className="form-label">Car Title</label>
    //                   <input
    //                     type="text"
    //                     className="form-control"
    //                     value={car.title || ''}
    //                     onChange={(e) => handleCarImageChange(bgIndex, carIndex, 'title', e.target.value)}
    //                   />
    //                 </div>
                    
    //                 <div className="mb-3">
    //                   <label className="form-label">Subtitle</label>
    //                   <input
    //                     type="text"
    //                     className="form-control"
    //                     value={car.subtitle || ''}
    //                     onChange={(e) => handleCarImageChange(bgIndex, carIndex, 'subtitle', e.target.value)}
    //                   />
    //                 </div>
    //                 <div className="mb-3">
    //                   <label className="form-label">Description</label>
    //                   <input
    //                     type="text"
    //                     className="form-control"
    //                     value={car.description || ''}
    //                     onChange={(e) => handleCarImageChange(bgIndex, carIndex, 'description', e.target.value)}
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   ))}
      
    //   {/* Form Actions */}
    //   <div className="d-flex justify-content-between mt-4">
    //     {/* <button className="btn btn-secondary" onClick={onCancel} disabled={isSubmitting}>
    //       Cancel
    //     </button> */}
    //     <button 
    //       className="btn btn-primary" 
    //       onClick={handleSubmit}
    //       disabled={isSubmitting}
    //     >
    //       {isSubmitting ? (
    //         <>
    //           <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
    //           Saving...
    //         </>
    //       ) : (
    //         'Save Changes'
    //       )}
    //     </button>
    //   </div>
    // </div>
    <div className="container my-4 cms-section" style={{borderBottom: '1px solid #ccc', padding: '0 0 50px 0'}}>
  <h2 className="mb-4">Edit Home Section 1 Content</h2>
  
  {/* Show error message if any */}
  {submitError && (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      {submitError}
    </div>
  )}

  {/* Navigation between background images */}
  <div className="d-flex mb-3 overflow-auto gap-2 nav-scroll">
    {formData.bgImages.map((bgImage, index) => (
      <button
        key={index}
        type="button"
        className={`btn ${activeBgImageIndex === index ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => setActiveBgImageIndex(index)}
      >
        Background {index + 1}
      </button>
    ))}
    <button
      type="button"
      className="btn btn-success"
      onClick={addBgImage}
    >
      <i className="bi bi-plus-lg me-1"></i> Add BG
    </button>
  </div>

  {formData.bgImages.map((bgImage, bgIndex) => (
    <div key={bgIndex} className={activeBgImageIndex === bgIndex ? '' : 'd-none'}>
      <div className="card shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Background Image {bgIndex + 1}</h5>
        </div>
        <div className="card-body">
          {/* BG Dropzone */}
          <div
            className="dropzone p-3 rounded border d-flex align-items-start gap-3 mb-3"
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('drop-over'); }}
            onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('drop-over'); }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove('drop-over');
              const file = e.dataTransfer?.files?.[0];
              if (file) handleBgImageFileChange(bgIndex, file);
            }}
          >
            <div className="thumb-wrap ratio ratio-4x3 rounded overflow-hidden border bg-light flex-shrink-0" style={{width: 220}}>
              {bgImage.url ? (
                <img src={bgImage.url} alt="Preview" className="object-cover" />
              ) : (
                <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                  <i className="bi bi-image fs-3"></i>
                </div>
              )}
            </div>

            <div className="flex-grow-1">
              <label className="form-label">Upload Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => handleBgImageFileChange(bgIndex, e.target.files[0])}
              />
              <div className="form-text">Drag & drop an image here or click to browse.</div>
            </div>
          </div>

          {/* Car Images Section */}
          <h6 className="mt-4 mb-3">Featured Vehicles</h6>
          
          {/* Navigation between car images */}
          <div className="d-flex mb-3 overflow-auto gap-2 nav-scroll">
            {bgImage.carImages && bgImage.carImages.map((car, index) => (
              <button
                key={index}
                type="button"
                className={`btn btn-sm ${activeCarIndex === index ? 'btn-info' : 'btn-outline-info'}`}
                onClick={() => setActiveCarIndex(index)}
              >
                Car {index + 1}
              </button>
            ))}
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={() => addCarImage(bgIndex)}
            >
              <i className="bi bi-plus-lg me-1"></i> Add Car
            </button>
          </div>
          
          {/* Car Images Forms */}
          {bgImage.carImages && bgImage.carImages.map((car, carIndex) => (
            <div key={carIndex} className={activeCarIndex === carIndex ? 'card mb-3 border-info-subtle shadow-sm' : 'd-none'}>
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Car {carIndex + 1}</h6>
              </div>
              <div className="card-body">
                {/* Car Dropzone */}
                <div
                  className="dropzone p-3 rounded border d-flex align-items-start gap-3 mb-3"
                  onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('drop-over'); }}
                  onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('drop-over'); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove('drop-over');
                    const file = e.dataTransfer?.files?.[0];
                    if (file) handleCarImageFileChange(bgIndex, carIndex, file);
                  }}
                >
                  <div className="thumb-wrap ratio ratio-4x3 rounded overflow-hidden border bg-light flex-shrink-0" style={{width: 220}}>
                    {car.url ? (
                      <img src={car.url} alt="Preview" className="object-cover" />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                        <i className="bi bi-car-front fs-3"></i>
                      </div>
                    )}
                  </div>

                  <div className="flex-grow-1">
                    <label className="form-label">Upload Car Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => handleCarImageFileChange(bgIndex, carIndex, e.target.files[0])}
                    />
                    <div className="form-text">Drag & drop an image here or click to browse.</div>
                  </div>
                </div>
                
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Car Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={car.title || ''}
                      onChange={(e) => handleCarImageChange(bgIndex, carIndex, 'title', e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Subtitle</label>
                    <input
                      type="text"
                      className="form-control"
                      value={car.subtitle || ''}
                      onChange={(e) => handleCarImageChange(bgIndex, carIndex, 'subtitle', e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      value={car.description || ''}
                      onChange={(e) => handleCarImageChange(bgIndex, carIndex, 'description', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ))}

  {/* Form Actions */}
  <div className="d-flex justify-content-end mt-4">
    <button 
      className="btn btn-primary" 
      onClick={handleSubmit}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Saving...
        </>
      ) : (
        'Save Changes'
      )}
    </button>
  </div>
</div>

  );
};

export default HomeSec1Form;