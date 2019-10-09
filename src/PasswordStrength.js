import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class PasswordStrength extends Component {
  constructor(props) {
    super(props);
    
    this.rules = {
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

    this.state = {
      value: '',
      strength: 0,
      appliedRules: this.runRules('')
    };
  }

  setPassword(e) {
    const { value } = e.target;
    const appliedRules = this.runRules(value);
    const strength = this.calcPasswordStrength(appliedRules);

    this.setState({ value, strength, appliedRules });
  }

  runRules(password) {
    return Object.keys(this.rules).map(ruleKey => {
      return { rule: ruleKey, result: this.rules[ruleKey](password) };
    })
  }

  calcPasswordStrength(appliedRules) {
    return appliedRules.filter(r => r.result).length;
  }

  render() {
    return (
      <div>
        <input type='password' 
          name={this.props.name} 
          value={this.state.value}
          onChange={(e) => this.setPassword(e)}
          placeholder={this.props.placeholder} />
        <div>
          <strong>Strength:</strong>{this.state.strength}/{this.state.appliedRules.length}
          <ul>
            {this.state.appliedRules.map(r => <li className={r.result ? 'rule-ok' : 'rule-ko'}>
              {r.rule}
            </li>)}
          </ul>
        </div>
      </div>
    );
  }
}

document.querySelectorAll('password-strength-component').forEach(wrapper => {
  const { placeholder, name } = document.querySelector("password-strength-component").attributes;
  ReactDOM.render(<PasswordStrength
      placeholder = { placeholder && placeholder.value }
      name = { name && name.value }
    />, wrapper)
});