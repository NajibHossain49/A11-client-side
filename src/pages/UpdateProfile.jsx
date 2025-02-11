import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { Camera, Loader2, User, Edit } from "lucide-react";

const UpdateProfile = () => {
    const { user, updateUserProfile, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        displayName: user?.displayName || "",
        photoURL: user?.photoURL || "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Validate the form data
        if (!formData.displayName || !formData.photoURL) {
            setError("Both fields are required.");
            setLoading(false);
            return;
        }

        try {
            await updateUserProfile({
                displayName: formData.displayName,
                photoURL: formData.photoURL,
            });

            // Update the user in context directly
            setUser(prev => ({
                ...prev,
                displayName: formData.displayName,
                photoURL: formData.photoURL,
            }));

            // Small delay to ensure state updates 
            setTimeout(() => {
                navigate(-1);
            }, 100);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md -mt-24">
                {/* Card Container */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
                        <Edit className="w-12 h-12 mx-auto mb-4 text-white" />
                        <h1 className="text-3xl font-bold text-white">Update Profile</h1>
                        <p className="mt-2 text-blue-100">Customize your personal information</p>
                    </div>

                    {/* Profile Preview */}
                    <div className="flex justify-center -mt-12 mb-6">
                        <div className="relative">
                            <img
                                src={formData.photoURL || ""}
                                alt="Profile Preview"
                                className="h-36 w-36 rounded-full border-4 border-white shadow-lg object-cover"
                            />
                            <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 shadow-lg">
                                <Camera className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-6 pb-8 space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
                                <p className="font-medium">{error}</p>
                            </div>
                        )}

                        <div>
                            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                                Display Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="displayName"
                                    id="displayName"
                                    value={formData.displayName}
                                    onChange={handleChange}
                                    className="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700 mb-2">
                                Photo URL
                            </label>
                            <input
                                type="url"
                                name="photoURL"
                                id="photoURL"
                                value={formData.photoURL}
                                onChange={handleChange}
                                className="block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                placeholder="Enter photo URL"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                    Updating...
                                </>
                            ) : (
                                'Update Information'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;