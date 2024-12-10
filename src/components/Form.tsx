import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { API, DASHBOARD_URL } from "../api";
const Form = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        phoneNumber: "",
        email: "",
        fname: "",
        lname: "",
        phoneVerified: false,
        city: "",
        pincode: "",
    });

    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleSendOtp = async () => {
        if (!phone) {
            setError("Please provide a phone number.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${API}/phone/request-otp/nc`, {
                phone,
                countryCode: "+91",
            });
            if (response.status === 200) {
                setIsOtpSent(true);
                setError("");
                toast.success("OTP sent successfully!");
            }
        } catch (error) {
            toast.error("Failed to send OTP. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            setError("Please enter the OTP.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${API}/phone/verify-otp`, {
                phone,
                otp,
            });
            if (response.status === 200) {
                await checkCustomerStatus();
                setError("");
                toast.success("OTP verified!");
            } else {
                setError("Invalid OTP.");
            }
        } catch (error) {
            toast.error("Failed to verify OTP.");
        } finally {
            setLoading(false);
        }
    };

    const checkCustomerStatus = async () => {
        try {
            const response = await axios.get(`${API}/custTable/check`, {
                params: { phone, countryCode: "+91" },
            });
            if (response.status === 200) {
                setIsNewUser(true);
                toast("New user detected. Please register.");
            }
        } catch (error) {
            await loginExistingCustomer();
            toast("User Already Exists");
        }
    };

    const loginExistingCustomer = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API}/custTable/by/phone`, {
                params: { phone, countryCode: "+91" },
            });

            const data = response.data.data;

            window.location.href = `${DASHBOARD_URL}/redirect?To=${`projects`}&Id=${data.Id}&Token=${data.Token}&Session=${data.Session}&Name=${data.Name}&Email=${data.Email}&Currency=${data.Currency}&Phone=${data.Phone}&PCode=${data.PCode}&RecId=${data.RecId}`;
            toast.success("Logged in successfully!");
        } catch (error) {
            toast.error("Failed to log in.");
        } finally {
            setLoading(false);
        }
    };

    const registerNewCustomer = async () => {
        if (!termsAccepted) {
            setError("You must accept the Terms and Conditions.");
            return;
        }
        setLoading(true);
        const apiData = {
            Name: `${user.fname} ${user.lname}`,
            Phone: phone,
            PCode: "+91",
            City: user.city,
            ZipCode: user.pincode,
            Email: user.email,
        };
        try {
            const response = await axios.post(`${API}/custTable/signup`, apiData);

            const data = response.data.data;

            if (response.status === 200) {
                const userToSend = {
                    fname: user.fname,
                    lname: user.lname,
                    email: user.email,
                    phoneVerified: user.phoneVerified,
                    phoneNumber: user.phoneNumber,
                    pCode: "+91",
                    city: user.city,
                    pincode: user.pincode,
                };

                await fetch("https://www.designelementary.com/api/user/india/sign-up", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userToSend),
                }).then(() => {
                    window.location.href = `${DASHBOARD_URL}/redirect?To=${`projects`}&Id=${data.Id}&Token=${data.Token}&Session=${data.Session}&Name=${data.Name}&Email=${data.Email}&Currency=${data.Currency}&Phone=${data.Phone}&PCode=${data.PCode}&RecId=${data.RecId}`;
                    toast.success("Registered successfully!");
                }).catch((error) => error.response.json());
            }
        } catch (error) {
            toast.error("Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setUser((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <>
            <Toaster />
            <div className="">
                <div className="">
                    {!isOtpSent ? (
                        <div>
                            <div className="flex input input-bordered bg-white w-full text-black text-lg rounded-lg mb-4">
                                <div className="text-sm md:text-base flex items-center p-2 text-black">
                                    🇮🇳
                                </div>
                                <p className="text-sm md:text-base flex items-center p-2 mr-3  text-black">

                                    +91</p>
                                <input
                                    type="text"
                                    placeholder="XXXXXXXXX"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="border-0 focus:border-0 bg-white focus:outline-none focus:ring-0"
                                />
                            </div>
                            <p className="text-xs text-gray-200 mb-4">
                                By clicking on proceed, you agree to the{" "}
                                <a href="/terms" className="text-green-600 underline">
                                    Terms of Use
                                </a>{" "}
                                and{" "}
                                <a href="/privacy" className="text-green-600 underline">
                                    Privacy Policy
                                </a>.
                            </p>
                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                            <button
                                onClick={handleSendOtp}
                                disabled={loading}
                                className={`btn  bg-yellow-200 hover:bg-yellow-300 w-full text-black ${loading ? "btn-disabled" : ""
                                    }`}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    "Create Project"
                                )}
                            </button>
                        </div>
                    ) : isNewUser ? (
                        <div className="flex flex-col">
                            <h1 className="text-left text-white text-2xl my-2">
                                Enter Your Details
                            </h1>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={user.fname}
                                onChange={(e) => handleInputChange("fname", e.target.value)}
                                className="input bg-white input-bordered mb-3 p-4 rounded-lg border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={user.lname}
                                onChange={(e) => handleInputChange("lname", e.target.value)}
                                className="input bg-white input-bordered mb-3 p-4 rounded-lg border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={user.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="input bg-white input-bordered mb-3 p-4 rounded-lg border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <input
                                type="text"
                                placeholder="City"
                                value={user.city}
                                onChange={(e) => handleInputChange("city", e.target.value)}
                                className="input bg-white input-bordered mb-3 p-4 rounded-lg border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <input
                                type="text"
                                placeholder="Pincode"
                                value={user.pincode}
                                onChange={(e) => handleInputChange("pincode", e.target.value)}
                                className="input bg-white input-bordered mb-6 p-4 rounded-lg border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={() => setTermsAccepted(!termsAccepted)}
                                    className="checkbox checkbox-success"
                                />
                                <label className="ml-2 text-gray-200">
                                    I accept the{" "}
                                    <a href="/terms" className="text-green-600">
                                        Terms and Conditions
                                    </a>
                                </label>
                            </div>
                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                            <button
                                onClick={registerNewCustomer}
                                disabled={loading}
                                className={`btn btn-success w-full ${loading ? "btn-disabled" : ""
                                    }`}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    "Register"
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="">
                            <label className="block text-lg font-medium text-white mb-2">
                                Enter OTP
                            </label>
                            <input
                                type="text"
                                placeholder="OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="input text-black input-bordered bg-white w-full mb-4 p-4 rounded-lg focus:ring-2 focus:ring-green-500"
                            />
                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                            <button
                                onClick={handleVerifyOtp}
                                disabled={loading}
                                className={`btn btn-success w-full ${loading ? "btn-disabled" : ""
                                    }`}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    "Verify OTP"
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>

    );
};

export default Form;
