import { Container, Row, Alert } from "react-bootstrap";

import { useState } from "react";

import RecentTransaction from "./RecentTransaction";
import AddTransaction from "./AddTransaction";

const Transaction = (props) => {
  const { categories } = props;

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      name: "Complete store project",
      amount: 200,
      categoryId: 1,
      createDate: new Date(),
    },
    {
      id: 2,
      name: "Received from John",
      amount: 50,
      categoryId: 2,
      createDate: new Date(),
    },
    {
      id: 3,
      name: "Pizza",
      amount: -15,
      categoryId: 3,
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
      <AddTransaction transactions={transactions} addTransaction={addTransaction} categories={categories}/>
      <Row>
        <RecentTransaction transactions={transactions} categories={categories}/>
      </Row>
    </Container>
  );
};

export default Transaction;
