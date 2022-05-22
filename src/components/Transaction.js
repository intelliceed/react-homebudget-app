import { Container, Row, Alert } from "react-bootstrap";

import { useState } from "react";

import RecentTransaction from "./RecentTransaction";
import AddTransaction from "./AddTransaction";

const Transaction = (props) => {
  const { categories } = props;

  const [transactions, setTransactions] = useState([
    {
      name: "Complete store project",
      amount: 200,
      category: "Salary",
      createDate: new Date(),
    },
    {
      name: "Received from John",
      amount: 50,
      category: "Gifts",
      createDate: new Date(),
    },
    {
      name: "Pizza",
      amount: -15,
      category: "Food",
      createDate: new Date(),
    },
  ]);

  const addTransaction = (newTransactionData) => {
    setTransactions((oldTransactions) => [
      ...oldTransactions,
      newTransactionData,
    ]);
  };

  return (
    <Container>
      <Row>
        <Alert variant="light">Transactions</Alert>
      </Row>
      <AddTransaction addTransaction={addTransaction} categories={categories} />
      <Row>
        <RecentTransaction transactions={transactions} />
      </Row>
    </Container>
  );
};

export default Transaction;
