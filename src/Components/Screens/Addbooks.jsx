import React, { useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Rating from "react-rating";
import { UserContext } from "../../App";

function AddRecipie() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [bookName, setBookName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [categories, setCategories] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const { userData } = useContext(UserContext);


  const navigate = useNavigate();

  const addRecipieInfo = async () => {
    let formField = new FormData();

    formField.append("author", bookName);
    formField.append("title", name);
    formField.append("description", description);
    formField.append("categories", JSON.stringify(categories)); // Convert to JSON string
    // formField.append("favorite", favorite);
    // formField.append("ingredients", ingredients);
    if (image !== null) {
      formField.append("featured_image", image);
    }
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/v1/books/create/",
      headers: {
        Authorization: `Bearer ${userData?.access}`,
      },

      data: formField,
    }).then((response) => {
      navigate("/home");
    });
  };
  return (
    <MainContainer>
      <Heading>Add Your Books Here ↓</Heading>
      <FormConatiner onSubmit={addRecipieInfo}>
        <InputContainer>
          <Label for="id_name">Name</Label>
          <TextInput
            type="text"
            placeholder="Enter Your Name"
            id="id_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputContainer>
        {/* <InputContainer>
          <Label for="id_food_name">Book Name</Label>
          <TextInput
            type="text"
            placeholder="Enter Food Name"
            id="id_food_name"
            name="name"
            value={bookName}
            onChange={(e) => setbookName(e.target.value)}
          />
        </InputContainer> */}
        <InputContainer>
          <Label for="id_featured_image">Featured Image</Label>
          <TextInput
            type="file"
            accept="image/*"
            id="id_featured_image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </InputContainer>
        <InputContainer>
          <Label for="id_book_name">Author Name</Label>
          <TextInput
            type="text"
            placeholder="Enter book Name"
            id="id_book_name"
            name="name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label for="id_rating">Rating</Label>
          <Rating
            id="id_rating"
            emptySymbol={<span className="fa fa-star-o fa-2x" />}
            fullSymbol={<span className="fa fa-star fa-2x" />}
            initialRating={rating}
            onChange={(value) => setRating(value)}
          />
        </InputContainer>

        <InputContainer>
          <Label for="id_categories">Categories</Label>
          <TextInput
            type="text"
            placeholder="Enter Categories"
            id="id_categories"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <Label for="id_favorite">Favorite</Label>
          <TextInput
            type="checkbox"
            id="id_favorite"
            checked={favorite}
            onChange={(e) => setFavorite(e.target.checked)}
          />
        </InputContainer>

        <ButtonContainer>
          <Link to="/home">
            <SubmitButton onClick={addRecipieInfo}>Add Recipie</SubmitButton>{" "}
          </Link>
        </ButtonContainer>
      </FormConatiner>
    </MainContainer>
  );
}

export default AddRecipie;

const MainContainer = styled.div`
  width: 85%;
  margin: 0 auto;
`;
const Heading = styled.h1`
  text-align: center;
`;
const FormConatiner = styled.form`
  width: 90%;

  margin: 36px auto 0px;
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;
const Label = styled.label`
  display: block;
  width: 100%;
  margin-bottom: 10px;
`;
const TextInput = styled.input`
  display: block;
  width: 50%;
`;
const TextArea = styled.textarea``;
const ButtonContainer = styled.div``;
const SubmitButton = styled.button``;
