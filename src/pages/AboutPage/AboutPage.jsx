import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContent } from "../../redux/content/contentActions";
import Layouts from '../../components/Layouts';
import AboutSec1 from '../../components/About/AboutSec1';
import AboutSec4 from '../../components/About/AboutSec4';
import AboutSec5 from '../../components/About/AboutSec5';

const AboutPage = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.content);
//   console.log("Content data in HomePage:", data);

  useEffect(() => {
    dispatch(fetchContent('about'));
  }, [dispatch]);

  if (loading) return <div>Loading content...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;
  
  return (
    <Layouts>
      <AboutSec1 data={data.sections[0]}/>
      <AboutSec4 data={data.sections[3]}/>
      <AboutSec5 data={data.sections[4]}/>

      {/* Other page content */}
    </Layouts>
  );
}

export default AboutPage