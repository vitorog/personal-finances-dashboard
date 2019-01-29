import React, { Component } from "react";
import Card from "../../layout/Card";
import styled from "styled-components";
import db from "../../utils/database";
import SimpleTable from "../../layout/SimpleTable";

const StyledSection = styled.section`
  && {
    padding: 10px;
  }
`;

class Income extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddModalVisible: false,
    };
  }

  toggleAddModal = () =>
    this.setState({ isAddModalVisible: !this.state.isAddModalVisible });

  render() {
    const income = db.get('income').value();

    return (
      <div>
        <StyledSection className="section">
          <Card
            title={"Income"}
            actions={[
              { text: "Add", icon: "fa-plus", callback: this.toggleAddModal },
              { text: "Remove", icon: "fa-minus", callback: () => {} }
            ]}
          >
            {this.renderIncome(income)}
          </Card>
        </StyledSection>
      </div>
    );
  }

  renderIncome(income) {
    const total = income.reduce((accum, p) => accum + Number(p.value), 0);
    return (
      <SimpleTable header={["Description", "Value", "Date"]} data={income} footer={null} />
    );
  }
}

export default Income;
