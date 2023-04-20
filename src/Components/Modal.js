import React from 'react';
import { createPortal } from 'react-dom';
import Loading from './Loading';
import "./modal.styles.scss";


const Modal = (props) => {
  if (props.status === true) {
    return createPortal(
      <div className='modal'>
        <div className='inner_modal'>
          <Loading />
        </div>
      </div>,
      document.getElementById('modal')
    )
  } else if (props.status === false) {
    return (
      null
    )
  }
}

export default Modal;