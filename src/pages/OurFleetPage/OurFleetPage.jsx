import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContent } from "../../redux/content/contentActions";
import Layouts from '../../components/Layouts';
import OurFleetSec1 from '../../components/OurFleets/OurFleetSec1';
import OurFleetSec3 from '../../components/OurFleets/OurFleetSec3';

const OurFleetPage = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContent('our-fleets'));
  }, [dispatch]);

  if (loading) return <div>Loading content...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;
  
  return (
    <Layouts>
      <OurFleetSec1 data={data.sections[0]}/>
      <OurFleetSec3 data={data.sections[2]}/>

      {/* Other page content */}
    </Layouts>
  );
}

export default OurFleetPage