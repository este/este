import React from 'react'
import exposeRouter from './common/exposerouter'
import {focusInvalidField} from '../../lib/validation'
import {getForm} from '../auth/store'
import {msg} from '../intl/store'
import {updateFormField, login} from '../auth/actions'

require('../../../assets/css/login.styl')

class Login extends React.Component {

  login(e) {
    e.preventDefault()
    const nextPath = this.props.router.getCurrentQuery().nextPath
    const fields = getForm().toJS().fields

    login(fields)
      .catch(focusInvalidField(this))
      .then(() => {
        // TODO: Probably use hard reload for Chrome to remember password.
        // https://code.google.com/p/chromium/issues/detail?id=43219#c56
        this.props.router.replaceWith(nextPath || '/')
      })
  }

  render() {
    const form = getForm().toJS()

    return (
      <div className="login">
        <form onSubmit={(e) => this.login(e)}>
          <fieldset>
            <legend>{msg('auth.form.legend')}</legend>
            <input
              autoFocus="true"
              disabled={login.pending}
              name="email"
              onChange={updateFormField}
              placeholder={msg('auth.form.placeholder.email')}
              value={form.fields.email}
            /><br />
            <input
              disabled={login.pending}
              name="password"
              onChange={updateFormField}
              placeholder={msg('auth.form.placeholder.password')}
              type="password"
              value={form.fields.password}
            /><br />
            <button
              disabled={login.pending}
              type="submit"
            >{msg('auth.form.button.login')}</button>
            {/*
            <button type="submit">{msg('auth.form.button.signup')}</button>
            */}
            {form.error &&
              <span className="error-message">{form.error.message}</span>
            }
            <div>{msg('auth.form.hint')}</div>
          </fieldset>
        </form>
      </div>
    )
  }

}

export default exposeRouter(Login)
