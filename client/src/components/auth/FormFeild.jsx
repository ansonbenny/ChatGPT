import React, { Fragment, useCallback, useRef, useState } from 'react'
import { Eye, EyeHide } from '../../assets'

const FormFeild = ({ label,
    value, name, type, handleInput,
    passwordClass, isDisabled, error }) => {

    const [showPass, setShowPass] = useState(false)

    let inputRef = useRef()
    let labelRef = useRef()

    const inputClass = useCallback((add, label, input) => {
        if (add) {
            labelRef.current?.classList.add(...label)
            inputRef.current?.classList.add(...input)
        } else {
            labelRef.current?.classList.remove(...label)
            inputRef.current?.classList.remove(...input)
        }
    }, [])

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

            {
                type === 'password' && <>
                    {showPass ? <button type='button' onClick={() => {
                        inputRef.current.type = "password"
                        setShowPass(false)
                    }}>{<EyeHide />}</button>
                        : <button type='button' onClick={() => {
                            inputRef.current.type = "text"
                            setShowPass(true)
                        }}><Eye /></button>}
                </>
            }
        </Fragment>
    )
}

export default FormFeild
