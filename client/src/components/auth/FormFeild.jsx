import React, { Fragment } from 'react'

const FormFeild = ({ labelRef, inputRef, label,
    value, name, type, handleInput,
    inputClass, passwordClass, isDisabled, error }) => {
    return (
        <Fragment>
            {label && <label
                className={`labelEffect ${value && 'active-label'} ${error && 'warning-label'}`}
                ref={labelRef}>{label}</label>}

            <input
                className={`${error && 'warning-input'} ${inputRef ? value ? 'inputEffect active-input' : 'inputEffect' : ''}`}
                value={value} name={name}

                ref={inputRef} type={type} onFocus={() => {
                    inputClass(true, ["active-label", "active-label-green"], ["active-input", "active-input-green"])
                }}

                onBlur={() => {
                    if (inputRef.current?.value.length <= 0) {
                        inputClass(false, ["active-label", "active-label-green"], ["active-input", "active-input-green"])
                    } else {
                        inputClass(false, ["active-label-green"], ["active-input-green"])
                    }
                }}

                onInput={(e) => {
                    handleInput(e)
                    if (passwordClass) {
                        document.querySelector('#alertBox').style.display = "block"

                        if (e.target.value.length >= 8) {
                            passwordClass('#passAlertError', "#passAlertDone")
                        } else {
                            passwordClass("#passAlertDone", "#passAlertError")
                        }
                    }
                }}

                disabled={isDisabled} readOnly={isDisabled} required
            />
        </Fragment>
    )
}

export default FormFeild
