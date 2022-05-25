import {
  Row,
  ListGroup,
  CloseButton,
  InputGroup,
  Form,
  Button,
  Alert
} from "react-bootstrap";
import { FolderFill } from "react-bootstrap-icons";

import { useRef } from "react";

const Categories = (props) => {
  const { categories, addCategory, deleteCategory } = props;
  const newCategoryInputRef = useRef();

  const handleNewCategory = () => {
    const enteredCategory = newCategoryInputRef.current.value;

    newCategoryInputRef.current.value = "";

    addCategory(enteredCategory);
  };

  return (
    <>
      <Row>
        <Alert variant="light">Categories</Alert>
      </Row>
      <Row>
        <ListGroup>
          {categories.map((category) => {
            return (
              <ListGroup.Item key={`category-item-${category.id}`}>
                <FolderFill />
                <span className="category-name">{category.name}</span>
                <CloseButton
                  className="delete-category-button"
                  onClick={() => {
                    deleteCategory(category.id);
                  }}
                />
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Row>

      <Row>
        <InputGroup className="new-category-block">
          <Form.Control
            ref={newCategoryInputRef}
            placeholder="Enter new category"
          />
          <Button variant="success" type="button" onClick={handleNewCategory}>
            +
          </Button>
        </InputGroup>
      </Row>
    </>
  );
};

export default Categories;
