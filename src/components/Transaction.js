import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { useState } from "react";
import { useRef } from "react";

import RecentTransaction from "./RecentTransaction";

const Transaction = (props) => {
  const { categories } = props;

  const newTransactionNameRef = useRef();
  const newTransactionAmountRef = useRef();
  const newTransactionCategoryRef = useRef();

  const [transactions, setTransactions] = useState([
    {
      name: "salary",
      amount: 200,
      category: "cat1",
      createDate: new Date()
    },
    {
      name: "gift",
      amount: 50,
      category: "cat1",
      createDate: new Date()
    },
    {
      name: "food",
      amount: -15,
      category: "cat2",
      createDate: new Date()
    },
    {
      name: "car",
      amount: -25,
      category: "cat2",
      createDate: new Date()
    },
  ]);

  const addTransaction = (newTransactionData) => {
    setTransactions((oldTransactions) => [
      ...oldTransactions,
      newTransactionData,
    ]);
  };

  const handleAddTransaction = () => {
    const newTransactionName = newTransactionNameRef.current.value;
    const newTransactionAmount = newTransactionAmountRef.current.value; // Проверка на ноль
    const newTransactionCategory = newTransactionCategoryRef.current.value;

    const newTransactionData = {
      name: newTransactionName,
      amount: newTransactionAmount,
      category: newTransactionCategory,
      createDate: new Date()
    };

    addTransaction(newTransactionData);
  };

  return (
    <Container>
      <Row>
        <Col>Transactions</Col>
      </Row>
      {/* Вынести в компонент addTransaction */}
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
            placeholder="Amount"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group>
          <Form.Select ref={newTransactionCategoryRef}>
            {categories.map((cat, index) => {
              return (
                <option key={`transaction-category-${index}`} value={cat}>
                  {cat}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Col>
          <Button variant="success" onClick={handleAddTransaction}>
            Add Transaction
          </Button>
        </Col>
      </Row>
      <Row>
        <RecentTransaction transactions={transactions} />
      </Row>
    </Container>
  );
};

export default Transaction;
