import axiosInstance from '../axiosInstance'; // Import the axiosInstance

// Update background images
export const updateBgImage = async (page, sectionId, bgImageFile, bgImageIndex) => {
    console.log("Updating background image...");

    const formData = new FormData();
    formData.append('bgImages', bgImageFile);  // Append the background image file
    formData.append('bgImageIndex', bgImageIndex);  // Append the background image index

    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.put(
            `/api/pages/${page}/${sectionId}`,  // Endpoint for background images
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        console.log("Response from updateBgImage API:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating background image:', error);
        throw error.response?.data || { message: 'Error updating background image' };
    }
};

// export const updateButton = async (page, sectionId, buttonIndex, text) => {
//   console.log('Updating button:', { sectionId, buttonIndex, text });

//   try {
//     const token = localStorage.getItem('token');
//     const response = await axiosInstance.put(
//       `/api/pages/${page}/${sectionId}`,
//       {
//         buttonIndex,
//         text,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       }
//     );
//     console.log('Button updated successfully:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating button:', error);
//     throw error.response?.data || { message: 'Error updating button' };
//   }
// };





// Update car images

export const updateCarImageInBG = async (page, sectionId, carImageFile, carImageLocation, bgImageIndex, carImageIndex, title, subtitle, description) => {
    console.log("Updating car image...", { carImageLocation, bgImageIndex, carImageIndex, title, subtitle, description });

    const formData = new FormData();

    // Only append carImages if a file is provided
    if (carImageFile) {
        formData.append('carImages', carImageFile);
    }
    formData.append('carImageLocation', carImageLocation);  // Location (e.g., 'bgImages')
    formData.append('bgImageIndex', bgImageIndex);  // Background image index
    formData.append('carImageIndex', carImageIndex);  // Car image index
    formData.append('title', title);  // Title for the car
    formData.append('subtitle', subtitle);  // Subtitle for the car
    formData.append('description', description);  // Subtitle for the car

    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.put(
            `/api/pages/${page}/${sectionId}`,  // Endpoint for car images
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        console.log("Response from updateCarImageInBG API:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating car image:', error);
        throw error.response?.data || { message: 'Error updating car image' };
    }
};

export const updateCarImage = async (page, sectionId, carImageFile, carImageIndex, title, subtitle, rating) => {
    console.log("Updating car image...");

    const formData = new FormData();
    
    // Only append carImages if a file is provided
    if (carImageFile) {
        formData.append('carImages', carImageFile);
    }
    
    formData.append('carImageIndex', carImageIndex.toString());
    formData.append('title', title || '');
    formData.append('subtitle', subtitle || '');
    formData.append('rating', rating?.toString() || '5');

    try {
        const token = localStorage.getItem('token');
        console.log("Form Data before sending:", {
            carImageIndex, title, subtitle, rating
        });
        
        const response = await axiosInstance.put(
            `/api/pages/${page}/${sectionId}`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        console.log("Response from updateCarImage API:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating car image:', error);
        throw error.response?.data || { message: 'Error updating car image' };
    }
};

// Your updateButton function should look like this:
export const updateButton = async (page, sectionId, carImageIndex, buttonIndex, buttonText, buttonHref) => {
  try {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.put(
    `/api/pages/${page}/${sectionId}`,
    {
      carImageIndex,
      buttonIndex,
      buttonText,
      buttonHref
    },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data;
  } catch (error) {
    console.error('Error updating button:', error);
    throw error.response?.data || { message: 'Error updating button' };
  }
};

export const updateButtonInRoot = async (page, sectionId, buttonIndex, text, href) => {
  try {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.put(
    `/api/pages/${page}/${sectionId}`,
    {
      buttonIndex,
      text,
      href
    },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data;
  } catch (error) {
    console.error('Error updating button:', error);
    throw error.response?.data || { message: 'Error updating button' };
  }
};

export const updateLogo = async (page, sectionId, logos, logoIndex) => {
  console.log("Updating logo...", logos, logoIndex);

  const formData = new FormData();
  formData.append('logos', logos);  // Append the logo image file
  formData.append('logoIndex', logoIndex);  // Append the logo index (to specify which logo to update)

  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.put(
      `/api/pages/${page}/${sectionId}`,  // Endpoint for updating logos
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log("Response from updateLogo API:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating logo:', error);
    throw error.response?.data || { message: 'Error updating logo' };
  }
};



export const updateText = async (page, sectionId, title, subtitle, description) => {
  console.log("Updating text fields...", { title, subtitle, description });

  try {
    const response = await axiosInstance.put(
      `/api/pages/${page}/${sectionId}`,
      {
        title,
        subtitle,
        description
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    console.log("Response from updateText API:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating text fields:', error);
    throw error.response?.data || { message: 'Error updating text fields' };
  }
};



export const updateIcon = async (page, sectionId, iconFile, iconIndex, iconTitle, iconDescription) => {

  const formData = new FormData();

  if (iconFile) {
    formData.append('icons', iconFile);
  }

  formData.append('iconIndex', iconIndex.toString());
  formData.append('title', iconTitle || '');
  formData.append('description', iconDescription || '');

  console.log("Form Data before sending:",formData);
  try {
    const response = await axiosInstance.put(
      `/api/pages/${page}/${sectionId}`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log("Response from updateIcon API:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating icon:', error);
    throw error.response?.data || { message: 'Error updating icon' };
  }
};


// Update testimonial
export const updateTestimonial = async (page, sectionId, testimonialIndex, customerName, profession, feedback, rating, avatarFile) => {
  const formData = new FormData();
  
  if (avatarFile) {
    formData.append('testimonialAvatars', avatarFile);
  }
  
  formData.append('testimonialIndex', testimonialIndex.toString());
  formData.append('customerName', customerName || '');
  formData.append('profession', profession || '');
  formData.append('feedback', feedback || '');
  formData.append('rating', rating?.toString() || '5');

  try {
    const response = await axiosInstance.put(
      `/api/pages/${page}/${sectionId}`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log("Response from updateIcon API:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating icon:', error);
    throw error.response?.data || { message: 'Error updating icon' };
  }
};

// Update car image in testimonial (extend existing updateCarImage)
export const updateCarImageInTestimonials = async (page, sectionId, carImageFile, carImageIndex, testimonialIndex) => {
  const formData = new FormData();
  
  if (carImageFile) {
    formData.append('carImages', carImageFile);
  }
  
  formData.append('carImageIndex', carImageIndex.toString());
  
  if (testimonialIndex !== null) {
    formData.append('testimonialIndex', testimonialIndex.toString());
    formData.append('carImageLocation', 'testimonials');
  }

  try {
    const response = await axiosInstance.put(
      `/api/pages/${page}/${sectionId}`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log("Response from updateIcon API:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating icon:', error);
    throw error.response?.data || { message: 'Error updating icon' };
  }
};

// Update footer
export const updateFooter = async (page, sectionId, footerIndex, year, companyName, poweredByText, poweredByName, poweredByLink) => {
  const formData = new FormData();
  
  formData.append('footerIndex', footerIndex.toString());
  formData.append('year', year || '');
  formData.append('companyName', companyName || '');
  formData.append('poweredByText', poweredByText || '');
  formData.append('poweredByName', poweredByName || '');
  formData.append('poweredByLink', poweredByLink || '');

  const token = localStorage.getItem('token');
  
  try {
    const response = await axiosInstance.put(
      `/api/pages/${page}/${sectionId}`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating footer:', error);
    throw error.response?.data || { message: 'Error updating footer' };
  }
};



export const deleteCarImage = async (page, sectionId, carImageIndex) => {
  try {
    const token = localStorage.getItem('token'); // Or your auth token storage method
    
    const response = await axiosInstance.delete(
      `/api/pages/${page}/${sectionId}/carImages/${carImageIndex}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error deleting car image:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete car image');
  }
};