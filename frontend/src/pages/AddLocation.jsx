import { MdAddLocationAlt } from "react-icons/md";
import { useGetAllEmployees } from "../features/employee/useGetAllEmployees";
import FullScreenSpinner from "../ui/FullScreenSpinner";
import Map from "../ui/Map";
import { useEffect, useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import SaveButton from "../ui/SaveButton";
import { useAddLocation } from "../features/attendance/useAddLocation";
import { useGetLocation } from "../features/attendance/useGetLocation";
import { useEditEmployeeLocation } from "../features/attendance/useEditEmployeeLocation";
import { useRemoveLocation } from "../features/attendance/useRemoveLocation";

function AddLocation() {
  const { allEmployees, isLoading } = useGetAllEmployees();
  const [employees, setEmployees] = useState([]);
  const [addedEmployees, setAddedEmployees] = useState([]);
  const [location, setLocation] = useState({
    locationName: "",
    latitude: "",
    longitude: "",
  });
  const [selectedLocation, setSelectedLocation] = useState({});
  const [open, setOpen] = useState(false);
  const { addLocation, isLoading: isLoading2 } = useAddLocation();
  const { getLocation, isLoading: isLoading3 } = useGetLocation();
  const { editEmployeeLocation, isLoading: isLoading4 } =
    useEditEmployeeLocation();
  const { removeLocation, isLoading: isLoading5 } = useRemoveLocation();

  useEffect(() => {
    if (allEmployees?.data) {
      setEmployees(allEmployees.data);
    }
    if (selectedLocation?.employees) {
      setAddedEmployees(
        allEmployees.data
          .filter((el) => selectedLocation.employees.includes(el._id))
          .map((el) => el._id)
      );
    }
  }, [allEmployees, selectedLocation]);

  if (isLoading || isLoading2 || isLoading3 || isLoading4 || isLoading5)
    return <FullScreenSpinner />;

  const allLocations = getLocation.data;

  const alreadyAddedEmployees = getLocation.data
    ? getLocation.data.reduce((acc, curr) => acc.concat(curr.employees), [])
    : [];

  function handleAdd(id) {
    setAddedEmployees((el) => [...el, id]);
  }

  function handleRemove(id) {
    setAddedEmployees((el) => el.filter((idx) => idx !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!Object.keys(selectedLocation).length)
      addLocation({ data: { ...location, employees: addedEmployees } });

    setOpen(false);
    setSelectedLocation({});
    setLocation({
      locationName: "",
      latitude: "",
      longitude: "",
    });
    setAddedEmployees([]);
  }

  function handleEmployeeEdit(id, action) {
    editEmployeeLocation({
      data: {
        employee: id,
        locationId: selectedLocation._id,
        action,
      },
    });
    if (action === "add") handleAdd(id);
    else handleRemove(id);
  }

  function LocationMarker() {
    useMapEvents({
      click: (e) => {
        !selectedLocation.latitude &&
          setLocation((prev) => ({
            ...prev,
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
          }));
      },
    });

    return (location.latitude && location.longitude) ||
      (selectedLocation.latitude && selectedLocation.longitude) ? (
      <Marker
        position={
          location.latitude && location.longitude
            ? [location.latitude, location.longitude]
            : [selectedLocation.latitude, selectedLocation.longitude]
        }
      >
        <Popup>
          {location.locationName ||
            selectedLocation.locationName ||
            "New Location"}
        </Popup>
      </Marker>
    ) : null;
  }

  function handleClose() {
    setSelectedLocation({});
    setLocation({
      locationName: "",
      latitude: "",
      longitude: "",
    });
    setAddedEmployees([]);
    setOpen();
  }

  function handleRemoveLocation() {
    removeLocation(selectedLocation._id);
    handleClose();
  }

  function handleAddNewLocation() {
    setSelectedLocation({});
    setLocation({
      locationName: "",
      latitude: "",
      longitude: "",
    });
    setAddedEmployees([]);
    setOpen(true);
  }

  return (
    <>
      <h1 className="flex font-semibold gap-3 text-lg sm:text-xl sm:p-3 p-2 w-full shadow-xl items-center">
        <MdAddLocationAlt className="h-10 w-10 sm:h-8 sm:w-8" />
        Add Location
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5 shadow-2xl p-5 gap-2">
        {allLocations.length > 0 && !open ? (
          <>
            <div>
              <span className="text-lg font-semibold pl-2">
                Ongoing Work at Locations
              </span>
              {allLocations.map((item) => (
                <div
                  className="p-2 bg-blue-500 m-1 font-semibold rounded text-white cursor-pointer text-center"
                  key={item._id}
                  onClick={() => {
                    setSelectedLocation(item);
                    setOpen(true);
                  }}
                >
                  {item.locationName}
                </div>
              ))}
            </div>
            <div className="">
              <span className="text-lg font-semibold pl-2"></span>
              <div
                className="p-2 m-1 rounded bg-green-500 font-semibold text-white cursor-pointer text-center"
                onClick={handleAddNewLocation}
              >
                Add New Location
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <form onSubmit={handleSubmit}>
              <label>
                Location*:
                <input
                  type="text"
                  className="w-full border border-gray-400 p-1 mb-2 disabled:bg-gray-200 disabled:cursor-not-allowed capitalize"
                  value={
                    location.locationName || selectedLocation.locationName || ""
                  }
                  onChange={(e) =>
                    setLocation({ ...location, locationName: e.target.value })
                  }
                  disabled={!!selectedLocation.locationName}
                />
              </label>
              <label>
                Latitude*:
                <input
                  type="number"
                  className="w-full border border-gray-400 p-1 mb-2 disabled:bg-gray-200 disabled:cursor-not-allowed capitalize"
                  value={location.latitude || selectedLocation.latitude || ""}
                  disabled={!!selectedLocation.latitude}
                  readOnly
                />
              </label>
              <label>
                Longitude*:
                <input
                  type="number"
                  className="w-full border border-gray-400 p-1 mb-2 disabled:bg-gray-200 disabled:cursor-not-allowed capitalize"
                  value={location.longitude || selectedLocation.longitude || ""}
                  disabled={!!selectedLocation.longitude}
                  readOnly
                />
              </label>

              <div className="mt-3">
                <span>Employees*:</span>
                {employees.map((el) => (
                  <div
                    className="border border-slate-500 p-1 rounded flex justify-between items-center"
                    key={el._id}
                  >
                    <span className="capitalize">
                      {el.general.firstName + " " + el.general.lastName}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        className="text-green-600 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400"
                        onClick={() =>
                          selectedLocation.latitude
                            ? handleEmployeeEdit(el._id, "add")
                            : handleAdd(el._id)
                        }
                        disabled={
                          addedEmployees.includes(el._id) ||
                          alreadyAddedEmployees.includes(el._id)
                        }
                      >
                        <FaPlusCircle size={20} />{" "}
                      </button>
                      <button
                        type="button"
                        className="text-red-600 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400"
                        onClick={() =>
                          selectedLocation.latitude
                            ? handleEmployeeEdit(el._id, "remove")
                            : handleRemove(el._id)
                        }
                        disabled={
                          !addedEmployees.includes(el._id) ||
                          addedEmployees.length === 1
                        }
                      >
                        <FaMinusCircle size={20} />{" "}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex mt-7 justify-between items-center">
                {allLocations.length > 0 && (
                  <button
                    className="border p-2 rounded self-end bg-gray-500 text-white cursor-pointer"
                    onClick={handleClose}
                    type="button"
                  >
                    Close
                  </button>
                )}
                {selectedLocation.locationName && (
                  <button
                    className="border p-2 rounded self-end bg-red-500 text-white cursor-pointer"
                    onClick={handleRemoveLocation}
                    type="button"
                  >
                    Remove Location
                  </button>
                )}
                {location.locationName && <SaveButton />}
              </div>
            </form>
            <div>
              <Map
                lat={selectedLocation.latitude}
                lng={selectedLocation.longitude}
              >
                <LocationMarker />
              </Map>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default AddLocation;
