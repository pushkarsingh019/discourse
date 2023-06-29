import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const handleFileChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append("image", selectedImage);
        toast.loading("uploading");

        axios
            .post("http://localhost:8080/api/upload", formData)
            .then((response) => {
                setImageUrl(response.data);
                toast.dismiss();
                toast("done");
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {});
    };
    console.log(imageUrl);

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <div>
                <h4>Selected Image:</h4>
                {imageUrl !== "" ? (
                    <img
                        className="w-40 h-40 object-contain"
                        src={imageUrl}
                        alt=""
                    />
                ) : (
                    ""
                )}
                <button onClick={handleUpload}>Upload</button>
            </div>
        </div>
    );
};

export default ImageUploader;
