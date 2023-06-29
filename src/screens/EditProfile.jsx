import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { storeContext } from "../utils/store";
import MobileTopBar from "../components/MobileTopBar";
import Header from "../components/Header";
import goBack from "../assets/goBack.svg";
import { useRef } from "react";

const EditProfile = () => {
    const location = useLocation();
    const { userId } = location.state;
    const { profileReducer, user } = useContext(storeContext);
    console.log(user.avatar);
    const [formData, setFormData] = useState({
        name: user.name,
        username: user.username,
        bio: user.bio,
        portfolioLink: user.portfolioLink,
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        profileReducer({
            type: "get_profile",
            userId: userId,
        });
        // eslint-disable-next-line
    }, []);

    const editProfileHandler = () => {
        const imageData = new FormData();
        imageData.append("image", selectedImage);
        profileReducer({
            type: "update_profile",
            data: formData,
            id: userId,
        });
        profileReducer({
            type: "upload_profile_pic",
            imageData: imageData,
        });
        navigate(-1);
    };

    return (
        <section className="layout">
            <Header />
            <Menu />
            <main className="main-content bg-white">
                <MobileTopBar text={`Edit Profile`} />
                <div className="gap-x-2 items-center hidden md:flex pt-3">
                    <img
                        src={goBack}
                        alt="go back"
                        className="h-7 w-11"
                        onClick={() => navigate(-1)}
                    />
                    <h2 className="text-xl">Edit Profile</h2>
                </div>
                <div className="px-4 mt-7">
                    <div className="flex justify-center items-center">
                        {selectedImage ? (
                            <img
                                onClick={() => fileInputRef.current.click()}
                                src={URL.createObjectURL(selectedImage)}
                                alt="profile"
                                className="w-28 text-center h-28  object-contain rounded-full mb-6 md:w-36 md:h-36"
                            />
                        ) : (
                            <img
                                onClick={() => fileInputRef.current.click()}
                                src={user.avatar}
                                alt="profile"
                                className="w-28 text-center h-28  object-contain rounded-full mb-6 md:w-36 md:h-36 bg-contain"
                            />
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="/*"
                            className="hidden hover:block"
                            onChange={(e) =>
                                setSelectedImage(e.target.files[0])
                            }
                        />
                    </div>
                    <div className="border px-1.5 py-1">
                        <label className="text-sm text-gray-600">Name</label>
                        <br />
                        <input
                            type="text"
                            className="w-full outline-none px-0.5"
                            value={formData.name}
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    name: event.target.value,
                                })
                            }
                        />
                    </div>
                    <br />
                    <div className="border px-1.5 py-1">
                        <label className="text-sm text-gray-600">
                            username
                        </label>
                        <br />
                        <input
                            type="text"
                            className="w-full outline-none px-0.5"
                            value={formData.username}
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    username: event.target.value,
                                })
                            }
                        />
                    </div>
                    <br />
                    <div className="border px-1.5 py-1">
                        <label className="text-sm text-gray-600">Bio</label>
                        <br />
                        <textarea
                            rows={3}
                            type="text"
                            className="w-full outline-none px-0.5 h-max"
                            value={formData.bio}
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    bio: event.target.value,
                                })
                            }
                        />
                    </div>
                    <br />
                    <div className="border px-1.5 py-1">
                        <label className="text-sm text-gray-600">
                            Portfolio Link
                        </label>
                        <br />
                        <input
                            type="text"
                            className="w-full outline-none px-0.5 h-max"
                            value={formData.portfolioLink}
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    portfolioLink: event.target.value,
                                })
                            }
                        />
                    </div>
                    <br />
                    <button
                        onClick={editProfileHandler}
                        className="w-full px-1 py-1.5 border-grey-700 bg-slate-50 font-semibold border rounded-lg text-md"
                    >
                        save
                    </button>
                </div>
            </main>
        </section>
    );
};

export default EditProfile;
