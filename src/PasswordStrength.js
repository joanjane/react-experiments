import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const rules = {
  minLength: (value) => {
    return /^.{8,}$/.test(value);
  },
  numbers: (value) => {
    return /[0-9]/.test(value);
  },
  lowercase: (value) => {
    return /[a-z]/.test(value);
  },
  capitals: (value) => {
    return /[A-Z]/.test(value);
  },
  symbols: (value) => {
    return /[\W\s]/.test(value);
  },
};

function PasswordStrength({ value, name, placeholder }) {
  const [control, setControl] = useState({
    value,
    strength: 0,
    appliedRules: runRules('')
  });

  function setPassword(e) {
    const { value } = e.target;
    const appliedRules = runRules(value);
    const strength = calcPasswordStrength(appliedRules);

    setControl({ value, strength, appliedRules });
  }

  function runRules(password) {
    return Object.keys(rules).map(ruleKey => {
      return { rule: ruleKey, result: rules[ruleKey](password) };
    })
  }

  function calcPasswordStrength(appliedRules) {
    return appliedRules.filter(r => r.result).length;
  }

  return (
    <div>
      <input type='password' 
        name={name} 
        value={control.value}
        onChange={(e) => setPassword(e)}
        placeholder={placeholder} />
      <div>
        <strong>Strength:</strong>{control.strength}/{control.appliedRules.length}
        <ul>
          {control.appliedRules.map(r => <li key={r.rule} className={r.result ? 'rule-ok' : 'rule-ko'}>
            {r.rule}
          </li>)}
        </ul>
      </div>
    </div>
  );
}


document.querySelectorAll('password-strength-component').forEach(wrapper => {
  const { placeholder, name, value } = document.querySelector("password-strength-component").attributes;
  ReactDOM.render(<PasswordStrength
      placeholder = { placeholder && placeholder.value }
      name = { name && name.value }
      value = { value && value.value }
    />, wrapper)
});