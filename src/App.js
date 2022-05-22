import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useState } from "react";

import Categories from "./components/Categories";
import Transaction from "./components/Transaction";

const App = () => {
  const [categoriesList, setCategoriesList] = useState(["Salary", "Gifts", "Food"]);

  const validateCategory = (newCategory) => {
    if (newCategory.trim() === "") {
      return false;
    }
    
    const foundCategory = categoriesList.find(category => category === newCategory);

    if(foundCategory !== undefined) {
      return false;
    }
    
    return true;
  }

  const addCategory = (newCategory) => {
    if(!validateCategory(newCategory)) return false;

    return setCategoriesList((oldArray) => [...oldArray, newCategory]);
   
  };

  const deleteCategory = (categoryName) => {
    setCategoriesList((oldCategoriesList) =>
      oldCategoriesList.filter((cat) => cat !== categoryName)
    );
  };

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Categories
            categories={categoriesList}
            addCategory={addCategory}
            deleteCategory={deleteCategory}
          />
        </Col>
        <Col sm={8}>
          <Transaction categories={categoriesList} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
