import HomeSec1 from "../../components/Home/HomeSec1";
import HomeSec2 from "../../components/Home/HomeSec2";
import HomeSec3 from "../../components/Home/HomeSec3";
import HomeSec4 from "../../components/Home/HomeSec4";
import HomeSec5 from "../../components/Home/HomeSec5";
import HomeSec6 from "../../components/Home/HomeSec6";
import HomeSec7 from "../../components/Home/HomeSec7";
import HomeSec8 from "../../components/Home/HomeSec8";
import HomeSec9 from "../../components/Home/HomeSec9";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContent } from "../../redux/content/contentActions";
import Layouts from "../../components/Layouts";

function HomePage() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContent("home"));
  }, [dispatch]);

  if (loading) return <div>Loading content...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <Layouts>
      <HomeSec1 data={data} />
      <HomeSec2 data={data.sections[1]} />
      <HomeSec3 data={data.sections[2]} />
      <HomeSec4 data={data.sections[3]} />
      <HomeSec5 data={data.sections[4]} />
      <HomeSec6 data={data.sections[5]} />
      <HomeSec7 data={data.sections[6]} />
      <HomeSec8 data={data.sections[7]} />
      <HomeSec9 data={data.sections[8]} />
      {/* Other page content */}
    </Layouts>
  );
}

export default HomePage;