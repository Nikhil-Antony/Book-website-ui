import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";

function UpdateRecipie() {
  // const [image, setImage] = useState("");
  // const [name, setName] = useState("");
  // const [foodName, setFoodName] = useState("");
  // const [description, setDescription] = useState("");
  // const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [bookName, setBookName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [categories, setCategories] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const { userData } = useContext(UserContext);

  const navi = useNavigate();
  const { ID } = useParams();

  const updateSingleFood = async () => {
    let formField = new FormData();
    console.log(ID);

    bookName && formField.append("author", bookName);
    name && formField.append("title", name);
    categories && formField.append("categories", categories);
    image && formField.append("featured_image", image);

    await axios({
      method: "POST",
      url: `http://127.0.0.1:8000/api/v1/books/${ID}/update/`,
      headers: {
        Authorization: `Bearer ${userData?.access}`,
      },

      data: formField,
    }).then((response) => {
      console.log(response.data);
      navi("/home");
    });
  };
  return (
    <MainContainer>
      <Heading>Update Your Book Here ↓</Heading>
      <FormConatiner onSubmit={updateSingleFood}>
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
          <Label for="id_categories">Categories</Label>
          <TextInput
            type="text"
            placeholder="Enter Categories"
            id="id_categories"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
        </InputContainer>
        <ButtonContainer>
          <Link>
            <SubmitButton onClick={updateSingleFood}>Update</SubmitButton>{" "}
          </Link>
        </ButtonContainer>
      </FormConatiner>
    </MainContainer>
  );
}

export default UpdateRecipie;

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
