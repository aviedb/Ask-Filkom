import React, { Component } from 'react'
import Link from 'next/link'
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
            title={this.props.title}
            titleStyle={{ fontWeight: "600" }}
            subtitle={`${this.props.senderEmail}. ${moment(this.props.time).calendar()}`}
            actAsExpander={true}
            showExpandableButton={true}
          >
            <ul style={{display: "flex", flexWrap: "wrap"}}>
              {this.props.tags.map((tag) =>
                <Chip style={{ margin: "4", marginTop: "10px", marginRight: "5px" }}>
                  {tag}
                </Chip>
              )}
            </ul>
          </CardHeader>
          <CardText
            expandable={true}
            style={{ borderTop: "1px solid rgb(229, 234, 237)" }}
          >
            {this.props.question}
            <CardActions style={{padding:"0", paddingTop: "20px" }}>
              <Link href={`/answers?id=${this.props.id}`}>
                <RaisedButton
                  backgroundColor="rgb(38, 95, 130)"
                  labelColor="white"
                  label={`${this.props.answers} Answers`}
                />
              </Link>
            </CardActions>
          </CardText>
        </Card>
      </div>
    )
  }
}
