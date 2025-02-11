import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { Camera, Mail, User } from "lucide-react";
// import UsersIcon from "../assets/user.png";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        photoURL: "",
    });

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.displayName || "",
                email: user.email || "",
                photoURL: user.photoURL || "",
            });
        }
    }, [user]);

    const handleUpdateProfile = () => {
        navigate("/update-profile");
    };

    return (
        <div className="min-h-screen">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-white text-center mb-2">
                        Welcome back, {profileData.name || "User"}! 👋
                    </h1>
                    <p className="text-blue-100 text-center">
                        Manage your profile information below
                    </p>
                </div>
            </div>

            {/* Profile Card */}
            <div className="max-w-md mx-auto -mt-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="relative">
                        <div className="h-32 bg-gradient-to-r from-blue-500/30 to-purple-500/30" />
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-16">
                            <div className="relative">
                                <img
                                    src={profileData.photoURL || ""}
                                    alt="Profile"
                                    className="h-32 w-32 rounded-full border-4 border-white bg-white object-cover"
                                    onError={(e) => {
                                        e.target.src = ""; // or any other default image
                                    }}
                                />
                                <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg">
                                    <Camera className="w-5 h-5 text-gray-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 pb-8 px-6">
                        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                            Profile Details
                        </h2>

                        <div className="mt-8 space-y-6">
                            <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                                <User className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="text-gray-900 font-medium">{profileData.name || "Not set"}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                                <Mail className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-gray-900 font-medium">{profileData.email || "Not set"}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleUpdateProfile}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;