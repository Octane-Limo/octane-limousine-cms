import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <section className="sidebar-sec">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    Home Page
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <ul>
                      <li>
                        <Link to="/dashboard/home/banner">Banner</Link>
                      </li>
                      <li>
                        <Link to="/dashboard/home/partners">Partners</Link>
                      </li>
                      <li>
                        <Link to="/dashboard/home/powered-section">
                          Powered Section
                        </Link>
                      </li>
                      <li>
                        <Link to="/dashboard/home/services">Services</Link>
                      </li>
                      <li>
                        <Link to="/dashboard/home/our-fleet">Our Fleet</Link>
                      </li>
                      <li>
                        <Link to="/dashboard/home/cta">Home</Link>
                      </li>
                      <li>
                        <Link to="/dashboard/home/testimonials">
                          Testimonials
                        </Link>
                      </li>
                      <li>
                        <Link to="/dashboard/home/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    About Us Page
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <ul>
                      <li>
                        <Link to="/dashboard/about-us/banner">Banner</Link>
                      </li>
                      <li>
                        <Link to="/dashboard/about-us/partners">Partners</Link>
                      </li>
                      <li>
                        <Link to="/dashboard/about-us/powered-section">
                          Powered Section
                        </Link>
                      </li>
                      <li>
                        <Link to="/dashboard/about-us/our-core-values">
                          Our Core Values
                        </Link>
                      </li>
                      <li>
                        <Link to="/dashboard/about-us/meet-our-chauffeurs">
                          Meet Our Chauffeurs
                        </Link>
                      </li>
                      <li>
                        <Link to="/dashboard/about-us/testimonials">
                          Testimonials
                        </Link>
                      </li>
                      <li>
                        <Link to="/dashboard/about-us/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Our Fleets Page
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <ul>
                      <li>
                        <Link to="/dashboard/our-fleet/banner">Banner</Link>
                      </li>
                      <li>
                        <Link to="/dashboard/our-fleet/partners">Partners</Link>
                      </li>
                      <li>
                        <Link to="/dashboard/our-fleet/our-signature-vehicles">
                          Our Signature Vehivles
                        </Link>
                      </li>
                      <li>
                        <Link to="/dashboard/our-fleet/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    Services Page
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <ul>
                      <li>
                        <Link to="/dashboard/services/banner">Banner</Link>
                      </li>
                      <li>
                        <Link to="/dashboard/services/partners">Partners</Link>
                      </li>
                      <li>
                        <Link to="/dashboard/services/vehices-services">
                          Vehices Services
                        </Link>
                      </li>
                      <li>
                        <Link to="/dashboard/services/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFive">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    Testimonials Page
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <ul>
                      <li>
                        <Link to="/dashboard/testimonials/banner">Banner</Link>
                      </li>
                      <li>
                        <Link to="/dashboard/testimonials/partners">
                          Partners
                        </Link>
                      </li>
                      <li>
                        <Link to="/dashboard/testimonials/testimonials">
                          Testimonials
                        </Link>
                      </li>
                      <li>
                        <Link to="/dashboard/testimonials/contact">
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingSix">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSix"
                    aria-expanded="false"
                    aria-controls="collapseSix"
                  >
                    Contact Us Page
                  </button>
                </h2>
                <div
                  id="collapseSix"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingSix"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <ul>
                      <li>
                        <Link to="/dashboard/contact-us/banner">Banner</Link>
                      </li>
                      <li>
                        <Link to="/dashboard/contact-us/testimonials">
                          Testimonials
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 mt-3">
            <Link to={"/booked-details"} className="booked-details">
              Check Booked Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
