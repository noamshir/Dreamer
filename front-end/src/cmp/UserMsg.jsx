import React from 'react'
import { setMsg } from '../store/user.action';
import { connect } from "react-redux"
import { useEffect } from "react"


function _UserMsg({ msg, setMsg }) {
  var timeoutId

  useEffect(() => {
    if (!msg) return;
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      setMsg('');
    }, 2500)
    console.log('msg:', msg);

    return () => {
      clearTimeout(timeoutId)
    }
  }, [msg])

  if (!msg) {
    clearTimeout(timeoutId)
    return <span></span>
  }

  const msgClass = msg.type || ''
  console.log('msg:', msg);

  return (
    <section className={'user-msg ' + msgClass}>
      <h1>message</h1>
    </section>
  )
}



function mapStateToProps(state) {
  return {
    msg: state.userModule.msg
  }
}

const mapDispatchToProps = {
  setMsg
};


export const UserMsg = connect(mapStateToProps, mapDispatchToProps)(_UserMsg)