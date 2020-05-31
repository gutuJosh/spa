import React, { useState }  from 'react';
import Input from '../form/input.js';

const ModalConfirm = (props) => {
    const [email, saveEmail] = useState(false);
    return(
        <React.Fragment>
         <div className={(props.status.active === true) ? "mask mask-on" : "mask"} id={props.status.id}>
            <div className="pop-up-panel">
              <div className="form form-big center">
                <i className={"svg svg-small "+props.status.icn}></i>
                <p className="text-left">{props.status.message}</p>
                    <Input 
                    name="email" 
                    placeholder="Indirizzo email"
                    required="L'indirizzo email non è coretto!"
                    getValue={ (el) => {
                          if(el.value !== '' && (el.value.indexOf('.') === -1 || el.value.indexOf('@') === -1)){
                              el.classList.add('input-error');
                              el.nextSibling.classList.remove('hidden');
                              return;
                          }
                          saveEmail(el.value !== '' ? el.value : false);
                    }}
                    />
                <div className="mtop20 flex">
                    <button className={"mtop20 btn flex-item "+props.status.btnOk} onClick={(event) => {
                        event.preventDefault();
                        if(props.handleConfirm){
                            props.handleConfirm('ok', email);
                        }
                    }}>
                        {props.status.btnOkTxt}
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button className={"mtop20 btn flex-item "+props.status.btnKo} onClick={(event) =>{
                        event.preventDefault();
                        if(props.handleConfirm){
                            props.handleConfirm('ko', email);
                        }
                    }}>
                        {props.status.btnKoTxt}
                    </button>
                </div>
              </div>
            </div>
         </div>
        </React.Fragment>
    )
}

export default ModalConfirm;