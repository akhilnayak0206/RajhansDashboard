import React, { Component } from "react";
import { Card, Input, Button, Skeleton } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const { Search } = Input;

class AddEditUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [1, 2, 3, 4, 56, 7, 8, 9, 14, 5, 6, 8]
    };
  }
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
      <Skeleton loading={false} paragraph={{ rows: 50 }} active >
        <div
          style={{
            width: "100%",
            marginBottom: 20,
            position: "sticky",
            zIndex: 5,
            top: 65
          }}
        >
          <Card
            size="small"
            style={{borderRadius:5, width: "100%"}}
            bodyStyle={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2)'}}
            hoverable
          >
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              enterButton
            />
           <Button type="primary" shape="round" style={{marginLeft:5}}><FontAwesomeIcon icon={faFilter} /> Filter</Button>
          </div>
          </Card>
        </div>
        <div style={{ width: "100%", height: "100%", marginBottom: 20 }}>
          {this.state.cards.map((val, key) => (
            <Card
              size="small"
              title="Small size card"
              style={{borderRadius:5, width: "100%" }}
              key={key}
            >
              <p>{val}</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          ))}
        </div>
        </Skeleton>
      </div>
    );
  }
}

export default AddEditUsers;

