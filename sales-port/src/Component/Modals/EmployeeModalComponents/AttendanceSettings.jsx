import { useState, useRef, useEffect } from 'react';
import { useJsApiLoader, Autocomplete, GoogleMap, Marker } from '@react-google-maps/api';
import close from '../../../assets/icons/close.svg';
import addFingerprint from '../../../assets/icons/FingerPrint.svg';
import previous from '../../../assets/icons/previous.svg';
import next from '../../../assets/icons/icon.svg';
import savedraft from '../../../assets/icons/savedraft.svg';
import { getData, Postdata } from '../../../API/GlobalApi';

export const AttendanceSettings = ({ onClose, currentStep, setCurrentStep, handlePrev, handleNext, steps, selectedUserId,
  isEditMode, biometricImages, setBiometricImages, geoLocation, setGeoLocation, searchLocation, setSearchLocation,
  periphery, setPeriphery, selectedPlace, setSelectedPlace, attendanceType, setAttendanceType, emoployeeId }) => {

  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState('success');
  const [toastMessage, setToastMessage] = useState('');
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCNCcTQduJoNRebWEf7zgqlpe1YJibSuGI',
    libraries: ['places']
  });
  const containerStyle = { width: '100%', height: '400px' };
  const [fingerprints, setFingerprints] = useState([null, null, null]);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const autocompleteRef = useRef(null);

  const displayToast = (message, variant = 'success') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAttendanceTypeChange = (e) => setAttendanceType(e.target.value);
  const handleGeoLocationChange = (e) => setGeoLocation(e.target.value);
  const handleSearchLocationChange = (e) => setSearchLocation(e.target.value);
  const handlePeripheryChange = (e) => setPeriphery(e.target.value);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      setSelectedPlace({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address
      });
      setSearchLocation(place.formatted_address);
    }
  };

  const getDeviceInfo = () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "http://localhost:8367/bioenable/info", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              const data = JSON.parse(xhr.responseText);
              if (data.DeviceInfo) {
                setDeviceInfo(data.DeviceInfo);
                resolve(data.DeviceInfo);
              } else {
                displayToast("⚠️ Device info not available.", "danger");
                reject("No DeviceInfo");
              }
            } catch (err) {
              reject(err);
            }
          } else {
            displayToast("❌ Failed to fetch device info. Is RDService running?", "danger");
            reject(xhr.responseText);
          }
        }
      };
      xhr.send();
    });
  };

  const captureFingerprint = async (index) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8367/bioenable/capture", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        displayToast(`Fingerprint ${index + 1} captured!`, 'success');
        setFingerprints((prev) => {
          const updated = [...prev];
          updated[index] = data;
          return updated;
        });
      } else if (xhr.readyState === 4) {
        displayToast("Failed to capture fingerprint.", 'danger');
      }
    };
    xhr.send(JSON.stringify({ Quality: 60, TimeOut: 10 }));
  };

  const handleSubmitAttendanceSettings = async () => {
    const employeeId = Number(sessionStorage.getItem("employeeId") || emoployeeId || 0);
    const device = deviceInfo || await getDeviceInfo();
    const payload = {
      employee: employeeId,
      weekday_off: "Monday",
      device_id: device?.SerialNo || "unknown",
      firebase_token: "string",
      web_auth_token: "string",
      auth_otp: "string",
      attendance_mode:"Biometric Attendance",
      finger_iso_1: fingerprints[0]?.IsoImage || "",
      finger_iso_2: fingerprints[1]?.IsoImage || "",
      finger_iso_3: fingerprints[2]?.IsoImage || "",
      finger_iso_4: "",
      finger_iso_5: "",
      fensing_type: geoLocation,
      fencing_timing: "10:20:50",
      periphery: periphery,
      geo_location_text: selectedPlace?.address || "",
      latitude: selectedPlace?.lat || 0,
      longitude: selectedPlace?.lng || 0
    };

    const url = 'staff/employee-attendance/';
    const response = await Postdata(url, payload);
    if (response.status===200) {
      sessionStorage.setItem("employeeId", response.user_id);
      displayToast('Attendance Setting Uploaded Successfully', 'success');
      onClose();
      return true;
    }
    else{
      displayToast('Attendance Settings not uploaded Successfully', 'danger');
      return false;
    }
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      if (isEditMode && selectedUserId) {
        const token = sessionStorage.getItem("token");
        try {
          const res = await getData(`staff/employee-attendance/${selectedUserId}/`)
          // const res = await fetch(`https://bgi.sortstring.com/api/v1/staff/employee-attendance/${selectedUserId}/`, {
          //   headers: { Authorization: `Token ${token}` }
          // });
          const data = await res.json();
          setGeoLocation(data.fensing_type || '');
          setPeriphery(data.periphery || '');
          setSearchLocation(data.geo_location_text || '');
          setSelectedPlace({ lat: data.latitude, lng: data.longitude, address: data.geo_location_text });
        } catch (err) {
          console.error("❌ Error loading attendance data:", err);
        }
      }
    };
    fetchAttendance();
  }, [isEditMode, selectedUserId]);

  // ... The rest of the component remains unchanged (UI JSX)





  return (
    <>
      <div className="col-md-10" style={{ height: "77vh", overflowY: 'scroll' }}>
        <div style={{ position: 'sticky', top: 0, background: "#fff" }}>
          <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 className='text-primary'>Attendance Settings</h2>
            <button className="close-btn" onClick={onClose}><img src={close} style={{padding:"4px",background:'#F2F3F4',borderRadius:'50%'}}></img></button>
          </div>
        </div>
        <div className="attendance-settings-content">
          <label>Attendance Type</label>
          <div className="attendance-type mt-3" >
            <div style={{ display: 'flex', gap: '20px' }}>
              <div>
                <input
                  type="radio"
                  id="biometric"
                  name="attendanceType"
                  value="biometric"
                  checked={attendanceType === 'biometric'}
                  onChange={handleAttendanceTypeChange}
                />
                <label htmlFor="biometric" className='ms-2'>Biometric</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="geoLocation"
                  name="attendanceType"
                  value="geoLocation"
                  checked={attendanceType === 'geoLocation'}
                  onChange={handleAttendanceTypeChange}
                />
                <label htmlFor="geoLocation" className='ms-2'>GEO Location</label>
              </div>
            </div>
          </div>

          {attendanceType === 'biometric' && (
            <div className="biometric-settings">
              <div>
                <h4 className='fm-pr-hd'>ADD BIOMETRIC</h4>
              </div>
              {/* <div className="biometric-images">
                {biometricImages.map((image, index) => (
                  <div key={image.id} className="biometric-image">
                    <img src={image.image} alt={`biometric-${index}`} />
                    <p>100 x 100</p>
                    <button className="add-fingerprint-btn">Add Fingerprint</button>
                  </div>
                ))}
              </div> */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                {fingerprints?.map((fp, index) => (
                  <div key={index} style={{ textAlign: 'center' }}>
                    <div
                      onClick={() => captureFingerprint(index)}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 6,
                        border: '1px solid #ccc',
                        backgroundColor: '#f2f2f2',
                        overflow: 'hidden',
                        cursor: 'pointer'
                      }}
                    >
                      {fp ? (
                        <img
                          src={`data:image/bmp;base64,${fp.BitmapData}`}
                          alt={`Fingerprint ${index + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <img
                          src={addFingerprint}
                          alt="Add Fingerprint"
                          style={{ width: '100%', height: '100%' }}
                        />
                      )}
                    </div>
                    <p style={{ marginTop: 5, fontSize: 12 }}>Add Fingerprint</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {attendanceType === 'geoLocation' && (
            <>
              <div className="row">
                {/* GEO Location Dropdown */}
                <div className="col-md-4">
                  <label className='form-labell'>Fensing type<span className='astrisk'>*</span></label>
                  <select
                    className='fm-modal form-control form-select'
                    value={geoLocation}
                    onChange={handleGeoLocationChange}
                  >
                    <option value="">Select Fencing type</option>
                    {/* Populate with a list of predefined locations or fetch from an API */}
                    <option value="Inner">Inner</option>
                    <option value="Outer">Outer</option>
                    <option value="Open">Open</option>
                    {/* <option value="Kolkata">Kolkata</option> */}
                    {/* Add more predefined locations */}
                  </select>
                </div>

                {/* Search Location */}
                <div className="col-md-4">
                  <label className='form-labell'>Search Location<span className='astrisk'>*</span></label>
                  {isLoaded && (
                    <Autocomplete
                      onLoad={(autocomplete) => autocompleteRef.current = autocomplete}
                      onPlaceChanged={handlePlaceChanged}
                    >
                      <input
                        type="text"
                        className="form-control fm-modal"
                        placeholder="Search location"
                        value={searchLocation}
                        onChange={handleSearchLocationChange}
                      />
                    </Autocomplete>
                  )}
                </div>

                {/* Periphery Input */}
                <div className="col-md-4">
                  <label className='form-labell'>Periphery (in meters)<span className='astrisk'>*</span></label>
                  <input
                    type="text"
                    className="fm-modal form-control"
                    placeholder="Enter periphery (in meters)"
                    value={periphery}
                    onChange={handlePeripheryChange}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <div>
                    <h4 className='fm-pr-hd'>MAP</h4>
                  </div>
                  {selectedPlace && selectedPlace.lat && selectedPlace.lng && (
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                      zoom={15}
                    >
                      <Marker position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }} />
                    </GoogleMap>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="form-actions" style={{ position: 'sticky', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: "flex", gap: '20px' }}>
          <button type="button" onClick={() => { handlePrev() }} style={{ display: 'flex', alignItems: 'center', gap: "10px" }}
            disabled={currentStep === 0}><img src={previous}></img>Previous</button>
          <p style={{ cursor: 'pointer', display: 'flex', gap: '5px', alignItems: 'center', color: 'red', margin: 0 }}><img src={savedraft}></img>Save to Draft</p>
        </div>
        <div>
          <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: "10px" }} onClick={async() => { let fn = await handleSubmitAttendanceSettings();
            if(fn){
              onClose();
            }
           }}>Next<img src={next}></img></button>
        </div>
      </div>
      {showToast && (
        <div
          className={`custom-toast toast align-items-center text-white bg-${toastVariant} border-0 position-fixed top-0 end-0 m-3`}
          role="alert"
          style={{
            display: 'block',
            minWidth: '300px',
            maxWidth: '400px',
            borderRadius: '8px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            fontSize: '15px',
            zIndex: 9999
          }}
        >
          <div className="d-flex">
            <div className="toast-body" style={{ padding: '12px 16px' }}>
              <strong>{toastVariant === 'success' ? '✅' : '❌'} </strong> {toastMessage}
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setShowToast(false)}
              aria-label="Close"
            ></button>
          </div>
        </div>

      )}
    </>
  );
};
