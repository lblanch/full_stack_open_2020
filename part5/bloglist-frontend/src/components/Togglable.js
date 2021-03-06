import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
    const [isVisible, setIsVisible] = useState(false)

    const hiddenStyle = { display: isVisible ? 'none' : '' }
    const visibleStyle = { display: isVisible ? '' : 'none' }

    const toggleVisibility = () => setIsVisible(!isVisible)

    useImperativeHandle(ref, () => {
        return { toggleVisibility }
    })

    return (
        <div>
            <div style={hiddenStyle}>
                <button type="button" onClick={toggleVisibility}>{props.showLabel}</button>
            </div>
            <div style={visibleStyle}>
                {props.children}
                <button type="button" onClick={toggleVisibility}>{props.hideLabel}</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    showLabel: PropTypes.string.isRequired,
    hideLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable