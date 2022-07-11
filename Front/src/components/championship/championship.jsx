import React, { Component } from "react";
import axios from "axios";
import Main from "../template/Main";

const headerProps = {
  icon: "users",
  title: "Campeonatos",
  subtitle: "Cadastro de Campeonato: Incluir, Listar, Alterar e Excluir.",
};

const baseUrl = "http://localhost:3000/championship";
const initialState = {
  user: { name: "", type: "", abbreviation: "", number_teams: "" },
  list: [],
};

export default class championship extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(baseUrl).then((resp) => {
      this.setState({ list: resp.data });
    });
  }

  clear() {
    this.setState({ user: initialState.user });
  }

  save() {
    const user = this.state.user;
    const method = user.id ? "put" : "post";
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
    axios[method](url, user).then((resp) => {
      const list = this.getUpdatedList(resp.data);
      this.setState({ user: initialState.user, list });
    });
  }

  getUpdatedList(user, add = true) {
    const list = this.state.list.filter((u) => u.id !== user.id);
    if (add) list.unshift(user);
    return list;
  }

  updateField(event) {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.user.name}
                onChange={(e) => this.updateField(e)}
                placeholder="Informe o nome do campeonato..."
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Tipo</label>
              <input
                type="text"
                className="form-control"
                name="type"
                value={this.state.user.type}
                onChange={(e) => this.updateField(e)}
                placeholder="Informe seu tipo..."
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Sobre o time</label>
              <input
                type="text"
                className="form-control"
                name="abbreviation"
                value={this.state.user.abbreviation}
                onChange={(e) => this.updateField(e)}
                placeholder="Sobre o campeonato..."
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Número de times</label>
              <input
                type="text"
                className="form-control"
                name="number_teams"
                value={this.state.user.number_teams}
                onChange={(e) => this.updateField(e)}
                placeholder="Número de times..."
              />
            </div>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={(e) => this.save(e)}>
              Salvar
            </button>
            <button
              className="btn btn-secondary ml-2"
              onClick={(e) => this.clear(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  load(user) {
    this.setState({ user });
  }

  remove(user) {
    axios.delete(`${baseUrl}/${user.id}`).then((resp) => {
      const list = this.getUpdatedList(user, false);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Sobre</th>
            <th>Número de times</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.type}</td>
          <td>{user.abbreviation}</td>
          <td>{user.number_teams}</td>
          <td align="center">
            <button className="btn btn-warning" onClick={() => this.load(user)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(user)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    );
  }
}
