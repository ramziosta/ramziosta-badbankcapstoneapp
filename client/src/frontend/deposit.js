import { useRef, useEffect, useState, useContext } from "react";
import Card from "../context/context";
import UserContext from "../context/UserProvider";
import useAuth from "../hooks/useAuth";
import SiteSideBar from "../components/siteSideBar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { TIME_STAMP } from "../helpers/FormFieldValidation";
const ACCTRANSACTION_URL = "/transactions";
const UPDATE_URL = "/update";

function Deposit() {
  const { userData, setUserData } = useContext(UserContext);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState(`${auth.email}`);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(userData.balance);
  const [transactionType, setTransactionType] = useState("Deposit");
  const [transactionDate, setTransactionDate] = useState(TIME_STAMP);
  const [accountType, setAccountType] = useState("");
  const [isDisabled, setIsdisabled] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  function validate(field) {
    if (!Number(field)) {
      alert("Input type not valid. Please enter a number");
      clearForm();
      return false;
    }
    if (Number(field) <= 0) {
      alert("Please enter a positive value");
      clearForm();
      return false;
    }
    return true;
  }

  const prevBalance = useRef("");

  useEffect(() => {
    prevBalance.current = balance;
  }, [balance]);

  async function handleDeposit(e) {
    if (!validate(amount, "amount")) return;

    setBalance(Number(balance) + Number(amount));
    setShow(false);

    let ctx = { balance: userData.balance };
    setUserData(ctx);
    try {
      const response = await axiosPrivate
        .put(
          UPDATE_URL,
          JSON.stringify({
            email: email,
            balance: balance,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .post(
          ACCTRANSACTION_URL,
          JSON.stringify({
            email: email,
            amount: amount,
            balance: balance,
            transactionDate: transactionDate,
            transactionType: transactionType,
            accountType: accountType,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
    } catch (err) {
      if (!err?.response) {
        setErrMsg(alert("No Server Response"));
      } else if (err.response?.status === 409) {
        setErrMsg(alert("transaction Conflict"));
      } else {
        setErrMsg(alert("TransactionFailed Failed"));
      }
    }
  }

  const handleModeSelect = (event) => {
    let userSelection = event.target.value;
    console.log(userSelection);
    setAccountType(userSelection);
  };

  function clearForm() {
    setAmount("");
    setIsdisabled(true);
    setShow(true);
  }

  return (
    <>
      {show ? (
        <>
          <SiteSideBar />
          <div style={{ background: "grey", height: "50vh" }}>
            <Card
              style={{ maxWidth: "25rem", marginTop: "1rem" }}
              bgcolor="dark"
              header="Make a deposit"
              status={status}
              body={
                <>
                  <h3>Balance: ${userData.balance} </h3>
                  <br />
                  Deposit Amount:
                  <br />
                  <input
                    type="input"
                    className="form-control"
                    id="amount"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.currentTarget.value);
                      setIsdisabled(false);
                      if (!e.currentTarget.value) setIsdisabled(true);
                    }}
                  />
                  <br />
                  <label htmlFor="confirm_pwd">Account Type: ▶️</label>
                  <select
                    onChange={(event) => handleModeSelect(event)}
                    name="mode"
                    id="mode-select"
                  >
                    <option id="no-selection" value="">
                      Choose Account Type
                    </option>
                    <option id="checking" value="Checking">
                      Checking
                    </option>
                    <option id="savings" value="Savings">
                      Savings
                    </option>
                  </select>
                  <button
                    disabled={isDisabled ? true : false}
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleDeposit}
                  >
                    Deposit
                  </button>
                </>
              }
            />
          </div>
        </>
      ) : (
        <>
          <SiteSideBar />
          <div style={{ background: "grey", height: "50vh" }}>
            <Card
              style={{ maxWidth: "25rem", marginTop: "1rem" }}
              bgcolor="dark"
              header="Deposit"
              // status={status}
              body={
                <>
                  <h5 className="fs-2 text-success">Success</h5>
                  <br />
                  <h5>Deposit Amount: ${amount} </h5>
                  <hr />
                  <div>Current balance: ${balance} </div>
                  <br />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={clearForm}
                  >
                    New Deposit Transaction
                  </button>
                </>
              }
            />
          </div>
        </>
      )}
    </>
  );
}

export default Deposit;
