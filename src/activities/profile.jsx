import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaCamera,
  FaCheck,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";

const ProfilePage = () => {
  // Profile state
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    isEmailVerified: false,
    phone: "",
    isPhoneVerified: false,
    address: "",
    userType: "student", // "student" or "professional"
    institution: "", // college/school name or company name
    profilePhoto: null,
  });

  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");

  const handleVerifyCheckbox = async (e) => {
    if (!profileData.phone) {
      alert("Please enter a phone number first");
      return;
    }

    if (!profileData.isPhoneVerified) {
      // Send OTP
      try {
        // Replace with your actual OTP sending API call
        await sendOtpToPhone(profileData.phone);
        setOtpSent(true);
        setShowOtpModal(true);
      } catch (error) {
        console.error("Error sending OTP:", error);
        setOtpError("Failed to send OTP");
      }
    } else {
      // If unchecking, just update the state
      handleInputChange(e);
    }
  };

  const verifyOtp = async () => {
    try {
      // Replace with your actual OTP verification API call
      const isValid = await verifyOtpWithServer(profileData.phone, otp);
      if (isValid) {
        setProfileData({
          ...profileData,
          isPhoneVerified: true,
        });
        setShowOtpModal(false);
        setOtp("");
        setOtpError("");
      } else {
        setOtpError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError("Error verifying OTP");
    }
  };

  // Mock functions - replace with actual API calls
  const sendOtpToPhone = async (phone) => {
    console.log(`OTP sent to ${phone}`);
    // In a real app, you would call your backend API here
    // which would then send an SMS with the OTP
    return Promise.resolve();
  };

  const verifyOtpWithServer = async (phone, otp) => {
    console.log(`Verifying OTP ${otp} for ${phone}`);
    // In a real app, you would call your backend API here
    // to verify if the OTP matches what was sent
    return Promise.resolve(otp === "123456"); // Simple mock - real OTPs would be random
  };

  useEffect(() => {
    // Load profile data if exists
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProfilePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          profilePhoto: e.target.result,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile data to localStorage
    localStorage.setItem("userProfile", JSON.stringify(profileData));
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-4">
        <header className="flex items-center mb-6">
          <button
            className="text-blue-400 hover:text-blue-300 mr-4"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Profile</h1>
        </header>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit}>
            {/* Profile Photo with Laser Animation */}
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-48 bg-gray-700 border-2 border-blue-500">
                {/* The actual profile photo */}
                {profileData.profilePhoto ? (
                  <img
                    src={profileData.profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <FaUser size={64} />
                  </div>
                )}

                {/* Laser animation overlays */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                  {/* Top laser */}
                  <div
                    className="absolute top-0 left-0 w-full h-1 bg-blue-400 opacity-70 animate-laser-horizontal"
                    style={{
                      filter: "blur(1px)",
                      boxShadow: "0 0 8px 2px rgba(59, 130, 246, 0.8)",
                    }}
                  ></div>

                  {/* Right laser */}
                  <div
                    className="absolute top-0 right-0 w-1 h-full bg-blue-400 opacity-70 animate-laser-vertical"
                    style={{
                      filter: "blur(1px)",
                      boxShadow: "0 0 8px 2px rgba(59, 130, 246, 0.8)",
                      animationDelay: "1s",
                    }}
                  ></div>

                  {/* Bottom laser */}
                  <div
                    className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 opacity-70 animate-laser-horizontal"
                    style={{
                      filter: "blur(1px)",
                      boxShadow: "0 0 8px 2px rgba(59, 130, 246, 0.8)",
                      animationDelay: "2s",
                    }}
                  ></div>

                  {/* Left laser */}
                  <div
                    className="absolute top-0 left-0 w-1 h-full bg-blue-400 opacity-70 animate-laser-vertical"
                    style={{
                      filter: "blur(1px)",
                      boxShadow: "0 0 8px 2px rgba(59, 130, 246, 0.8)",
                      animationDelay: "3s",
                    }}
                  ></div>
                </div>

                {/* Camera button */}
                <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer">
                  <FaCamera className="text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                  />
                </label>
              </div>
            </div>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-2 font-semibold">
                <FaUser className="inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
                placeholder="Enter your full name"
                value={profileData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-2 font-semibold">
                <FaEnvelope className="inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
                placeholder="Enter your email"
                value={profileData.email}
                onChange={handleInputChange}
                required
              />
              <div className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  name="isEmailVerified"
                  id="isEmailVerified"
                  className="mr-2 h-4 w-4"
                  checked={profileData.isEmailVerified}
                  onChange={handleInputChange}
                />
                <label htmlFor="isEmailVerified" className="text-gray-300">
                  Email verified{" "}
                  {profileData.isEmailVerified && (
                    <FaCheck className="inline text-green-500 ml-1" />
                  )}
                </label>
              </div>
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-2 font-semibold">
                <FaPhone className="inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
                placeholder="Enter your phone number"
                value={profileData.phone}
                onChange={handleInputChange}
              />
              <div className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  name="isPhoneVerified"
                  id="isPhoneVerified"
                  className="mr-2 h-4 w-4"
                  checked={profileData.isPhoneVerified}
                  onChange={handleInputChange}
                />
                <label htmlFor="isPhoneVerified" className="text-gray-300">
                  Phone verified{" "}
                  {profileData.isPhoneVerified && (
                    <FaCheck className="inline text-green-500 ml-1" />
                  )}
                </label>
              </div>
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-2 font-semibold">
                <FaMapMarkerAlt className="inline mr-2" />
                Address
              </label>
              <textarea
                name="address"
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
                placeholder="Enter your address"
                value={profileData.address}
                onChange={handleInputChange}
                rows="3"
              />
            </div>

            {/* User Type */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-2 font-semibold">
                I am a
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="student"
                    className="mr-2 h-4 w-4"
                    checked={profileData.userType === "student"}
                    onChange={handleInputChange}
                  />
                  <FaGraduationCap className="mr-2" />
                  Student
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="professional"
                    className="mr-2 h-4 w-4"
                    checked={profileData.userType === "professional"}
                    onChange={handleInputChange}
                  />
                  <FaBriefcase className="mr-2" />
                  Professional
                </label>
              </div>
            </div>

            {/* Conditional Field - Institution */}
            <div className="mb-6">
              <label className="block text-gray-300 mb-2 font-semibold">
                {profileData.userType === "student" ? (
                  <>
                    <FaGraduationCap className="inline mr-2" />
                    College/School Name
                  </>
                ) : (
                  <>
                    <FaBriefcase className="inline mr-2" />
                    Company Name
                  </>
                )}
              </label>
              <input
                type="text"
                name="institution"
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
                placeholder={
                  profileData.userType === "student"
                    ? "Enter your college/school name"
                    : "Enter your company name"
                }
                value={profileData.institution}
                onChange={handleInputChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center"
            >
              <FaSave className="mr-2" />
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Add these animations to your Tailwind CSS config or use in a style tag
const laserAnimationStyles = `
@keyframes laser-horizontal {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
@keyframes laser-vertical {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}
.animate-laser-horizontal {
  animation: laser-horizontal 2s linear infinite;
}
.animate-laser-vertical {
  animation: laser-vertical 2s linear infinite;
}
`;

// Add the styles to the document
if (typeof document !== "undefined") {
  const styleEl = document.createElement("style");
  styleEl.innerHTML = laserAnimationStyles;
  document.head.appendChild(styleEl);
}

export default ProfilePage;
