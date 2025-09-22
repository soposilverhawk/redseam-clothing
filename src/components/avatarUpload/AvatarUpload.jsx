import React, { useState, useRef } from "react";
import styles from "./AvatarUpload.module.css";
import cameraIcon from "../../assets/camera.png";

function AvatarUpload() {
  const [avatar, setAvatar] = useState(null); // current avatar image
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  const handleRemove = () => {
    setAvatar(null);
    fileInputRef.current.value = null;
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); // open file picker
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatarWrapper} onClick={handleUploadClick}>
        {avatar ? (
          <img src={avatar} alt="avatar" className={styles.avatar} />
        ) : (
          <div className={styles.placeholder}>
            <img src={cameraIcon} alt="camera icon" />
          </div>
        )}
      </div>
      <div className={styles.buttons}>
        <button
          type="button"
          onClick={handleUploadClick}
          className={styles.button}
        >
          Upload new
        </button>
        <button type="button" onClick={handleRemove} className={styles.button}>
          Remove
        </button>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default AvatarUpload;
