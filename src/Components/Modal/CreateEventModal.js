import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { UserContext } from "../../Context/LoginContext";
import axios from "axios";

const CreateEventModal = ({ open, handleClose }) => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { userData } = useContext(UserContext);

  // Function to handle form submission
  const handleSubmit = () => {
    // Logic to handle form submission (e.g., sending data to server)
    console.log("Form submitted:", {
      eventName,
      description,
      location,
      startDate,
      endDate,
      imageUrl,
    });
    // Close the modal after form submission
    const submitEvent = async () => {
      try {
        const response = await axios.post(
          "https://events-api-iuta.onrender.com/event/add",
          {
            eventname: eventName,
            organizer: userData.uid,
            description: description,
            location: location,
            startdate: startDate,
            enddate: endDate,
            status: "upcoming",
            thumbnail: imageUrl,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        console.log(response.data);
      } catch (error) {
        console.error("Error creating event:", error);
      }
    };

    if (
      eventName.length > 0 &&
      description.length > 0 &&
      location.length > 0 &&
      startDate.length > 0 &&
      endDate.length > 0 &&
      imageUrl.length > 0
    ) {
      submitEvent();
    } else {
      alert("Please fill in all fields");
      return;
    }

    handleClose();
  };

  // Function to handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Display the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent>
        {/* Form fields */}
        <TextField
          autoFocus
          margin="dense"
          label="Event Name"
          type="text"
          fullWidth
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Location"
          type="text"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Start Date"
          type="text"
          fullWidth
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          margin="dense"
          label="End Date"
          type="text"
          fullWidth
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <div style={{ marginTop: "20px" }}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        {/* Display selected image */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Event"
            style={{ marginTop: "10px", maxWidth: "100%" }}
          />
        )}
      </DialogContent>
      <DialogActions>
        {/* Buttons for form actions */}
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create
        </Button>
        <Button
          onClick={() => {
            setImageUrl("");
            handleClose();
          }}
          variant="contained"
          color="primary"
          style={{ background: "#D0312D" }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEventModal;
