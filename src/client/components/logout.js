import React from 'react'
import {logout} from '../auth/actions'
import {msg} from '../intl/store'

export default class Logout extends React.Component {

  render() {
    return (
      <div className="logout">
        <button
          children={msg('auth.logout.button')}
          onClick={logout}
        />
      </div>
    )
  }

}
