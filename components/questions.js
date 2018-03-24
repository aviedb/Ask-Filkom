import React, { Component } from 'react'
import Router from 'next/router'
import moment from 'moment'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Chip from 'material-ui/Chip'

export default class Questions extends Component {
  handleClick = (id) => {
    Router.push(`/answers?id=${id}`)
  }

  handleClickChip = (tag) => {
    Router.push(`/search?searchKeyword=${tag}`)
  }

  render() {
    return(
      <div>
        <Card style={{margin: "10px 0"}}>
          <CardHeader
            title={this.props.title}
            titleStyle={{ fontWeight: "600" }}
            subtitle={`${this.props.senderEmail}. ${moment(this.props.time).calendar()}`}
            actAsExpander={true}
            showExpandableButton={true}
          >
            <ul style={{display: "flex", flexWrap: "wrap"}}>
              {this.props.tags.map((tag, index) =>
                <Chip
                  key={index}
                  style={{ margin: "4", marginTop: "10px", marginRight: "5px" }}
                  onClick={() => this.handleClickChip(tag)}
                >
                  {tag}
                </Chip>
              )}
            </ul>
          </CardHeader>
          <CardText
            expandable={true}
            style={{ borderTop: "1px solid #E5EAED" }}
          >
            {this.props.question}
            <CardActions style={{padding:"0", paddingTop: "20px" }}>
              <RaisedButton
                backgroundColor="#275E82"
                labelColor="#FFFFFF"
                label={`${this.props.answers} Answers`}
                onClick={() => this.handleClick(this.props.id)}
              />
            </CardActions>
          </CardText>
        </Card>
      </div>
    )
  }
}
