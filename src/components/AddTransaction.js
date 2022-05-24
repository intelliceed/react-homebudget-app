import { Row, Col, Form, Button } from "react-bootstrap";

import { useRef } from "react";

const AddTransaction = (props) => {
  const { addTransaction, categories, transactions } = props;
  const newTransactionNameRef = useRef();
  const newTransactionAmountRef = useRef();
  const newTransactionCategoryRef = useRef();

  const handleAddTransaction = () => {
    const newTransactionName = newTransactionNameRef.current.value;
    const newTransactionAmount = parseFloat(
      newTransactionAmountRef.current.value
    );
    const newTransactionCategory = parseInt(newTransactionCategoryRef.current.value);

    if (newTransactionAmount === 0) {
      return false;
    }


    let maxId = 0;
    
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i]["id"] > maxId) {
        maxId = transactions[i]["id"];
      }
    }
    
    let nextId = maxId + 1;

    const newTransactionData = {
      id: nextId,
      name: newTransactionName,
      amount: newTransactionAmount,
      categoryId: newTransactionCategory,
      createDate: new Date(),
    };

    addTransaction(newTransactionData);
  };

  return (
    <>
      <Row className="mb-3">
        <Form.Group xs={8} as={Col}>
          <Form.Control
            ref={newTransactionNameRef}
            type="text"
            placeholder="Specify transaction name"
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control
            ref={newTransactionAmountRef}
            type="text"
            placeholder="Amount 0,00"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group>
          <Form.Select ref={newTransactionCategoryRef}>
            {categories.map((cat) => {
              return (
                <option key={`transaction-category-${cat.id}`} value={cat.id}>
                  {cat.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-4 add-transaction-button-container">
        <Button
          id="add-transaction-button"
          variant="success"
          onClick={handleAddTransaction}
        >
          Add Transaction
        </Button>
      </Row>
    </>
  );
};

export default AddTransaction;
