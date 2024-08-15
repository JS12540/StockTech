import React from 'react';

const utility = {
    validateName,
    validateEmail,
    isEmpty,
};
export default utility;

function validateName(name: FormDataEntryValue | null): boolean {
  const reg = /[A-Za-z][a-zA-Z]*/;
  return reg.test(name?.toString() ?? "");
}

function validateEmail(email: FormDataEntryValue | null): boolean {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zAZ\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email?.toString() ?? "");
}

function isEmpty(string: string): boolean {
  return !string || string.trim().length === 0;
}

// You can add additional functions and components as needed.

