import { Container, Row, Col, ListGroup, Alert } from "react-bootstrap";

const RecentTransaction = (props) => {
  const { transactions } = props;

  const totalIncome = transactions.reduce((prev, current) => {

    return prev + (current.amount > 0 ? current.amount : 0);
  }, 0)
 
  console.log(totalIncome);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Container>
      <Row>
        <Col>Recent Transactions</Col>
      </Row>
      <Row>
        <ListGroup>
          {transactions.map((transaction, index) => {
            return (
              <ListGroup.Item key={`recen-transaction-item-${index}`}>
                <div
                  className={`recent-transaction-amount-dollar-format ${
                    transaction.amount > 0 ? "green" : "red"
                  }`}
                >
                  {formatter.format(transaction.amount)}
                </div>
                <div>
                  <span>{transaction.name}</span>
                  <span className="recent-transaction-amount-text">
                    {transaction.amount > 0 && "+"}
                    {transaction.amount}
                  </span>
                </div>
                <div>
                  <span>
                    {transaction.createDate.toLocaleDateString("en-US")}
                  </span>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Row>
      <Row>
        <Alert variant="secondary">
          Income {totalIncome}
        </Alert>
      </Row>
    </Container>
  );
};

export default RecentTransaction;
