import { Container, Row, ListGroup, Alert } from "react-bootstrap";
import { ArrowDownCircle } from "react-bootstrap-icons";
import { ArrowUpCircle } from "react-bootstrap-icons";

import { monthNames } from "../utils/date";

const RecentTransaction = (props) => {
  const { transactions, categories } = props;

  const totalIncome = transactions.reduce((prev, current) => {
    return prev + (current.amount > 0 ? current.amount : 0);
  }, 0);

  const totalExpenses = transactions.reduce((prev, current) => {
    return prev + (current.amount < 0 ? current.amount : 0);
  }, 0);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let incomeCounter = 0;
  let outcomeCounter = 0;

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].amount > 0) {
      incomeCounter += 1;
    } else {
      outcomeCounter += 1;
    }
  }

  const formatDate = (date) => {
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

    return `${monthNames[month]} ${day}, ${year} ${hours}:${minutes}`;
  };

  const getCategoryNameById = (categoryId) => {
    let categoryName = "";

    for (let i = 0; i < categories.length; i++) {
      if (categories[i]["id"] === categoryId) {
        categoryName = categories[i]["name"];
      }
    }

    return categoryName;
  };

  return (
    <Container>
      <Row>
        <Alert variant="light">Recent Transactions</Alert>
      </Row>
      <Row>
        <ListGroup>
          {transactions.map((transaction) => {
            return (
              <ListGroup.Item key={`recen-transaction-item-${transaction.id}`}>
                <div
                  className={`recent-transaction-amount-dollar-format ${
                    transaction.amount > 0 ? "green" : "red"
                  }`}
                >
                  {formatter.format(transaction.amount)}
                </div>
                <div>
                  <span className="recent-transaction-id">
                    {transaction.id}.{" "}
                  </span>
                  <span className="recent-transaction-category">
                    [{getCategoryNameById(transaction.categoryId)}]
                  </span>
                  <span>{transaction.name}</span>
                  <span className="recent-transaction-amount-text">
                    {transaction.amount > 0 && "+"}
                    {transaction.amount}
                  </span>
                </div>
                <div>
                  <span className="recent-transaction-create-date">
                    {formatDate(transaction.createDate)}
                  </span>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Row>
      <Row>
        <Alert variant="secondary">
          <span className="recent-transaction-amount-dollar-format-income green">
            <ArrowUpCircle /> Income: {incomeCounter} ={" "}
            <b>{formatter.format(totalIncome)}</b>
          </span>
          <span className="recent-transaction-amount-dollar-format-outcome red">
            <ArrowDownCircle /> Outcome: {outcomeCounter} ={" "}
            <b>{formatter.format(totalExpenses).replace("-", "")}</b>
          </span>
        </Alert>
      </Row>
    </Container>
  );
};

export default RecentTransaction;
