import React, { useState } from "react";
import { updateText, updateIcon } from "../../api/updateContent";

const AboutSec4 = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // State to store the editable fields
  const [title, setTitle] = useState(data.title);
  const [icons, setIcons] = useState(
    (data.icons || []).map((it) => ({ ...it, isEdited: false, previewUrl: null }))
  );

  // Function to handle the Save button for updating text fields
  const handleSaveText = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await updateText("about","about-sec4", title, null, null);
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
      for (let i = 0; i < icons.length; i++) {
        const icon = icons[i];
        const iconTitle = icon.title;
        const iconDescription = icon.description;
          const result = await updateIcon(
            "about",
            "about-sec4",
            'null',
            i,
            iconTitle,
            iconDescription
          );
          console.log("Icon updated:", result);
        }
      console.log("All icons updated successfully!");
    } catch (error) {
      console.error("Error updating icons:", error);
      setSubmitError("Failed to update icons");
    } finally {
      setIsSubmitting(false);
    }
  };


  // Handle title or description change for icons — now marks edited
  const handleIconChange = (e, index, field) => {
    const value = e.target.value;
    const updatedIcons = [...icons];
    updatedIcons[index] = {
      ...updatedIcons[index],
      [field]: value,
      isEdited: true, // mark as edited for visual indicator
    };
    setIcons(updatedIcons);
  };

  return (
    <div className="about-sec4 container my-4" style={{borderBottom: '1px solid #ccc', padding: '0 0 50px 0'}}>
      {/* Section Header */}
      <div className="section-header text-center mb-4">
        <h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            style={{ fontSize: "24px", textAlign: "center" }}
          />
        </h2>
      </div>

      <div className="text-center">
        <button
          className="btn btn-primary mt-3 mb-3"
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

      {/* Icons Section */}
      <div className="icons">
        <div className="row">
          {icons && icons.length > 0 ? (
            icons.map((icon, index) => (
              <div className="col-lg-4" key={index}>
                <div
                  className="icon-item"
                  style={{ margin: "10px", textAlign: "center", position: 'relative' }}
                >
                  {/* Edited badge */}
                  {icon.isEdited && (
                    <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">
                      Edited
                    </span>
                  )}

                  <input
                    type="text"
                    value={icon.title}
                    onChange={(e) => handleIconChange(e, index, "title")}
                    disabled={isSubmitting}
                    style={{ fontSize: "20px", textAlign: "center" }}
                  />

                  <textarea
                    value={icon.description}
                    onChange={(e) => handleIconChange(e, index, "description")}
                    disabled={isSubmitting}
                    style={{
                      width: "80%",
                      height: "100px",
                      textAlign: "center",
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No icons available.</p>
          )}
        </div>
      </div>

      {/* Error message if any */}
      {submitError && <div className="alert alert-danger">{submitError}</div>}

      {/* Save Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-2 mb-4">
        <button
          className="btn btn-primary ml-2"
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
  );
};

export default AboutSec4;