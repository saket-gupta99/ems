const handleErrors = (err, res) => {
  if (err.name === "validationError") {
    return res.status(400).json({ message: "validation error" });
  }
  if (err.name == "jsonWebTokenError") {
    return res.status(401).json({ message: "Invalid token" });
  }
  return res
    .status(500)
    .json({ message: "Server error occured: " + err.message });
};

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371000; // Earth radius in meters

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
};

const toIST = (date=new Date()) => {
  return new Date(new Date(date).getTime() + 5.5 * 60 * 60 * 1000);
};

const extractDate = (date) => date.split("T")[0].split("-").reverse().join("-");

module.exports = { handleErrors, haversineDistance, toIST, extractDate };
