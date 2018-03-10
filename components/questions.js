import React, { Component } from 'react'
import Head from 'next/head'
import moment from 'moment'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

export default class Questions extends Component {
  render() {
    return(
      <div>
        <Head>
          <link rel="stylesheet" href="../statis/css/styles.css" />
        </Head>
        <div>
          <Card style={{margin: "10px 0"}}>
            <CardHeader
              title={this.props.questionTitle}
              subtitle={`${this.props.username} - ${moment(this.props.time).calendar()}`}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardActions>
              <FlatButton label="1 Answer" />
            </CardActions>
            <CardText expandable={true}>
              {this.props.question}
            </CardText>
          </Card>
        </div>
      </div>
    )
  }
}
