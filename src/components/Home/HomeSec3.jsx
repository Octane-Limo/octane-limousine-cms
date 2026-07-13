import React, { useState } from "react";
import { updateText, updateIcon } from "../../api/updateContent";
const HomeSec3 = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // State to store the editable fields
  const [title, setTitle] = useState(data?.title);
  const [subtitle, setSubtitle] = useState(data?.subtitle);
  const [description, setDescription] = useState(data?.description);
  const [icons, setIcons] = useState(data?.icons);

  // Function to handle the Save button for updating text fields
  const handleSaveText = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Update the title, subtitle, and description using the API
      const result = await updateText(
        "home",
        "home-sec3",
        title,
        subtitle,
        description
      );
      console.log("Text updated successfully:", result);
    } catch (error) {
      console.error("Failed to update text:", error);
      setSubmitError("Failed to update text");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle the Save button for updating icons
  const handleSaveIcons = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Loop through all icons and update if a file or title has been changed
      for (let i = 0; i < icons.length; i++) {
        const icon = icons[i];
        const iconFile = icon.file;
        const iconTitle = icon.title;

        if (iconFile || iconTitle !== data.icons[i].title) {
          // Only update if there are changes
          const result = await updateIcon(
            "home",
            "home-sec3",
            iconFile,
            i,
            iconTitle
          );
          console.log("Icon updated:", result);
        }
      }

      console.log("All icons updated successfully!");
    } catch (error) {
      console.error("Error updating icons:", error);
      setSubmitError("Failed to update icons");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle file change for icons
  const handleIconFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    const updatedIcons = [...icons];
    updatedIcons[index] = {
      ...updatedIcons[index],
      file,
      icon: previewUrl,
    };

    setIcons(updatedIcons);
  };

  // Handle icon title change
  const handleIconTitleChange = (e, index) => {
    const title = e.target.value;

    // Update the icon's title
    const updatedIcons = [...icons];
    updatedIcons[index] = { ...updatedIcons[index], title };
    setIcons(updatedIcons);
  };

  return (
    // <div className="home-sec3 container my-4" style={{borderBottom: '1px solid #ccc', padding: '40px 0 50px 40px'}}>
    //   <div className="section-header text-center mb-4">
    //     <h2>
    //       <input
    //         type="text"
    //         value={title}
    //         onChange={(e) => setTitle(e.target.value)}
    //         disabled={isSubmitting}
    //         style={{ fontSize: '24px', textAlign: 'center' }}
    //       />
    //     </h2>
    //     <h4>
    //       <input
    //         type="text"
    //         value={subtitle}
    //         onChange={(e) => setSubtitle(e.target.value)}
    //         disabled={isSubmitting}
    //         style={{ fontSize: '20px', textAlign: 'center' }}
    //       />
    //     </h4>
    //   </div>

    //   {/* Description */}
    //   <div className="description text-center mb-5">
    //     <textarea
    //       value={description}
    //       onChange={(e) => setDescription(e.target.value)}
    //       disabled={isSubmitting}
    //       style={{ width: '80%', height: '100px', textAlign: 'center' }}
    //     />
    //   </div>
    //     <div className='text-center mb-4'>
    //         <button
    //       className="btn btn-primary"
    //       onClick={handleSaveText}
    //       disabled={isSubmitting}
    //     >
    //       {isSubmitting ? (
    //         <>
    //           <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
    //           Saving...
    //         </>
    //       ) : (
    //         'Save Text Changes'
    //       )}
    //     </button>
    //     </div>
    //   {/* Icons Section */}
    //   <div className="icons" style={{ display: 'flex', justifyContent: 'center' }}>
    //     {icons && icons.length > 0 ? (
    //       icons.map((icon, index) => (
    //         <div key={index} className="icon-item" style={{ margin: '10px', textAlign: 'center' }}>
    //           {/* Editable Title for Icons */}
    //           <img
    //             src={icon.icon}
    //             alt={icon.title}
    //             style={{ width: '80px', height: "80px",objectFit: "contain" }}
    //           />

    //           <input
    //             type="text"
    //             value={icon.title}
    //             onChange={(e) => handleIconTitleChange(e, index)}
    //             disabled={isSubmitting}
    //             style={{ marginBottom: '10px', textAlign: 'center' }}
    //           />
    //           <input
    //             type="file"
    //             onChange={(e) => handleIconFileChange(e, index)}
    //             disabled={isSubmitting}
    //             style={{ marginBottom: '10px' }}
    //             className="form-control"
    //           />
    //           {/* <p>{icon.title}</p> */}
    //         </div>
    //       ))
    //     ) : (
    //       <p>No icons available.</p>
    //     )}
    //   </div>

    //   {/* Error message if any */}
    //   {submitError && <div className="alert alert-danger">{submitError}</div>}

    //   {/* Save Buttons */}
    //   <div className="d-flex justify-content-center gap-3 mt-2 mb-4">
    //     <button
    //       className="btn btn-primary ml-2"
    //       onClick={handleSaveIcons}
    //       disabled={isSubmitting}
    //     >
    //       {isSubmitting ? (
    //         <>
    //           <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
    //           Saving...
    //         </>
    //       ) : (
    //         'Save Icon Changes'
    //       )}
    //     </button>
    //   </div>
    // </div>
    <div
  className="home-sec3 container my-4 cms-section"
  style={{ borderBottom: "1px solid #ccc", padding: "40px 0 50px 40px" }}
>
  {/* Section Header */}
  <div className="row justify-content-center text-center mb-4">
    <div className="col-12 col-lg-8">
      <h2 className="mb-3">
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          className="form-control form-control-lg text-center mt-3"
          placeholder="Section Title"
        />
      </h2>
      <h4>
        Subtitle
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          disabled={isSubmitting}
          className="form-control text-center mt-3"
          placeholder="Section Subtitle"
        />
      </h4>
    </div>
  </div>

  {/* Description */}
  <div className="row justify-content-center text-center mb-4">
    <div className="col-12 col-lg-10">
      <h4>Description</h4>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isSubmitting}
        className="form-control text-center mt-3"
        rows="4"
        placeholder="Write a short description..."
      />
      <div className="mt-3">
        <button
          className="btn btn-primary px-4"
          onClick={handleSaveText}
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
            "Save Text Changes"
          )}
        </button>
      </div>
    </div>
  </div>

  {/* Icons Section */}
  <div className="row g-4 justify-content-center">
    {icons && icons.length > 0 ? (
      icons.map((icon, index) => (
        <div key={index} className="col-6 col-md-4 col-lg-3">
          <div className="icon-item card shadow-sm h-100 text-center p-3">
            <div className="ratio ratio-1x1 bg-light rounded d-flex align-items-center justify-content-center mb-3 border">
              <img
                src={icon.icon}
                alt={icon.title}
                className="icon-image object-contain"
              />
            </div>
            <input
              type="text"
              value={icon.title}
              onChange={(e) => handleIconTitleChange(e, index)}
              disabled={isSubmitting}
              className="form-control form-control-sm text-center mb-2"
              placeholder="Icon Title"
            />
            <input
              type="file"
              onChange={(e) => handleIconFileChange(e, index)}
              disabled={isSubmitting}
              className="form-control form-control-sm"
            />
          </div>
        </div>
      ))
    ) : (
      <div className="col-12 text-center">
        <p className="text-muted">No icons available.</p>
      </div>
    )}
  </div>

  {/* Error Message */}
  {submitError && (
    <div className="row mt-4">
      <div className="col-12">
        <div className="alert alert-danger d-flex align-items-center justify-content-center">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {submitError}
        </div>
      </div>
    </div>
  )}

  {/* Save Buttons */}
  <div className="row mt-4 mb-4">
    <div className="col-12 text-center">
      <button
        className="btn btn-primary px-4"
        onClick={handleSaveIcons}
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
          "Save Icon Changes"
        )}
      </button>
    </div>
  </div>
</div>

  );
};

export default HomeSec3;