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
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  const [selectedImg, setSelectedImage] = useState(null);

  const handleImageupload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData({
      ...profileData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

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
            <div className="flex justify-center mb-8">
              <div
                className="relative w-48 h-48 bg-gray-700 border-2 border-blue-500 rounded-lg overflow-hidden"
                style={{
                  animation: "pulse-border 2s ease-in-out infinite",
                  boxShadow:
                    "0 0 8px rgba(59, 130, 246, 0.4), 0 0 12px rgba(59, 130, 246, 0.3)",
                }}
              >
                {/* Profile Photo */}
                {selectedImg || authUser.profilePic ? (
                  <img
                    src={selectedImg || authUser.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-700 rounded-lg">
                    <FaUser size={64} />
                  </div>
                )}

                {/* Camera Button */}
                <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer">
                  <FaCamera className="text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageupload}
                    disabled={isUpdatingProfile}
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
              <p className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white">
                {authUser?.fullName}
              </p>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-2 font-semibold">
                <FaEnvelope className="inline mr-2" />
                Email Address
              </label>
              <p className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white">
                {authUser?.email}
              </p>
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
        </div>
        <div className="mt-6 bg-base-300 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Member Since</span>
              <span>{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
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
