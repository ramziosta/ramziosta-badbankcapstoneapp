const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{7,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const TIME_STAMP = new Date().toLocaleDateString();

const ACCT_NUM = Math.floor(Math.random() * 10000);

export { 
  
  USER_REGEX, 
  PWD_REGEX, 
  EMAIL_REGEX, 
  TIME_STAMP, 
  ACCT_NUM,

};
