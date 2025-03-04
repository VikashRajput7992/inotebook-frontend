import React from 'react'

function Alert(props) {
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{ height: '50px' }}>
            {props.alert && <div className={`alert alert-${props.alert.title} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.title==="danger"?"Error":props.alert.title)}</strong>: {props.alert.message}
            </div>}
        </div>
    )
}

export default Alert    