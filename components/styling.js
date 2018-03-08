import React, { Component } from 'react'
import Head from 'next/head'

export default class Styling extends Component {
  render() {
    return(
      <Head>
        <style>{`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
            font-weight: 300;
            font-size: .95rem;
          }

          ul, li {
            list-style-position: inside;
          }

          h3 {
            font-weight: 600;
            text-align: center;
            font-size: 1.5rem;
          }

          button {
            border: none;
            background: #265f82;
            color: white;
            cursor: pointer;
            padding: 10px;
            transition: background .3s ease;
          }

          button:hover {
            border: none;
            background: #1F4C69;
            color: white;
            padding: 10px;
          }

          button:disabled {
            cursor: default;
            background: #698ea5;
          }

          .centered-form {
            display: flex;
            align-items: center;
            height: 100vh;
            width: 100vw;
            justify-content: center;
            background: -moz-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* ff3.6+ */
            background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, rgba(49,84,129,1)), color-stop(100%, rgba(39,107,130,1))); /* safari4+,chrome */
            background: -webkit-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* safari5.1+,chrome10+ */
            background: -o-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* opera 11.10+ */
            background: -ms-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* ie10+ */
            background: linear-gradient(325deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* w3c */
          }

          .centered-form__form {
            background: rgba(250, 250, 250, 0.9);
            border: 1px solid #e1e1e1;
            border-radius: 5px;
            padding: 0px 20px;
            margin: 20px;
            width: 300px;
          }

          .form-field {
            margin: 20px 0;
          }

          .form-field > * {
            width: 100%;
          }

          .form-field label {
            display: block;
            margin-bottom: 7px;
          }

          .form-field input, .form-field select {
            border: 1px solid #e1e1e1;
            padding: 10px;
          }

          .home__sidebar {
            overflow-y: scroll;
            width: 300px;
            height: 100vh;
            background: -moz-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* ff3.6+ */
            background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, rgba(49,84,129,1)), color-stop(100%, rgba(39,107,130,1))); /* safari4+,chrome */
            background: -webkit-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* safari5.1+,chrome10+ */
            background: -o-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* opera 11.10+ */
            background: -ms-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* ie10+ */
            background: linear-gradient(325deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* w3c */
          }

          .home__sidebar h3 {
            color: #e6eaee;
            margin: 10px 20px;
            text-align: left;
          }

          .facebook-button {
            background: rgb(66, 102, 178);
          }

          .google-button {
            background: rgb(255, 255, 255);
            color: rgb(0, 0, 0);
          }
        `}</style>
      </Head>
    )
  }
}