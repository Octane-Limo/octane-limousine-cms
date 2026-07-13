import React, { useEffect, useState } from "react";
import "./BookingDetails.css";
import Layouts from "../../components/Layouts";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GetBookingDetailAction } from "../../redux/booked-details/bookedAction";
import axiosInstance from "../../axiosInstance";

const BookingDetails = () => {
  const dispatch = useDispatch();

  const { isAllBookedDetails } = useSelector(
    (state) => state.bookedDetailsReducer
  );

  const [filteredBookings, setFilteredBookings] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    dispatch(GetBookingDetailAction());
  }, [dispatch]);

  useEffect(() => {
    if (isAllBookedDetails) {
      setFilteredBookings(isAllBookedDetails);
    }
  }, [isAllBookedDetails]);

  const fetchBookingsByDate = async (date) => {
    try {
      const response = await axiosInstance.get(
        `/api/appointment/booked-appointments?date=${date}`
      );
      setFilteredBookings(response.data.data);
    } catch (error) {
      console.error("Error fetching bookings by date:", error);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleFilterClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleApplyDateFilter = () => {
    fetchBookingsByDate(selectedDate);
    setShowModal(false);
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
      }),
    };
  }

  return (
    <Layouts>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="booked-filters">
              <FaFilter color="#000" onClick={handleFilterClick} size={22} />
            </div>
          </div>

          <div className="col-lg-12">
            <div className="booked-cards-main">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Car</th>
                      <th scope="col">Car Name</th>
                      <th scope="col">Car Model</th>
                      <th scope="col">Date</th>
                      <th scope="col">Time</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings?.length > 0 ? (
                      filteredBookings?.map((item, index) => {
                        const { date, time } = formatDateTime(
                          item.appointmentTime
                        );
                        return (
                          <tr key={item._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>
                              <img
                                src={item.carImage}
                                alt={item.carModel}
                                width="60"
                                className="me-2 rounded"
                              />
                            </td>
                            <td>{item.carName}</td>
                            <td>{item.carModel}</td>
                            <td>{date}</td>
                            <td>{time}</td>
                            <td>
                              <span
                                className={`badge ${
                                  item.status === "pending"
                                    ? "bg-warning text-dark"
                                    : item.status === "confirmed"
                                    ? "bg-success"
                                    : "bg-secondary"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="10">No bookings available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        id="dateFilterModal"
        tabIndex="-1"
        aria-labelledby="dateFilterModalLabel"
        aria-hidden={!showModal}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="dateFilterModalLabel">
                Filter by Date
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="date"
                value={selectedDate || ""}
                onChange={handleDateChange}
                className="form-control"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Close
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
    </Layouts>
  );
};

export default BookingDetails;