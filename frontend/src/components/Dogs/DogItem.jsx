/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import "./styles/DogItem.css";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import ImageUploading from "react-images-uploading";
import { useState } from "react";
import { Link } from "react-router-dom";

function DogItem({ dog }) {
  const { name, image, age, userId, dogId } = dog;

  const [images, setImage] = useState([]);
  const maxNumber = 69;

  const onChange = (imageList) => {
    // data for submit
    setImage(imageList);
  };

  return (
    <div className="style-card">
      <Card className="card-dog">
        {image ? (
          <Image className="image-dog" src={image} wrapped ui={false} />
        ) : (
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <button
                  type="button"
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </button>
                &nbsp;
                <button type="button" onClick={onImageRemoveAll}>
                  Remove the image
                </button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image.data_url} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <button
                        type="button"
                        onClick={() => onImageUpdate(index)}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={() => onImageRemove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        )}
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>
            <span className="date"> {age} ans </span>
          </Card.Meta>
          <Card.Description>
            Grand maitre de la samba et du saut en hauteur
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/users/${userId}/dogs/${dogId}`}>
            <Button icon>
              <Icon name="search" />
              Details
            </Button>
          </Link>
        </Card.Content>
      </Card>
    </div>
  );
}

export default DogItem;
