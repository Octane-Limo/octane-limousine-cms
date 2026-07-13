import "./Dashboard.css";
import Layout from "../../components/Layouts";
// import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // const navigate = useNavigate();


  // const handleGoToHome = () => {
  //   navigate("/home");
  // };

  // const handleGoToAbout = () => {
  //   navigate("/about");
  // };

  // const handleGoToServices = () => {
  //   navigate("/services");
  // };

  // const handleGoToOurFleets = () => {
  //   navigate("/our-fleets");
  // };

  // const handleGoToTestimonials = () => {
  //   navigate("/testimonials");
  // };

  // const handleGoToBookedDetails = () => {
  //   navigate("/booked-details");
  // };

  return (
    <Layout>
      <div className="d-flex justify-content-center gap-2 align-items-center mb-4">
        <h1>Welcome to the Dashboard</h1>
      </div>
      {/* <div className="d-flex justify-content-start gap-3 align-items-center">
        <button 
          className="btn btn-primary"
          onClick={handleGoToHome}
        >
          <i className="bi bi-house me-2"></i>
          Home Page
        </button>

        <button 
          className="btn btn-primary"
          onClick={handleGoToAbout}
        >
          <i className="bi bi-house me-2"></i>
          About Page
        </button>
        <button 
          className="btn btn-primary"
          onClick={handleGoToServices}
        >
          <i className="bi bi-house me-2"></i>
          Services Page
        </button>
        <button 
          className="btn btn-primary"
          onClick={handleGoToOurFleets}
        >
          <i className="bi bi-house me-2"></i>
          Our Fleet Page
        </button>

        <button 
          className="btn btn-primary"
          onClick={handleGoToTestimonials}
        >
          <i className="bi bi-house me-2"></i>
          Testimonials Page
        </button>

        <button 
          className="btn btn-primary"
          onClick={handleGoToBookedDetails}
        >
          <i className="bi bi-house me-2"></i>
          Booked Details Page
        </button>
      </div> */}
    </Layout>
  );
};

export default Dashboard;