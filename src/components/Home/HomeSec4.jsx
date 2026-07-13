// import React, { useState } from "react";
// import { updateText, updateIcon, updateBgImage } from "../../api/updateContent";

// const HomeSec4 = ({ data }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState(null);

//   // State to store the editable fields
//   const [title, setTitle] = useState(data.title);
//   const [description, setDescription] = useState(data.description);
//   const [bgImages, setBgImages] = useState(data.bgImages);
//   const [icons, setIcons] = useState(data.icons);

//   // Function to handle the Save button for updating text fields
//   const handleSaveText = async () => {
//     if (isSubmitting) return;

//     setIsSubmitting(true);
//     setSubmitError(null);

//     try {
//       // Update the title and description using the API
//       const result = await updateText("home-sec4", title, null, description);
//       console.log("Text updated successfully:", result);
//     } catch (error) {
//       console.error("Failed to update text:", error);
//       setSubmitError("Failed to update text");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Function to handle the Save button for updating background images
//   const handleSaveBgImage = async () => {
//     if (isSubmitting) return;

//     setIsSubmitting(true);
//     setSubmitError(null);

//     try {
//       const bgImageFile = bgImages[0]?.file;
//       if (bgImageFile) {
//         const result = await updateBgImage("home-sec4", bgImageFile, 0);
//         console.log("Background image updated:", result);
//       }
//     } catch (error) {
//       console.error("Failed to update background image:", error);
//       setSubmitError("Failed to update background image");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Function to handle the Save button for updating icons
//   const handleSaveIcons = async () => {
//     if (isSubmitting) return;

//     setIsSubmitting(true);
//     setSubmitError(null);

//     try {
//       // Loop through all icons and update if a file or title has been changed
//       for (let i = 0; i < icons.length; i++) {
//         const icon = icons[i];
//         const iconFile = icon.file;
//         const iconTitle = icon.title;
//         const iconDescription = icon.description;

//         if (
//           iconFile ||
//           iconTitle !== data.icons[i].title ||
//           iconDescription !== data.icons[i].description
//         ) {
//           // Only update if there are changes
//           const result = await updateIcon(
//             "home",
//             "home-sec4",
//             iconFile,
//             i,
//             iconTitle,
//             iconDescription
//           );
//           console.log("Icon updated:", result);
//         }
//       }

//       console.log("All icons updated successfully!");
//     } catch (error) {
//       console.error("Error updating icons:", error);
//       setSubmitError("Failed to update icons");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Handle file change for background image
//   const handleBgImageFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const updatedBgImages = [...bgImages];
//     updatedBgImages[0] = { ...updatedBgImages[0], file }; // Update the background image
//     setBgImages(updatedBgImages);
//   };

//   // Handle file change for icons
//   const handleIconFileChange = (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Update the icons array with the new file
//     const updatedIcons = [...icons];
//     updatedIcons[index] = { ...updatedIcons[index], file }; // Add the file to the icon object
//     setIcons(updatedIcons);
//   };

//   // Handle title or description change for icons
//   const handleIconChange = (e, index, field) => {
//     const value = e.target.value;

//     // Update the specific field (title or description) for the icon
//     const updatedIcons = [...icons];
//     updatedIcons[index] = { ...updatedIcons[index], [field]: value };
//     setIcons(updatedIcons);
//   };

//   return (
//     <div className="home-sec4 container my-4" style={{borderBottom: '1px solid #ccc', padding: '0 0 50px 0'}}>
//       {/* Section Header */}
//       <div className="section-header text-center mb-4">
//         <h2>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             disabled={isSubmitting}
//             style={{ fontSize: "24px", textAlign: "center" }}
//           />
//         </h2>
//       </div>

//       {/* Description */}
//       <div className="description text-center">
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           disabled={isSubmitting}
//           style={{ width: "80%", height: "100px", textAlign: "center" }}
//         />
//       </div>

//       <div className="text-center">
//         <button
//           className="btn btn-primary mt-3 mb-3"
//           onClick={handleSaveText}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? (
//             <>
//               <span
//                 className="spinner-border spinner-border-sm me-2"
//                 role="status"
//                 aria-hidden="true"
//               ></span>
//               Saving...
//             </>
//           ) : (
//             "Save Text Changes"
//           )}
//         </button>
//       </div>

//       {/* Background Image Section */}
//       <div className="bg-image text-center mb-5">
//         {bgImages[0]?.url && (
//           <div>
//             <img
//               src={bgImages[0].url}
//               alt="Background"
//               style={{ maxHeight: "200px" }}
//             />

//             <input
//               type="file"
//               onChange={handleBgImageFileChange}
//               disabled={isSubmitting}
//               style={{ marginTop: "10px" }}
//               className="form-control"
//             />

//             <button
//               className="btn btn-primary mt-3"
//               onClick={handleSaveBgImage}
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <span
//                     className="spinner-border spinner-border-sm me-2"
//                     role="status"
//                     aria-hidden="true"
//                   ></span>
//                   Saving...
//                 </>
//               ) : (
//                 "Save Background Image"
//               )}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Icons Section */}
//       <div className="icons">
//         <div className="row">
//           {icons && icons.length > 0 ? (
//             icons.map((icon, index) => (
//               <div className="col-lg-4">
//                 <div
//                   key={index}
//                   className="icon-item"
//                   style={{ margin: "10px", textAlign: "center" }}
//                 >
//                   <img
//                     src={icon.icon}
//                     alt={icon.title}
//                     style={{
//                       width: "80px",
//                       height: "80px",
//                       objectFit: "contain",
//                     }}
//                   />
//                   <input
//                     type="text"
//                     value={icon.title}
//                     onChange={(e) => handleIconChange(e, index, "title")}
//                     disabled={isSubmitting}
//                     style={{ fontSize: "20px", textAlign: "center" }}
//                   />
//                   <textarea
//                     value={icon.description}
//                     onChange={(e) => handleIconChange(e, index, "description")}
//                     disabled={isSubmitting}
//                     style={{
//                       width: "80%",
//                       height: "100px",
//                       textAlign: "center",
//                     }}
//                   />
//                   <input
//                     type="file"
//                     onChange={(e) => handleIconFileChange(e, index)}
//                     disabled={isSubmitting}
//                     style={{ marginBottom: "10px" }}
//                     className="form-control"
//                   />
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No icons available.</p>
//           )}
//         </div>
//       </div>

//       {/* Error message if any */}
//       {submitError && <div className="alert alert-danger">{submitError}</div>}

//       {/* Save Buttons */}
//       <div className="d-flex justify-content-center gap-3 mt-2 mb-4">
//         <button
//           className="btn btn-primary ml-2"
//           onClick={handleSaveIcons}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? (
//             <>
//               <span
//                 className="spinner-border spinner-border-sm me-2"
//                 role="status"
//                 aria-hidden="true"
//               ></span>
//               Saving...
//             </>
//           ) : (
//             "Save Icon Changes"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HomeSec4;

import React, { useState } from "react";
import { updateText, updateIcon, updateBgImage } from "../../api/updateContent";

const HomeSec4 = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // State to store the editable fields
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [bgImages, setBgImages] = useState(data.bgImages);
  const [icons, setIcons] = useState(
    (data.icons || []).map((it) => ({ ...it, isEdited: false, previewUrl: null }))
  );

  // Function to handle the Save button for updating text fields
  const handleSaveText = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await updateText("home","home-sec4", title, null, description);
      console.log("Text updated successfully:", result);
    } catch (error) {
      console.error("Failed to update text:", error);
      setSubmitError("Failed to update text");
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
        const result = await updateBgImage("home","home-sec4", bgImageFile, 0);
        console.log("Background image updated:", result);
      }
    } catch (error) {
      console.error("Failed to update background image:", error);
      setSubmitError("Failed to update background image");
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
        const iconFile = icon.file;
        const iconTitle = icon.title;
        const iconDescription = icon.description;

        if (
          iconFile ||
          iconTitle !== data.icons[i].title ||
          iconDescription !== data.icons[i].description
        ) {
          const result = await updateIcon(
            "home",
            "home-sec4",
            iconFile,
            i,
            iconTitle,
            iconDescription
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

  // Handle file change for background image (unchanged functionality)
  const handleBgImageFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    const previewUrl = ev.target.result;

    const updatedBgImages = [...bgImages];
    updatedBgImages[0] = {
      ...updatedBgImages[0],
      file,          // keep file for upload
      url: previewUrl, // update preview instantly
      isEdited: true, // mark as edited
    };

    setBgImages(updatedBgImages);
  };

  reader.readAsDataURL(file);
};

  // Handle file change for icons — now also creates a preview + marks edited
  const handleIconFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const previewUrl = ev.target.result; // data URL for immediate UI preview
      const updatedIcons = [...icons];
      updatedIcons[index] = {
        ...updatedIcons[index],
        file,
        previewUrl,   // show new icon instantly
        isEdited: true,
      };
      setIcons(updatedIcons);
    };
    reader.readAsDataURL(file);
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
    <div className="home-sec4 container my-4" style={{borderBottom: '1px solid #ccc', padding: '0 0 50px 0'}}>
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

      {/* Description */}
      <div className="description text-center">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
          style={{ width: "80%", height: "100px", textAlign: "center" }}
        />
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

      {/* Background Image Section */}
      <div className="bg-image text-center mb-5">
        {bgImages[0]?.url && (
          <div>
            <img
              src={bgImages[0].url}
              alt="Background"
              style={{ maxHeight: "200px" }}
            />

            <input
              type="file"
              onChange={handleBgImageFileChange}
              disabled={isSubmitting}
              style={{ marginTop: "10px" }}
              className="form-control"
            />

            <button
              className="btn btn-primary mt-3"
              onClick={handleSaveBgImage}
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
                "Save Background Image"
              )}
            </button>
          </div>
        )}
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

                  <img
                    src={icon.previewUrl || icon.icon}
                    alt={icon.title}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                    }}
                  />

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

                  <input
                    type="file"
                    onChange={(e) => handleIconFileChange(e, index)}
                    disabled={isSubmitting}
                    style={{ marginBottom: "10px" }}
                    className="form-control"
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

export default HomeSec4;