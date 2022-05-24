import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useState } from "react";

import Categories from "./components/Categories";
import Transaction from "./components/Transaction";

const App = () => {
  const [categoriesList, setCategoriesList] = useState([
    {
      id: 1, 
      name: "Salary", 
    },

    {
      id: 2, 
      name: "Gifts", 
    },

    {
      id: 3, 
      name: "Food", 
    }
    
  ]);

  const validateCategory = (newCategory) => {
    if (newCategory.trim() === "") {
      return false;
    }
    
    const foundCategory = categoriesList.find(category => category.name === newCategory);

    if(foundCategory !== undefined) {
      return false;
    }
    
    return true;
  }

  const addCategory = (newCategory) => {
    if(!validateCategory(newCategory)) return false;

    let maxId = 0;

    for (let i = 0; i < categoriesList.length; i++) {
        if (categoriesList[i]["id"] > maxId) {
          maxId = categoriesList[i]["id"];
        }
    }

    let nextId = maxId + 1;

    return setCategoriesList((oldArray) => [...oldArray, {id: nextId, name: newCategory}]);
   
  };

  const deleteCategory = (categoryId) => {
    setCategoriesList((oldCategoriesList) =>
      oldCategoriesList.filter((cat) => cat.id !== categoryId)
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
