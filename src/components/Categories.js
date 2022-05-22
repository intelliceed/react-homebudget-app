import {Row, ListGroup, CloseButton, InputGroup, Form, Button} from "react-bootstrap";

import { useRef } from "react";

const Categories = (props) => {
  const { categories, addCategory, deleteCategory } = props;
  const newCategoryInputRef = useRef();

  const handleNewCategory = () => {
    const enteredCategory = newCategoryInputRef.current.value;

    addCategory(enteredCategory);
  };

  return (
    <>
      <Row>Categories</Row>
      <Row>
        <ListGroup>
          {categories.map((category, index) => {
            return (
              <ListGroup.Item key={`category-item-${index}`}>
                {category}
                <CloseButton
                  className="delete-category-button"
                  onClick={() => {
                    deleteCategory(category);
                  }}
                />
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Row>

      <Row>
        <InputGroup className="new-category-block">
          <Form.Control ref={newCategoryInputRef} placeholder="Enter new category" />
          <Button variant="success" type="button" onClick={handleNewCategory}>
            +
          </Button>
        </InputGroup>
      </Row>
    </>
  );
};

export default Categories;
