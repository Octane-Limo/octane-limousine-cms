import React, { useEffect, useState } from "react";
import "./ContactQueryDetails.css";
import Layouts from "../../components/Layouts";
import {
  FaEye,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GetContactQueryDetailAction } from "../../redux/contact-query-details/contactAction";
import axiosInstance from "../../axiosInstance";

const ContactQueryDetails = () => {
  const dispatch = useDispatch();
  const { isAllContactDetails } = useSelector((state) => state.contact);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [detailModal, setDetailModal] = useState(false);

  useEffect(() => {
    dispatch(GetContactQueryDetailAction());
  }, [dispatch]);

  useEffect(() => {
    if (isAllContactDetails) {
      setFilteredContacts(isAllContactDetails);
    }
  }, [isAllContactDetails]);

  // Filter contacts based on search term
  useEffect(() => {
    if (isAllContactDetails) {
      const filtered = isAllContactDetails.filter(
        (contact) =>
          contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.phone?.includes(searchTerm) ||
          contact.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  }, [searchTerm, isAllContactDetails]);

  const fetchContactsByDate = async (date) => {
    try {
      const response = await axiosInstance.get(`/api/contact?date=${date}`);
      setFilteredContacts(response.data?.data);
    } catch (error) {
      console.error("Error fetching contacts by date:", error);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // const handleFilterClick = () => {
  //   setShowModal(true);
  // };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleApplyDateFilter = () => {
    if (selectedDate) {
      fetchContactsByDate(selectedDate);
    } else {
      setFilteredContacts(isAllContactDetails);
    }
    setShowModal(false);
  };

  const handleClearFilters = () => {
    setSelectedDate("");
    setSearchTerm("");
    setFilteredContacts(isAllContactDetails);
  };

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModal(false);
    setSelectedContact(null);
  };

  function formatDateTime(iso) {
    if (!iso) return { date: "-", time: "-" };
    const d = new Date(iso);
    return {
      date: d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }),
      time: d.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  }

  return (
    <Layouts>
      <div className="container-fluid py-4">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">Contact Queries</h2>
              <div className="d-flex gap-3">
                <div className="input-group" style={{ maxWidth: "300px" }}>
                  {/* <span className="input-group-text">
                    <FaSearch />
                  </span> */}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search queries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card stat-card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="stat-icon"
                    style={{ background: "rgb(255, 223, 177)" }}
                  >
                    <FaUser />
                  </div>
                  <div className="ms-3">
                    <h6 className="card-title mb-0">Total Queries</h6>
                    <h3 className="mb-0">{filteredContacts.length}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card stat-card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="stat-icon"
                    style={{ background: "rgb(255, 223, 177)" }}
                  >
                    <FaEnvelope />
                  </div>
                  <div className="ms-3">
                    <h6 className="card-title mb-0">Today's Queries</h6>
                    <h3 className="mb-0">
                      {
                        filteredContacts.filter((contact) => {
                          const today = new Date().toDateString();
                          const contactDate = new Date(
                            contact.createdAt
                          ).toDateString();
                          return contactDate === today;
                        }).length
                      }
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Queries Table */}
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Date</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts.length > 0 ? (
                        filteredContacts.map((item, index) => {
                          const { date } = formatDateTime(item.createdAt);
                          return (
                            <tr key={item._id} className="contact-row">
                              <th scope="row">{index + 1}</th>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div
                                    className="avatar-circle me-3"
                                    style={{
                                      background: "#ffdfb1",
                                      color: "#000 !important",
                                    }}
                                  >
                                    {item.name?.charAt(0)?.toUpperCase()}
                                  </div>
                                  <div>
                                    <div className="fw-semibold">
                                      {item.name}
                                    </div>
                                    <small className="text-muted">
                                      {item.message?.substring(0, 30)}...
                                    </small>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <FaEnvelope
                                    className="text-muted me-2"
                                    style={{ fill: "rgb(255, 223, 177)" }}
                                  />
                                  <a
                                    href={`mailto:${item.email}`}
                                    className="text-decoration-none text-dark"
                                  >
                                    {item.email}
                                  </a>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <FaPhone
                                    className="text-muted me-2"
                                    style={{ fill: "rgb(255, 223, 177)" }}
                                  />
                                  <a
                                    href={`tel:${item.phone}`}
                                    className="text-decoration-none text-dark"
                                  >
                                    {item.phone}
                                  </a>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <FaCalendarAlt
                                    className="text-muted me-2"
                                    style={{ fill: "rgb(255, 223, 177)" }}
                                  />
                                  <span>{date}</span>
                                </div>
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm btn-outline-dark"
                                  onClick={() => handleViewDetails(item)}
                                  title="View Details"
                                >
                                  <FaEye />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center py-4">
                            <div className="text-muted">
                              <FaEnvelope size={48} className="mb-3" />
                              <h5>No contact queries found</h5>
                              <p>Try adjusting your search or filters</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Modal */}
        {showModal && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Filter Queries</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Filter by Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={selectedDate}
                      onChange={handleDateChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleApplyDateFilter}
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Detail Modal */}
        {detailModal && selectedContact && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Contact Query Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseDetailModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Name</label>
                        <p className="form-control-plaintext">
                          {selectedContact.name}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Email</label>
                        <p className="form-control-plaintext">
                          <a
                            href={`mailto:${selectedContact.email}`}
                            className="text-decoration-none"
                          >
                            {selectedContact.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Phone</label>
                        <p className="form-control-plaintext">
                          <a
                            href={`tel:${selectedContact.phone}`}
                            className="text-decoration-none"
                          >
                            {selectedContact.phone}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Date & Time
                        </label>
                        <p className="form-control-plaintext">
                          {formatDateTime(selectedContact.createdAt).date} at{" "}
                          {formatDateTime(selectedContact.createdAt).time}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Message</label>
                    <div className="card">
                      <div className="card-body">
                        <p className="mb-0">{selectedContact.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseDetailModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layouts>
  );
};

export default ContactQueryDetails;