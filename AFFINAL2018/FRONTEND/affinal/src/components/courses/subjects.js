import React, { Component } from 'react';
import axios from 'axios';

class Subjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      totalAmount: ''
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/course/${this.props.match.params.id}`)
    .then(response => {
      this.setState({ subjects: response.data.data })
    })
    .catch(error => {
      alert(error.message)
    })

    axios.get(`http://localhost:8080/course/amount/${this.props.match.params.id}`)
    .then(response => {
      this.setState({ totalAmount: response.data.totalAmount })
    })
    .catch(error => {
      alert(error.message)
    })
  }

  render() {
    return (
      <div className="container">
        <h1>Course Subjects</h1>
        <h3>Total Amount: {this.state.totalAmount}</h3>
        {this.state.subjects.length > 0 && this.state.subjects.map((item, index) => (
          <div key={index} className="card mb-3">
            <div className="p-3">
              <h4>Subject Name: {item.name}</h4>
              <h5>Description: {item.description}</h5>
              <h5>Amount: {item.amount}</h5>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default Subjects;