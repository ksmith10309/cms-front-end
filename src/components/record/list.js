import React from "react";
import { connect } from "react-redux";

import style from "./record.module.scss";
import Auth from "../auth/auth.js";

import Record from "./record.js";
import If from "../if";

import * as actions from "./actions.js";

const API = "https://javascript-401-api.herokuapp.com";

class Records extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: null };
  }

  deleteRecord = id => {
    const url = `${API}/api/v1/${this.props.model}/${id}`;
    this.props.handleDelete({ url: url, model: this.props.model, id: id });
  };

  editRecord = id => {
    this.setState({ id });
  };

  reset = () => {
    let id = null;
    this.setState({ id });
  };

  componentDidMount() {
    let url = `${API}/api/v1/${this.props.model}`;
    this.props.handleGetAll({
      url: url,
      model: this.props.model
    })
  }

  componentDidUpdate(prevProps) {
    if(this.props.model !== prevProps.model)
      {
        let url = `${API}/api/v1/${this.props.model}`;
        this.props.handleGetAll({
          url: url,
          model: this.props.model
        })
      }
  }

  render() {
    let records = this.props.records[this.props.model] || [];
    console.log("r", this.props.model, records);
    return (
      <div className={style}>
        <h2>{this.props.model.toUpperCase()}</h2>
        <Auth capability="create">
          <button onClick={this.reset}>Add New</button>
        </Auth>
        <If condition={records}>
          <ul className={style.list}>
            {records.map((record, idx) => (
              <li key={idx}>
                {record.name}
                <Auth capability="update">
                  <button onClick={() => this.editRecord(idx)}>Edit</button>
                </Auth>
                <Auth capability="delete">
                  <button onClick={() => this.deleteRecord(record._id)}>
                    Delete
                  </button>
                </Auth>
              </li>
            ))}
          </ul>
        </If>
        <Auth capability="create">
          <Record model={this.props.model} id={this.state.id} />
        </Auth>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  records: state.records
});

const mapDispatchToProps = (dispatch, getState) => ({
  handleGetAll: url => dispatch(actions.get(url)),
  handleDelete: id => dispatch(actions.destroy(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Records);
