import Button from "react-bootstrap/Button";

import { useRef, useState } from "react";

function ImageUploadField(props) {
    const uploadedImage = useRef(null);
    const [uploadedFileName, setUploadedFileName] = useState("");

    const onImageUpload = (event) => {
        const file = event.target.files[0];
        setUploadedFileName(file.name);
        props.onUpload(file);
    }

    return (
        <div>
            <input type="file" ref={ uploadedImage } onChange={ onImageUpload } className="d-none" accept="image/*" />
            <Button variant={`outline-${ uploadedFileName? "success": "primary" }`} 
                onClick={() => { uploadedImage.current.click() }}>
                Choose File
            </Button>
            &nbsp;{ uploadedFileName? uploadedFileName: "No file selected" }
        </div>
    );
}

export default ImageUploadField;