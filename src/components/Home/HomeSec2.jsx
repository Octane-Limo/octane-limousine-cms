import React, { useState } from "react";
import { updateLogo } from "../../api/updateContent"; // Import the updateLogo function

const HomeSec2 = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [logoChanges, setLogoChanges] = useState([]); // Track changes to logos
  const [previews, setPreviews] = useState([]); // Store previews for each logo

  // Function to handle the logo update
  const handleLogoUpdate = async (file, logoIndex) => {
    try {
      const result = await updateLogo("home", "home-sec2", file, logoIndex);
      console.log("Logo updated successfully:", result);
    } catch (error) {
      console.error("Failed to update logo:", error);
    }
  };

  // Function to handle file change and store the updated file for the logo
  const handleLogoFileChange = (e, logoIndex) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a file reader to generate the preview
    const reader = new FileReader();
    reader.onloadend = () => {
      // Set the preview of the selected logo
      setPreviews((prev) => {
        const updatedPreviews = [...prev];
        updatedPreviews[logoIndex] = reader.result;
        return updatedPreviews;
      });
    };
    reader.readAsDataURL(file); // Read the file as data URL

    // Store the file for future API submission
    setLogoChanges((prev) => {
      const updatedChanges = [...prev];
      updatedChanges[logoIndex] = file; // Update the logo change at the correct index
      return updatedChanges;
    });
  };

  // Function to handle the Save button
  const handleSave = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Loop through all logos and call the updateLogo API for logos that have changed
      for (let i = 0; i < logoChanges.length; i++) {
        const file = logoChanges[i];
        if (file) {
          // Only update logos that have changed
          const result = await handleLogoUpdate(file, i); // Update logo at index i
          console.log("Logo updated:", result);
        }
      }

      // Notify parent component about successful save
      console.log("All logos updated successfully!");
      // if (onSave) {
      //   onSave(data);
      // }
    } catch (error) {
      console.error("Error updating logos:", error);
      setSubmitError("Failed to update logos");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // <div className="home-sec2 container my-4" style={{borderBottom: '1px solid #ccc', padding: '0 0 50px 0'}}>
    //   <div className="logos p-4">
    //     {data.logos && data.logos.length > 0 ? (
    //       <div className="logo-list" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
    //         {data.logos.map((logo, index) => (
    //           <div key={index} style={{ backgroundColor: '#000', textAlign: 'center', margin: '10px', padding: "20px" }} className="logo-item">
    //             {/* Only show the selected logo preview, not the previous one */}
    //             {previews[index] ? (
    //               <img
    //                 src={previews[index]}
    //                 alt={`Preview ${index + 1}`}
    //                 className="logo-image"
    //                 style={{ width: '100px', height: 'auto' }}
    //               />
    //             ) : (
    //               <img
    //                 src={logo.icon} // Original logo
    //                 alt={`Logo ${index + 1}`}
    //                 className="logo-image"
    //                 style={{ width: '100px', height: 'auto' }}
    //               />
    //             )}
    //             {/* File input for logo update */}
    //             <input
    //               type="file"
    //               onChange={(e) => handleLogoFileChange(e, index)}
    //               disabled={isSubmitting}
    //               style={{ marginTop: '10px' }}
    //               className="form-control"
    //             />
    //           </div>
    //         ))}
    //       </div>
    //     ) : (
    //       <p>No logos available.</p>
    //     )}
    //   </div>

    //   {/* Show error message if any */}
    //   {submitError && <div className="alert alert-danger">{submitError}</div>}

    //   {/* Save Button */}
    //   <div className="d-flex justify-content-center mt-2 mb-4">
    //     <button
    //       className="btn btn-primary"
    //       onClick={handleSave}
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
  <div className="home-sec2 container my-4 cms-section" style={{borderBottom: '1px solid #ccc', padding: '0 0 50px 0'}}>
  <div className="logos p-4">
    {data?.logos && data?.logos.length > 0 ? (
      <div className="row g-4 justify-content-center">
        {data?.logos.map((logo, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3">
            <div className="logo-item card shadow-sm text-center p-3 h-100">
              <div className="ratio ratio-1x1 bg-light rounded d-flex align-items-center justify-content-center mb-3">
                {previews[index] ? (
                  <img
                    src={previews[index]}
                    alt={`Preview ${index + 1}`}
                    className="logo-image object-contain"
                  />
                ) : (
                  <img
                    src={logo?.icon}
                    alt={`Logo ${index + 1}`}
                    className="logo-image object-contain"
                  />
                )}
              </div>
              {/* File input for logo update */}
              <input
                type="file"
                onChange={(e) => handleLogoFileChange(e, index)}
                disabled={isSubmitting}
                className="form-control form-control-sm"
              />
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-muted text-center">No logos available.</p>
    )}
  </div>

  {/* Show error message if any */}
  {submitError && (
    <div className="alert alert-danger d-flex align-items-center justify-content-center mt-3">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      {submitError}
    </div>
  )}

  {/* Save Button */}
  <div className="d-flex justify-content-center mt-4 mb-4">
    <button
      className="btn btn-primary px-4"
      onClick={handleSave}
      disabled={isSubmitting}
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
        'Save Changes'
      )}
    </button>
  </div>
</div>

  );
};

export default HomeSec2;