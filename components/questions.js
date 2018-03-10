import React, { Component } from 'react'
import moment from 'moment'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Chip from 'material-ui/Chip'

export default class Questions extends Component {
  render() {
    return(
      <div>
        <Card style={{margin: "10px 0"}}>
          <CardHeader
            title={this.props.questionTitle}
            titleStyle={{ fontWeight: "600" }}
            subtitle={`${this.props.username}. ${moment(this.props.time).calendar()}`}
            actAsExpander={true}
            showExpandableButton={true}
          >
            <div>
              <Chip style={{ margin: "4", marginTop: "10px" }}>
                {this.props.tags}
              </Chip>
            </div>
          </CardHeader>
          <CardText
            expandable={true}
            style={{ borderTop: "1px solid rgb(229, 234, 237)" }}
          >
            {this.props.question}
            <CardActions style={{padding:"0", paddingTop: "20px" }}>
              <RaisedButton
                backgroundColor="rgb(38, 95, 130)"
                labelColor="white"
                label={`${this.props.answers} Answers`}
              />
            </CardActions>
          </CardText>
        </Card>
      </div>
    )
  }
}
