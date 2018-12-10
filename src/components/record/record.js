import React from "react";
import { connect } from "react-redux";

import Form from "react-jsonschema-form";

import * as api from "../../lib/api.js";
import * as actions from "./actions.js";

const API = "https://javascript-401-api.herokuapp.com";

const uiSchema = {
  _id: { "ui:widget": "hidden" },
  __v: { "ui:widget": "hidden" }
};

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = { schema: {} };
  }

  componentDidMount() {
    let url = `${API}/api/v1/${this.props.model}/schema`;
    api.get(url)
      .then(schema => {
        this.setState( {schema} )
      })
  }

  componentDidUpdate(prevProps) {
    if(this.props.model !== prevProps.model)
      {
        let url = `${API}/api/v1/${this.props.model}/schema`;
        api.get(url)
          .then(schema => {
            this.setState( {schema} )
          })
      }
  }

  resetPlayer = id => {
    this.setState({ id: null });
  };

  handleSubmit = form => {
    let formData = form.formData;
    let url = `${API}/api/v1/${this.props.model}`;
    if (parseInt(this.props.id) >= 0) {
      url = url + `/${formData._id}`;
      this.props.handlePut({
        url: url,
        id: this.props.id,
        model: this.props.model,
        record: formData
      });
    } else {
      this.props.handlePost({
        url: url,
        model: this.props.model,
        record: formData
      });
    }
  };

  render() {
    return (
      <div>
        <h3>Edit Record {this.props.id}</h3>
        <Form
          schema={this.state.schema}
          uiSchema={uiSchema}
          formData={
            this.props.records[this.props.model] &&
            this.props.records[this.props.model][this.props.id]
          }
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  records: state.records
});

const mapDispatchToProps = (dispatch, getState) => ({
  handlePost: payload => dispatch(actions.post(payload)),
  handlePut: payload => dispatch(actions.put(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Record);
