import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContent } from "../../redux/content/contentActions";
import Layouts from '../../components/Layouts';
import ServicesSec1 from '../../components/Services/ServicesSec1';
import ServicesSec3 from '../../components/Services/ServicesSec3';
// import ServicesSec4 from '../../components/Services/ServicesSec4';
// import ServicesSec5 from '../../components/Services/ServicesSec5';

const ServicesPage = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.content);
//   console.log("Content data in HomePage:", data);

  useEffect(() => {
    dispatch(fetchContent('services'));
  }, [dispatch]);

  if (loading) return <div>Loading content...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;
//   console.log("Data: ", data);
  
  return (
    <Layouts>
      <ServicesSec1 data={data.sections[0]}/>
      <ServicesSec3 data={data.sections[2]}/>

      {/* Other page content */}
    </Layouts>
  );
}

export default ServicesPage