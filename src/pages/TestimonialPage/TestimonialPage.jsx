import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContent } from "../../redux/content/contentActions";
import Layouts from '../../components/Layouts';
import TestimonialSec1 from '../../components/Testimonial/TestimonialSec1';
import TestimonialSec3 from '../../components/Testimonial/TestimonialSec3';


const TestimonialPage = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContent('testimonials'));
  }, [dispatch]);

  if (loading) return <div>Loading content...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;
  
  return (
    <Layouts>
      <TestimonialSec1 data={data.sections[0]}/>
      <TestimonialSec3 data={data.sections[2]}/>
      {/* Other page content */}
    </Layouts>
  );
}

export default TestimonialPage