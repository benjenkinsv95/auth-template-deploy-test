import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import { changePasswordSuccess, changePasswordFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ChangePassword = ({ msgAlert, history, user }) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const onChangePassword = (event) => {
    event.preventDefault()

    changePassword({ oldPassword, newPassword }, user)
      .then(() =>
        msgAlert({
          heading: 'Change Password Success',
          message: changePasswordSuccess,
          variant: 'success'
        })
      )
      .then(() => history.push('/'))
      .catch((error) => {
        setOldPassword('')
        setNewPassword('')
        msgAlert({
          heading: 'Change Password Failed with error: ' + error.message,
          message: changePasswordFailure,
          variant: 'danger'
        })
      })
  }

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Change Password</h3>
        <Form onSubmit={onChangePassword}>
          <Form.Group controlId='oldPassword'>
            <Form.Label>Old password</Form.Label>
            <Form.Control
              required
              name='oldPassword'
              value={oldPassword}
              type='password'
              placeholder='Old Password'
              onChange={event => setOldPassword(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='newPassword'>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              required
              name='newPassword'
              value={newPassword}
              type='password'
              placeholder='New Password'
              onChange={event => setNewPassword(event.target.value)
              }
            />
          </Form.Group>
          <Button variant='primary' type='submit'>Submit</Button>
        </Form>
      </div>
    </div>
  )
}

export default withRouter(ChangePassword)
